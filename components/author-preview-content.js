import React from 'react'
import Link from 'next/link'

const AuthorPreviewContent = ({slug, name, numberOfPosts, description}) => {
  return (
    <div className="author-preview-content">
      <Link href={`/author/${slug.current}`} passHref>
        <h2 className="author-preview-name">{name}</h2>
      </Link>
      <span className="author-preview-number">{numberOfPosts} posts</span>
      <h3 className="author-preview-desc">{description}</h3>
    </div>
  )
}

export default AuthorPreviewContent
