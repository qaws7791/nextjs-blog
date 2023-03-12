import React from 'react'
import PostHeader from './post-header'
import PostContent from './post-content'
import PostFooter from './post-footer'
import './post.css'

const Post = ({post}) => {
  const {categories, publishedAt, mainImage, body, title, author} = post
  return (
    <article className="post">
      <PostHeader
        title={title}
        categories={categories}
        publishedAt={publishedAt}
        author={author}
      />

      <PostContent mainImage={mainImage} title={title} body={body} />

      <PostFooter />
    </article>
  )
}

export default Post
