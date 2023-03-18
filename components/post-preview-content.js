import React from 'react'
import Link from 'next/link'
import ImageContainer from './Image'

const PostPreviewContent = ({title, slug, mainImage}) => {
  return (
    <div className="post-preview-content">
      <Link href={`/post/${slug.current}`}>
        <h3 className="post-preview-title">{title}</h3>
        <ImageContainer
          image={mainImage}
          alt={title}
          title={title}
          width={1000}
          height={1000}
        />
      </Link>
    </div>
  )
}

export default PostPreviewContent
