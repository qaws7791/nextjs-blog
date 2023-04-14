import React from 'react'
import PostPreviewHeader from './post-preview-header'
import PostPreviewContent from './post-preview-content'
import './post-preview.css'

const PostPreview = ({post}) => {
  return (
    <article key={post.title} className="post-preview">
      <PostPreviewHeader
        publishedAt={post.publishedAt}
        author={post.author}
        title={post.title}
      />
      <PostPreviewContent
        title={post.title}
        slug={post.slug}
        mainImage={post.mainImage}
      />
    </article>
  )
}

export default PostPreview
