import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'
import PostPreviewHeader from './post-preview-header'
import PostPreviewContent from './post-preview-content'

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
