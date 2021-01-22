import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {getPages, Link, withPrefix} from '../utils';

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
        let display_posts = _.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'),function(x){return x.frontmatter.author==="ihsansunman"}), 'frontmatter.date', 'desc');
        console.log(this.props)
        return (
            <Layout {...this.props}>
              <div className="underline authorHeader">
              <header className="row">
                <h2>{_.get(this.props, 'pageContext.frontmatter.title', null)}'a ait gönderiler</h2>
                <button className="button portfolyoButton" href={withPrefix("http://"+_.get(this.props, 'pageContext.frontmatter.excerpt', null))}>Portfolyo & Özgeçmiş</button>
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
                      {_.get(post, 'frontmatter.author', null) && (
                      <div className="authorName">       
                        <p>{_.get(post, 'frontmatter.author', null).toUpperCase()}</p>
                      </div>
                      )}
                      {_.get(post, 'frontmatter.excerpt', null) && (
                      <div className="post-content">       
                        <p>{_.get(post, 'frontmatter.excerpt', null)}</p>
                      </div>
                      )}
                      <footer className="post-meta">
                        <time className="published"
                          dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
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
