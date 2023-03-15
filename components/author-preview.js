import React from 'react'
import AuthorPreviewHeader from './author-preview-header'
import AuthorPreviewContent from './author-preview-content'
import './author-preview.css'

const AuthorPreview = ({author}) => {
  return (
    <li key={author.name} className="author-item">
      <AuthorPreviewHeader
        slug={author.slug}
        name={author.name}
        image={author.image}
      />

      <AuthorPreviewContent
        slug={author.slug}
        name={author.name}
        numberOfPosts={author.numberOfPosts}
        description={author.description}
      />
    </li>
  )
}

export default AuthorPreview
