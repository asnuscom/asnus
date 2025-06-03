import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { graphql } from 'gatsby';

import { Layout } from '../components/index';
import { getPages, Link, withPrefix } from '../utils';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Blog extends React.Component {
  render() {
    let authorName = this.props.pageContext.name;
    let display_posts = _.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), function (x) { return x.frontmatter.author.includes(authorName) }), 'frontmatter.date', 'desc');
    return (
      <Layout {...this.props}>
        <div className="underline authorHeader">
          <header className="row">
            <h2>{_.get(this.props, 'pageContext.frontmatter.title', null)}'a ait gönderiler</h2>
            <a className="button portfolyoButton" href={withPrefix("http://" + _.get(this.props, 'pageContext.frontmatter.excerpt', null))}>Portfolyo & Özgeçmiş</a>
          </header>
        </div>
        <div className="post-feed">
          <div className="post-feed-inside">
            {_.map(display_posts, (post, post_idx) => (
              <article key={post_idx} className="post post-card">
                <div className="post-inside">
                  {_.get(post, 'frontmatter.thumb_img_path', null) && (
                    <Link className="post-thumbnail" to={withPrefix(_.get(post, 'url', null))}>
                      <img src={withPrefix(_.get(post, 'frontmatter.thumb_img_path', null))} alt={_.get(post, 'frontmatter.thumb_img_alt', null)} />
                    </Link>
                  )}
                  <header className="post-header">
                    <h2 className="post-title">
                      <Link to={withPrefix(_.get(post, 'url', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link>
                    </h2>

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

                  {_.get(post, 'frontmatter.excerpt', null) && (
                    <div className="post-content">
                      <p>{_.get(post, 'frontmatter.excerpt', null)}</p>
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
      </Layout>
    );
  }
}
