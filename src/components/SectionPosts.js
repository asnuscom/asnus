import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {getPages, Link, withPrefix} from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPosts extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        let recent_posts = display_posts.slice(0, _.get(section, 'posts_number', null));
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-posts">
              {_.get(section, 'title', null) && (
              <h2 className="block-title underline inner-sm">{_.get(section, 'title', null)}</h2>
              )}
              <div className="post-feed">
                <div className="post-feed-inside">
                  {_.map(recent_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-inside">
                      {_.get(post, 'frontmatter.content_img_path', null) && (
                      <Link className="post-thumbnail" to={withPrefix(_.get(post, 'url', null))}><img src={withPrefix(_.get(post, 'frontmatter.content_img_path', null))} alt={_.get(post, 'frontmatter.content_img_alt', null)} /></Link>
                      )}
                      <header className="post-header">
                        <h3 className="post-title"><Link to={withPrefix(_.get(post, 'url', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link></h3>
                      </header>
                      <div className="authorName">
                    {_.get(post, 'frontmatter.author', null) && (_.split(_.get(post, 'frontmatter.author', null), ',').map((author, index) => {
                      return <div>
                        {index !== 0 && <span style={{ marginInline: '3px' }}>&</span>}
                        <a href={withPrefix(author.trim())}>{author.trim().toUpperCase()}</a>
                      </div>
                    })
                    )}
                  </div>
                      {_.get(post, 'frontmatter.subtitle', null) && (
                      <div className="post-content">
                        <p>{_.get(post, 'frontmatter.subtitle', null)}</p>
                      </div>
                      )}
                      <footer className="post-meta">
                        <time className="published"
                          dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%d %B %Y')}</time>
                      </footer>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
              {_.get(section, 'actions', null) && (
              <div className="block-buttons inner-sm">
                <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
              </div>
              )}
            </section>
        );
    }
}
