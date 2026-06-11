---
title: Dashboard Rehberi
template: page
---
# Dashboard Rehberi

Bu doküman, **Dashboard** sayfasını başka birinin (veya başka bir yapay zekânın) **birebir** yapabilmesi için yazılmıştır. Adımları sırayla, eksiksiz uygula. Tahmin yürütme; burada ne yazıyorsa onu yap.

## 0. Ortam / Stack (önce oku)

- **Proje kökü (frontend):** `D:\Projects\example-server\src\main\example-ui`
- React 18 + TypeScript + **Material-UI 5** (`@mui/material`) + **Zustand** (state) + **react-i18next** (çeviri) + **Recharts** (`recharts`, zaten kurulu, grafik için).
- Tüm yollar bu frontend köküne görelidir.
- **Proje yapısı konvansiyonu (buna uy):**
  - Tipler: `src/types/interfaces/*Types.ts`, hepsi `src/types/index.ts` barrel'ından `export *` ile yayınlanır. Tüketim: `import { X } from '../../types'`.
  - Paylaşılan util/sabitler: `src/utils/*.ts`, `src/utils/index.ts` barrel'ı. Tüketim: `import { X } from '../../utils'`.
  - Hook'lar: `src/hooks/*.ts`.
  - Bileşenler: özelliğe göre `src/components/<feature>/`.
- Her değişiklikten sonra doğrulama:
  ```bash
  npx tsc --noEmit -p tsconfig.json
  npx eslint <değiştirdiğin .ts/.tsx dosyalar>
  ```
  (Not: `src/utils/*` dosyaları eslint tarafından "ignore" edilir — bu bir hata değil, normaldir.)
- **Bu projeye özgü tuzaklar (önemli):**
  - `react-hooks/exhaustive-deps` eslint kuralı **tanımlı DEĞİL**. `// eslint-disable-next-line react-hooks/exhaustive-deps` yazma — "rule not found" hatası verir.
  - `t()` (i18next) dönüş tipi `string | null` olabilir. Recharts'ın `name` gibi `string|number` bekleyen prop'larına verirken `String(t('...'))` ile sar.

---

## 1. Veri akışı (KRİTİK — yoksa her şey 0 gelir)

Dashboard'un veri kaynağı **Zustand `planList`**'tir (ayrı bir dashboard backend endpoint'i YOK).

- `usePlanStore().planList` plan listesini tutar. **`fetchPlans` (api/plans) SIĞ ağaç döndürür** (sadece plan + 1. seviye); objective/KR/KPI gelmez → tüm sayımlar 0 çıkar.
- Bu yüzden:
  1. Liste/dropdown'u `useGoalStore().fetchGoalsByType('PLAN', isAdmin())` ile doldur (planList'i yazar),
  2. **Seçili planın tam hiyerarşisini** `usePlanStore().getPlan(planId)` (api/plans/{id}) ile çek. `getPlan`, ilgili planı planList içinde tam ağaçla değiştirir.
- `goalType` değerleri tutarsız olabilir (`'KEY RESULT'` boşluklu veya `'KEY_RESULT'`). Normalize et: büyük harf + boşlukları `_` yap.
- Düğüm alanları (`IGoal`): `state`, `goalOwner.tsaUser.{userPersno, displayName}`, `totalProgress`, `velocity`, `confidenceRiskLevel`, `children`, `goalType`. Objective'lerde ayrıca `category` olabilir.

---

## 2. Ortak sabitler (`src/utils/constants.ts`)

Dashboard, `utils/constants.ts`'ten **`color`** (kart border/hata rengi) ve **`progressColor`** (4 progress rengi) kullanır. Bunlar **ortak** değerlerdir, constants'ta kalır. Bu export'ların mevcut olduğundan emin ol:

```ts
// Uzun listelerde ilk anda render edilecek öğe sayısı (başka özellikler için).
export const VISIBLE_LIMIT = 30;

// Uygulama genelinde kullanılan renk paleti.
export const color = {
  paperBorder: '#F7F7F7',
  paperBackground: '#FCFCFC',
  cardBackground: '#DFF1EA',
  cardTitle: '#2D2926',
  cardIcon: '#ABA9A8',
  textError: '#D52727',
  addButton: '#007F4F',
  paperBorderLight: '#EAEAE9',
  subtitle: '#003622',
  paperBackgroundDark: '#F7F7F7',
  textDescription: '#969492',
  textDefault: '#423E3C',
  cardBackgroundError: '#FAE4E4',
};

// Progress grafiklerinde/bar'larında kullanılan 4 standart renk.
export const progressColor = {
  red: '#EF4444',
  orange: '#F59E0B',
  green: '#22C55E',
  blue: '#2563EB',
};
```

> Dashboard'a **özel** renk eşlemeleri (`stateColors`, `distributionColors`, `categoryColor`, `metricColor`) constants'ta DEĞİL — ayrı `utils/dashboard.ts`'tedir (bkz. §4).

`src/utils/index.ts` (barrel) şunları içermeli:
```ts
export * from './constants';
export * from './dashboard';
```
Böylece hepsi `import { ... } from '../../utils'` ile erişilebilir.

---

## 3. Tipler (`src/types/interfaces/DashboardTypes.ts`)

Dosyayı oluştur:
```ts
// OKR Dashboard sayfası ve bileşenlerinin paylaştığı veri tipleri.

export type Slice = { name: string; value: number };

export type OwnerRow = {
  owner: string;
  objective: number;
  keyResult: number;
  kpi: number;
};

export type MetricRow = { name: string; pct: number; color: string };

export interface DashboardSummary {
  totalProgress: number;
  objectiveCount: number;
  krCount: number;
  kpiCount: number;
  ownerCount: number;
  focus: number;
  objective: number;
  keyResult: number;
  kpi: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  byOwner: OwnerRow[];
  statesByType: { OBJECTIVE: Slice[]; KEY_RESULT: Slice[]; KPI: Slice[] };
  distribution: { type: Slice[]; confidence: Slice[]; category: Slice[] };
  focusAreas: MetricRow[];
  kpis: MetricRow[];
}
```
`src/types/index.ts` barrel'ına ekle (diğer `export * from './interfaces/...'` satırlarının yanına):
```ts
export * from './interfaces/DashboardTypes';
```
Artık `import { Slice, OwnerRow, MetricRow, DashboardSummary, DashboardData } from '../../types'`.

---

## 4. Dashboard'a özel renkler (`src/utils/dashboard.ts`)

```ts
// Dashboard'a özel renk eşlemeleri ve yardımcıları.
// Ortak değerler (progressColor, color) constants.ts'te kalır.
import { progressColor } from './constants';

// States donut'u (Open / In Progress / Done / Cancel / Postpone)
export const stateColors: Record<string, string> = {
  Open: '#38BDF8',
  'In Progress': progressColor.blue,
  Done: progressColor.green,
  Cancel: progressColor.red,
  Postpone: progressColor.orange,
};

// Distribution donut'ları
export const distributionColors: Record<string, Record<string, string>> = {
  type: {
    Objective: progressColor.blue,
    'Key Result': '#60A5FA',
    KPI: '#1E3A8A',
  },
  // NOT: confidenceRiskLevel enum değerleri henüz netleşmedi; tahmini anahtarlar.
  confidence: {
    'On Track': progressColor.green,
    Behind: progressColor.orange,
    Overdue: progressColor.red,
    ON_TRACK: progressColor.green,
    BEHIND: progressColor.orange,
    AT_RISK: progressColor.red,
    RISK: progressColor.red,
  },
  category: {},
};

// Kategori dilimleri için maviden açığa doğru paletten sırayla renk ata.
const categoryPalette = ['#1E3A8A', progressColor.blue, '#60A5FA', '#93C5FD', '#BFDBFE'];
export const categoryColor = (index: number): string =>
  categoryPalette[index % categoryPalette.length];

// Yatay yüzde-bar'larında (Focus Areas %, KPI %) ve metrik kartlarında
// yüzdeye göre renk — 4 standart progress renginden.
export const metricColor = (pct: number): string => {
  if (pct >= 90) return progressColor.green;
  if (pct >= 70) return progressColor.blue;
  if (pct >= 40) return progressColor.orange;
  return progressColor.red;
};
```
Tüketim (barrel üzerinden): `import { stateColors, distributionColors, categoryColor, metricColor } from '../../utils';`

---

## 5. Hook (`src/hooks/useDashboardData.ts`)

Seçili planın ağacını **tek geçişte** gezip tüm grafik bucket'larını üretir.
```ts
import { useMemo } from 'react';
import { IGoal, IPlan, DashboardData, MetricRow, Slice } from '../types';
import { metricColor } from '../utils';

// goalType normalizasyonu: 'KEY RESULT' / 'KEY_RESULT' -> 'KEY_RESULT'
const normType = (t?: string): string =>
  (t || '').toUpperCase().replace(/\s+/g, '_');

// Ham state değerini mockup'taki kovaya eşle.
const STATE_LABELS: Record<string, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  CANCEL: 'Cancel',
  CANCELLED: 'Cancel',
  POSTPONE: 'Postpone',
  POSTPONED: 'Postpone',
};

const avg = (nums: number[]): number =>
  nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;

const toSlices = (rec: Record<string, number>): Slice[] =>
  Object.entries(rec).map(([name, value]) => ({ name, value }));

/**
 * Seçili planın ağacını TEK geçişte gezip tüm dashboard bucket'larını üretir.
 * ownerPersno verilirse yalnızca o kişinin sahibi olduğu node'lar hesaba katılır.
 * NOT: Confidence Level kovalaması confidenceRiskLevel alanından best-effort.
 */
export function useDashboardData(
  plan?: IPlan | null,
  ownerPersno?: number | null,
): DashboardData {
  return useMemo(() => {
    const progressByType: Record<string, number[]> = {
      FOCUS: [], OBJECTIVE: [], KEY_RESULT: [], KPI: [],
    };
    const typeCount = { OBJECTIVE: 0, KEY_RESULT: 0, KPI: 0 };
    const stateCounts: Record<string, Record<string, number>> = {
      OBJECTIVE: {}, KEY_RESULT: {}, KPI: {},
    };
    const owners = new Map<
      number,
      { name: string; OBJECTIVE: number[]; KEY_RESULT: number[]; KPI: number[] }
    >();
    const ownerSet = new Set<number>();
    const confidence: Record<string, number> = {};
    const category: Record<string, number> = {};
    const focusAreas: MetricRow[] = [];
    const kpis: MetricRow[] = [];

    const bump = (rec: Record<string, number>, key: string) => {
      rec[key] = (rec[key] || 0) + 1;
    };

    const walk = (node: IGoal) => {
      const persno = node.goalOwner?.tsaUser?.userPersno;
      const include = ownerPersno == null || persno === ownerPersno;

      if (include) {
        const type = normType(node.goalType);
        const progress = Math.round(node.totalProgress ?? 0);
        const stateLabel =
          STATE_LABELS[(node.state || '').toUpperCase()] || node.state || 'Unknown';

        if (type === 'FOCUS') {
          progressByType.FOCUS.push(progress);
          focusAreas.push({ name: node.name, pct: progress, color: metricColor(progress) });
        } else if (type === 'OBJECTIVE') {
          progressByType.OBJECTIVE.push(progress);
          typeCount.OBJECTIVE++;
          bump(stateCounts.OBJECTIVE, stateLabel);
          const cat = (node as { category?: string }).category;
          if (cat) bump(category, cat);
        } else if (type === 'KEY_RESULT') {
          progressByType.KEY_RESULT.push(progress);
          typeCount.KEY_RESULT++;
          bump(stateCounts.KEY_RESULT, stateLabel);
        } else if (type === 'KPI') {
          progressByType.KPI.push(progress);
          typeCount.KPI++;
          bump(stateCounts.KPI, stateLabel);
          kpis.push({ name: node.name, pct: progress, color: metricColor(progress) });
        }

        if (node.confidenceRiskLevel) bump(confidence, node.confidenceRiskLevel);

        if (persno != null) {
          ownerSet.add(persno);
          if (!owners.has(persno)) {
            owners.set(persno, {
              name: node.goalOwner?.tsaUser?.displayName || '-',
              OBJECTIVE: [], KEY_RESULT: [], KPI: [],
            });
          }
          if (type === 'OBJECTIVE' || type === 'KEY_RESULT' || type === 'KPI') {
            owners.get(persno)?.[type].push(progress);
          }
        }
      }

      node.children?.forEach(walk);
    };

    (plan?.children ?? []).forEach(walk);

    const byOwner = Array.from(owners.values())
      .map((o) => ({
        owner: o.name,
        objective: avg(o.OBJECTIVE),
        keyResult: avg(o.KEY_RESULT),
        kpi: avg(o.KPI),
      }))
      .slice(0, 8);

    return {
      summary: {
        totalProgress:
          ownerPersno != null
            ? avg(progressByType.OBJECTIVE)
            : Math.round(plan?.totalProgress ?? avg(progressByType.OBJECTIVE)),
        objectiveCount: typeCount.OBJECTIVE,
        krCount: typeCount.KEY_RESULT,
        kpiCount: typeCount.KPI,
        ownerCount: ownerSet.size,
        focus: avg(progressByType.FOCUS),
        objective: avg(progressByType.OBJECTIVE),
        keyResult: avg(progressByType.KEY_RESULT),
        kpi: avg(progressByType.KPI),
      },
      byOwner,
      statesByType: {
        OBJECTIVE: toSlices(stateCounts.OBJECTIVE),
        KEY_RESULT: toSlices(stateCounts.KEY_RESULT),
        KPI: toSlices(stateCounts.KPI),
      },
      distribution: {
        type: [
          { name: 'Objective', value: typeCount.OBJECTIVE },
          { name: 'Key Result', value: typeCount.KEY_RESULT },
          { name: 'KPI', value: typeCount.KPI },
        ],
        confidence: toSlices(confidence),
        category: toSlices(category),
      },
      focusAreas,
      kpis,
    };
  }, [plan, ownerPersno]);
}
```

---

## 6. Bileşenler (`src/components/dashboard/`)

### 6.1 — `EmptyState.tsx`
```tsx
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import { useTranslation } from 'react-i18next';

type EmptyVariant = 'ring' | 'icon' | 'plain';

interface EmptyStateProps {
  variant?: EmptyVariant;
  height?: number | string;
}

const EmptyState: FC<EmptyStateProps> = ({ variant = 'plain', height }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', gap: 0.5, py: 4, height }}>
      {variant === 'ring' && (
        <Box sx={{ width: 140, height: 140, borderRadius: '50%',
          border: '24px solid', borderColor: '#ECECEC', mb: 3 }} />
      )}
      {variant === 'icon' && (
        <BlockIcon sx={{ fontSize: 40, color: '#C0C0C0', mb: 1 }} />
      )}
      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
        {t('dashboard.noDataTitle')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('dashboard.noDataSubtitle')}
      </Typography>
    </Box>
  );
};

export default EmptyState;
```

### 6.2 — `DonutChart.tsx`
```tsx
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slice } from '../../types';
import EmptyState from './EmptyState';

interface DonutChartProps {
  data: Slice[];
  colors: Record<string, string>;
  centerTotal?: number;
  centerLabel?: string;
  height?: number;
  formatLabel?: (name: string) => string;
}

const DonutChart: FC<DonutChartProps> = ({
  data, colors, centerTotal, centerLabel = 'in total', height = 280, formatLabel,
}) => {
  const label = (name: string) => (formatLabel ? formatLabel(name) : name);
  const sum = data.reduce((s, d) => s + (d.value || 0), 0);
  const total = centerTotal ?? sum;

  if (!data.length || sum === 0) {
    return <EmptyState variant="ring" height={height} />;
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name"
            innerRadius="62%" outerRadius="88%" paddingAngle={1}
            startAngle={90} endAngle={-270}>
            {data.map((slice) => (
              <Cell key={slice.name} fill={colors[slice.name] ?? '#cbd5e1'} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, label(String(name))]} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '0.75rem' }}
            formatter={(value) => label(String(value))} />
        </PieChart>
      </ResponsiveContainer>

      <Box sx={{ position: 'absolute', top: 'calc(50% - 18px)', left: 0, right: 0,
        transform: 'translateY(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
        <Typography variant="h5" fontWeight={700} lineHeight={1.1}>{total}</Typography>
        <Typography variant="caption" color="text.secondary">{centerLabel}</Typography>
      </Box>
    </Box>
  );
};

export default DonutChart;
```

### 6.3 — `TabbedDonutCard.tsx`
```tsx
import React, { FC, useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab } from '@mui/material';
import DonutChart from './DonutChart';
import { Slice } from '../../types';
import { color } from '../../utils';

export interface DonutTab {
  key: string;
  label: string;
  data: Slice[];
  colors: Record<string, string>;
  centerTotal?: number;
}

interface TabbedDonutCardProps {
  title: string;
  tabs: DonutTab[];
  formatLabel?: (name: string) => string;
}

const TabbedDonutCard: FC<TabbedDonutCardProps> = ({ title, tabs, formatLabel }) => {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%',
      border: '1px solid', borderColor: color.paperBorderLight }}>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>{title}</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
        <Tabs value={active} onChange={(_, v) => setActive(v)}
          variant="scrollable" scrollButtons="auto"
          sx={{ minHeight: 36, '& .MuiTab-root': { textTransform: 'none',
            minHeight: 36, minWidth: 80, fontSize: '0.8125rem' } }}>
          {tabs.map((tab) => (<Tab key={tab.key} label={tab.label} />))}
        </Tabs>
      </Box>

      {current && (
        <DonutChart data={current.data} colors={current.colors}
          centerTotal={current.centerTotal} formatLabel={formatLabel} />
      )}
    </Paper>
  );
};

export default TabbedDonutCard;
```

### 6.4 — `OwnerBarChart.tsx`
> Grid çizgisi **silik DÜZ** (`stroke="#EEEEEE"`, `strokeDasharray` YOK — noktalı değil).
```tsx
import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { OwnerRow } from '../../types';
import { color, progressColor } from '../../utils';
import EmptyState from './EmptyState';

interface OwnerBarChartProps {
  title: string;
  data: OwnerRow[];
}

const OwnerBarChart: FC<OwnerBarChartProps> = ({ title, data }) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid',
      borderColor: color.paperBorderLight }}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>{title}</Typography>
      {data.length === 0 ? (
        <EmptyState variant="icon" height={320} />
      ) : (
        <Box sx={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid vertical={false} stroke="#EEEEEE" />
            <XAxis dataKey="owner" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `%${v}`}
              tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip formatter={(v) => `%${v}`} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '0.75rem' }} />
            <Bar dataKey="objective" name={String(t('dashboard.objective'))}
              fill={progressColor.blue} radius={[3, 3, 0, 0]} />
            <Bar dataKey="keyResult" name={String(t('dashboard.keyResult'))}
              fill={progressColor.green} radius={[3, 3, 0, 0]} />
            <Bar dataKey="kpi" name={String(t('dashboard.kpi'))}
              fill={progressColor.orange} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default OwnerBarChart;
```

### 6.5 — `MetricBarList.tsx`
> Tasarım kuralı: label, bar ve değer **TEK SATIRDA** (yatay).
```tsx
import React, { FC } from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import { MetricRow } from '../../types';
import { color } from '../../utils';
import EmptyState from './EmptyState';

interface MetricBarListProps {
  title: string;
  rows: MetricRow[];
}

const MetricBarList: FC<MetricBarListProps> = ({ title, rows }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%',
      border: '1px solid', borderColor: color.paperBorderLight }}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>{title}</Typography>
      {rows.length === 0 ? (
        <EmptyState variant="icon" />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {rows.map((row) => (
            <Box key={row.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2"
                sx={{ color: 'text.secondary', width: '42%', flexShrink: 0 }}>
                {row.name}
              </Typography>
              <LinearProgress variant="determinate" value={row.pct}
                sx={{ flexGrow: 1, height: 8, borderRadius: 4,
                  backgroundColor: `${row.color}2A`,
                  '& .MuiLinearProgress-bar': { backgroundColor: row.color, borderRadius: 4 } }} />
              <Typography variant="body2" fontWeight={600}
                sx={{ minWidth: 36, textAlign: 'right' }}>
                {row.pct}%
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default MetricBarList;
```

### 6.6 — `SummaryCards.tsx`
> Veri yoksa (objective+kr+kpi = 0) Total Progress kartı YEŞİL değil, beyaz bordürlü boş-durum kartı olur. Metrik kartları değere göre `metricColor` ile renklenir.
```tsx
import React, { FC } from 'react';
import { Box, Paper, Typography, LinearProgress, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DashboardSummary } from '../../types';
import { color as palette, metricColor } from '../../utils';
import EmptyState from './EmptyState';

const MetricCard: FC<{ label: string; pct: number }> = ({ label, pct }) => {
  const barColor = metricColor(pct);
  return (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 2, display: 'flex',
    flexDirection: 'column', justifyContent: 'center', gap: 1,
    border: '1px solid', borderColor: palette.paperBorderLight }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="h6" fontWeight={700}>%{pct}</Typography>
    <LinearProgress variant="determinate" value={pct}
      sx={{ height: 8, borderRadius: 4, backgroundColor: `${barColor}2A`,
        '& .MuiLinearProgress-bar': { backgroundColor: barColor, borderRadius: 4 } }} />
  </Paper>
  );
};

const CountItem: FC<{ value: number; label: string }> = ({ value, label }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h6" fontWeight={700} color="#fff">{value}</Typography>
    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>{label}</Typography>
  </Box>
);

const SummaryCards: FC<{ summary: DashboardSummary }> = ({ summary: s }) => {
  const { t } = useTranslation();
  const isEmpty = s.objectiveCount + s.krCount + s.kpiCount === 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr' }, gap: 2 }}>
      {isEmpty ? (
        <Paper elevation={0} sx={{ gridRow: { md: 'span 2' }, p: 3, borderRadius: 2,
          border: '1px solid', borderColor: palette.paperBorderLight,
          display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" fontWeight={600}>{t('dashboard.totalProgress')}</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EmptyState variant="icon" />
          </Box>
        </Paper>
      ) : (
        <Paper elevation={0} sx={{ gridRow: { md: 'span 2' }, p: 3, borderRadius: 2,
          backgroundColor: 'primary.main', color: '#fff', display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>{t('dashboard.totalProgress')}</Typography>
              <Typography variant="h3" fontWeight={700}>%{s.totalProgress}</Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress variant="determinate" value={100} thickness={4} size={84}
                sx={{ color: 'rgba(255,255,255,0.25)' }} />
              <CircularProgress variant="determinate" value={s.totalProgress} thickness={4} size={84}
                sx={{ color: '#fff', position: 'absolute', left: 0 }} />
            </Box>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, pt: 1,
            borderTop: '1px solid rgba(255,255,255,0.25)' }}>
            <CountItem value={s.objectiveCount} label={t('dashboard.objective')} />
            <CountItem value={s.krCount} label={t('dashboard.keyResult')} />
            <CountItem value={s.kpiCount} label={t('dashboard.kpi')} />
            <CountItem value={s.ownerCount} label={t('dashboard.owner')} />
          </Box>
        </Paper>
      )}

      <MetricCard label={t('dashboard.focus')} pct={s.focus} />
      <MetricCard label={t('dashboard.objective')} pct={s.objective} />
      <MetricCard label={t('dashboard.keyResult')} pct={s.keyResult} />
      <MetricCard label={t('dashboard.kpi')} pct={s.kpi} />
    </Box>
  );
};

export default SummaryCards;
```

### 6.7 — `index.ts` (barrel — yalnızca bileşenler)
```ts
export { default as SummaryCards } from './SummaryCards';
export { default as OwnerBarChart } from './OwnerBarChart';
export { default as TabbedDonutCard } from './TabbedDonutCard';
export { default as DonutChart } from './DonutChart';
export { default as MetricBarList } from './MetricBarList';
```
> Tipler `types`'tan, renkler/yardımcılar `utils`'tan, hook `hooks`'tan import edilir — bu barrel'a koyma.

---

## 7. Sayfa (`src/pages/dashboard/DashboardPage.tsx`)

> **Filtre davranışı:** Dropdown'lar "bekleyen" (pending) seçimdir; grafikler "uygulanan" (applied) filtrelere göre hesaplanır. **Get Result** bekleyeni uygular; **Clear** her şeyi temizler → hiçbir plan seçili kalmaz, ekran boş duruma düşer. İlk plan yalnızca **ilk yüklemede** otomatik seçilir (`useRef` ile bir kez; Clear sonrası tekrarlanmaz).
```tsx
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Button } from '@mui/material';
import { BaseSelect, PageTitle, Loading } from '../../components';
import type { BaseSelectOption } from '../../components';
import {
  SummaryCards, OwnerBarChart, TabbedDonutCard, MetricBarList,
} from '../../components/dashboard';
import type { DonutTab } from '../../components/dashboard/TabbedDonutCard';
import { usePlanStore, useGoalStore } from '../../stores';
import { useAuthority } from '../../hooks/useAuthority';
import { useDashboardData } from '../../hooks/useDashboardData';
import { IGoal, IPlan } from '../../types';
import { color, stateColors, distributionColors, categoryColor } from '../../utils';

// Seçili planın ağacından (filtresiz) owner seçeneklerini topla.
function collectOwners(plan: IPlan): BaseSelectOption[] {
  const map = new Map<number, string>();
  const walk = (node: IGoal) => {
    const u = node.goalOwner?.tsaUser;
    if (u?.userPersno != null && !map.has(u.userPersno)) {
      map.set(u.userPersno, u.displayName || '-');
    }
    node.children?.forEach(walk);
  };
  (plan.children ?? []).forEach(walk);
  return Array.from(map.entries()).map(([value, label]) => ({ value: String(value), label }));
}

export const DashboardPage: FC = () => {
  const { t } = useTranslation();
  const { planList, getPlan, loading: planLoading } = usePlanStore();
  const { fetchGoalsByType, loading: goalLoading } = useGoalStore();
  const { isAdmin } = useAuthority();
  const loading = planLoading || goalLoading;

  // Dropdown'daki anlık (pending) seçimler — Get Result'a basılınca uygulanır.
  const [planId, setPlanId] = useState<string>('');
  const [owner, setOwner] = useState<string>('all');
  // Uygulanan (applied) filtreler — grafikler bunlara göre hesaplanır.
  const [appliedPlanId, setAppliedPlanId] = useState<string>('');
  const [appliedOwner, setAppliedOwner] = useState<string>('all');

  useEffect(() => {
    if (!planList.length) fetchGoalsByType('PLAN', isAdmin());
  }, []);

  // Yalnızca İLK yüklemede ilk planı varsayılan seç + uygula (Clear sonrası tekrarlanmaz).
  const didInit = useRef(false);
  useEffect(() => {
    if (!didInit.current && planList.length) {
      didInit.current = true;
      const first = String(planList[0].id);
      setPlanId(first);
      setAppliedPlanId(first);
    }
  }, [planList]);

  // Uygulanan planın TAM ağacını getir.
  useEffect(() => {
    if (appliedPlanId) getPlan(Number(appliedPlanId));
  }, [appliedPlanId]);

  const selectedPlan = useMemo(
    () => planList.find((p) => String(p.id) === appliedPlanId) ?? null,
    [planList, appliedPlanId],
  );

  const ownerPersno = appliedOwner === 'all' ? null : Number(appliedOwner);
  const data = useDashboardData(selectedPlan, ownerPersno);

  // Get Result: bekleyen seçimleri uygula.
  const handleGetResult = () => {
    setAppliedPlanId(planId);
    setAppliedOwner(owner);
  };

  // Clear: tüm filtreleri temizle — hiçbir plan seçili kalmaz, ekran boşalır.
  const handleClear = () => {
    setPlanId('');
    setOwner('all');
    setAppliedPlanId('');
    setAppliedOwner('all');
  };

  const planOptions: BaseSelectOption[] = useMemo(
    () => planList.map((p) => ({ value: String(p.id), label: p.name })),
    [planList],
  );

  const ownerOptions: BaseSelectOption[] = useMemo(
    () => [
      { value: 'all', label: t('dashboard.all') },
      ...(selectedPlan ? collectOwners(selectedPlan) : []),
    ],
    [selectedPlan, t],
  );

  // Donut legend/tooltip etiketlerini sözlüğe çevir (canonical isim -> çeviri).
  const sliceLabel = (name: string): string => {
    const map: Record<string, string> = {
      Open: t('dashboard.stateLabels.open'),
      'In Progress': t('dashboard.stateLabels.inProgress'),
      Done: t('dashboard.stateLabels.done'),
      Cancel: t('dashboard.stateLabels.cancel'),
      Postpone: t('dashboard.stateLabels.postpone'),
      Objective: t('dashboard.objective'),
      'Key Result': t('dashboard.keyResult'),
      KPI: t('dashboard.kpi'),
      'On Track': t('dashboard.confidenceLabels.onTrack'),
      Behind: t('dashboard.confidenceLabels.behind'),
      Overdue: t('dashboard.confidenceLabels.overdue'),
    };
    return map[name] ?? name;
  };

  const statesTabs: DonutTab[] = [
    { key: 'objective', label: t('dashboard.objective'), data: data.statesByType.OBJECTIVE, colors: stateColors },
    { key: 'keyResult', label: t('dashboard.keyResult'), data: data.statesByType.KEY_RESULT, colors: stateColors },
    { key: 'kpi', label: t('dashboard.kpi'), data: data.statesByType.KPI, colors: stateColors },
  ];

  const categoryColors: Record<string, string> = {};
  data.distribution.category.forEach((slice, i) => { categoryColors[slice.name] = categoryColor(i); });

  const distributionTabs: DonutTab[] = [
    { key: 'type', label: t('dashboard.type'), data: data.distribution.type, colors: distributionColors.type },
    { key: 'confidence', label: t('dashboard.confidenceLevel'), data: data.distribution.confidence, colors: distributionColors.confidence },
    { key: 'category', label: t('dashboard.objectiveCategory'), data: data.distribution.category, colors: categoryColors },
  ];

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <PageTitle title={t('dashboard.pageTitle')} />

      <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: color.paperBorderLight }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <BaseSelect label={t('dashboard.plan')} value={planId}
            onChange={(e) => { setPlanId(e.target.value as string); setOwner('all'); }}
            options={planOptions} />
          <BaseSelect label={t('dashboard.owner')} value={owner}
            onChange={(e) => setOwner(e.target.value as string)} options={ownerOptions} />
          <Button variant="contained" onClick={handleGetResult} sx={{ textTransform: 'none' }}>
            {t('dashboard.getResult')}
          </Button>
          <Button variant="text" size="small" onClick={handleClear}
            sx={{ textTransform: 'none', color: color.textError, minWidth: 'auto' }}>
            {t('dashboard.clear')}
          </Button>
        </Box>
      </Paper>

      <Box position="relative">
        <Loading isLoading={loading} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <SummaryCards summary={data.summary} />
          <OwnerBarChart title={t('dashboard.objectiveKrKpiTitle')} data={data.byOwner} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TabbedDonutCard title={t('dashboard.states')} tabs={statesTabs} formatLabel={sliceLabel} />
            <TabbedDonutCard title={t('dashboard.distribution')} tabs={distributionTabs} formatLabel={sliceLabel} />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <MetricBarList title={t('dashboard.focusAreas')} rows={data.focusAreas} />
            <MetricBarList title={t('dashboard.keyPerformanceIndicators')} rows={data.kpis} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
```

---

## 8. i18n (çeviri sözlükleri)

`src/locales/tr.json` ve `en.json` dosyalarında **mevcut `dashboard` bloğunun içine** ekle.

> ⚠️ `dashboard` bloğu zaten vardı (title/subtitle/welcome/...). **İkinci bir `dashboard` bloğu OLUŞTURMA** — JSON'da son anahtar öncekini ezer ve `t()` ham key döndürür. Anahtarları MEVCUT bloğa ekle.

**tr.json → `dashboard` bloğuna:**
```json
"noData": "Veri bulunamadı",
"noDataTitle": "Gösterilecek veri yok",
"noDataSubtitle": "Bu widget için kayıt bulunamadı.",
"pageTitle": "OKR Gösterge Paneli",
"plan": "Plan",
"owner": "Sahip",
"all": "Tümü",
"getResult": "Sonuçları Getir",
"clear": "Temizle",
"totalProgress": "Toplam İlerleme",
"focus": "Fokus",
"objective": "Hedef",
"keyResult": "Anahtar Sonuç",
"kpi": "KPI",
"states": "Durumlar",
"distribution": "Dağılım",
"type": "Tür",
"confidenceLevel": "Güven Seviyesi",
"objectiveCategory": "Hedef Kategorisi",
"focusAreas": "Fokus Alanları %",
"keyPerformanceIndicators": "Temel Performans Göstergeleri %",
"objectiveKrKpiTitle": "Hedef & Anahtar Sonuç & KPI",
"stateLabels": {
  "open": "Açık", "inProgress": "Devam Ediyor", "done": "Tamamlandı",
  "cancel": "İptal", "postpone": "Ertelendi"
},
"confidenceLabels": {
  "onTrack": "Planlandığı Gibi", "behind": "Gecikmeli", "overdue": "Gecikmiş"
}
```

**en.json → `dashboard` bloğuna:**
```json
"noData": "No data available",
"noDataTitle": "No data to display",
"noDataSubtitle": "No records found for this widget.",
"pageTitle": "OKR Dashboard",
"plan": "Plan",
"owner": "Owner",
"all": "All",
"getResult": "Get Result",
"clear": "Clear",
"totalProgress": "Total Progress",
"focus": "Focus",
"objective": "Objective",
"keyResult": "Key Result",
"kpi": "KPI",
"states": "States",
"distribution": "Distribution",
"type": "Type",
"confidenceLevel": "Confidence Level",
"objectiveCategory": "Objective Category",
"focusAreas": "Focus Areas %",
"keyPerformanceIndicators": "Key Performance Indicators %",
"objectiveKrKpiTitle": "Objective & Key Result & KPI",
"stateLabels": {
  "open": "Open", "inProgress": "In Progress", "done": "Done",
  "cancel": "Cancel", "postpone": "Postpone"
},
"confidenceLabels": {
  "onTrack": "On Track", "behind": "Behind", "overdue": "Overdue"
}
```

**Sol menü öğesi** — `main.navbar` bloğuna:
- tr: `"okrDashboard": "Gösterge Paneli"`
- en: `"okrDashboard": "Dashboard"`

Doğrulama: `node -e "require('./src/locales/tr.json');require('./src/locales/en.json');console.log('ok')"`

---

## 9. Bağlama (routing, menü, export)

**`src/pages/index.tsx`:**
```ts
export { DashboardPage } from './dashboard/DashboardPage';
```

**`src/App.tsx`:**
- Import'a `DashboardPage` ekle (mevcut `./pages` import bloğuna).
- Route ekle (`<Route index .../>`'in altına): `<Route path="/dashboard" element={<DashboardPage />} />`

**`src/components/common/navbar/Navbar.tsx`** — `menuList`'te `plans`'ın altına:
```ts
{
  title: t('main.navbar.okrDashboard'),
  id: 'okrDashboard',
  depth: 1,
  url: '/dashboard',
  authorities: ['USER', 'ADMIN', 'SUPER ADMIN'],
},
```

---

## 10. Son doğrulama

```bash
npx tsc --noEmit -p tsconfig.json
npx eslint src/pages/dashboard/DashboardPage.tsx src/components/dashboard/*.tsx src/hooks/useDashboardData.ts
npm start   # tarayıcıda /dashboard
```
Beklenen:
- `/dashboard` açılır, sol menüde "Gösterge Paneli" / "Dashboard".
- İlk plan otomatik seçili gelir; Plan/Owner değiştirip **Get Result**'a basınca veri uygulanır.
- **Clear**'a basınca tüm filtreler temizlenir, hiçbir plan seçili kalmaz, tüm widget'lar boş duruma düşer.
- Veri olan planda: özet sayılar, owner bar (silik düz grid), donut'lar, Focus/KPI listeleri (label-bar-değer tek satır).
- Veri olmayan planda: donut'larda gri halka + "Gösterilecek veri yok / Bu widget için kayıt bulunamadı"; diğerlerinde yasak ikonu + aynı mesaj.
- Metinler dile göre Türkçe/İngilizce; "Sonuçları Getir" solda, "Temizle" kırmızı.

---

## 11. Dosya yapısı özeti

```
src/
  types/interfaces/DashboardTypes.ts   # Slice, OwnerRow, MetricRow, DashboardSummary, DashboardData
  types/index.ts                       # + export * from './interfaces/DashboardTypes'
  utils/constants.ts                   # ORTAK: color, progressColor, VISIBLE_LIMIT
  utils/dashboard.ts                   # DASHBOARD'A ÖZEL: stateColors, distributionColors, categoryColor, metricColor
  utils/index.ts                       # + export * from './dashboard'
  hooks/useDashboardData.ts            # tek geçişli aggregation hook
  components/dashboard/
    EmptyState.tsx
    DonutChart.tsx
    TabbedDonutCard.tsx
    OwnerBarChart.tsx
    MetricBarList.tsx
    SummaryCards.tsx
    index.ts                           # yalnızca bileşen export'ları
  pages/dashboard/DashboardPage.tsx
```

---

