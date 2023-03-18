import React from 'react'
import Link from 'next/link'
import ImageContainer from './Image'

const AuthorPreviewHeader = ({slug, image, name}) => {
  return (
    <div className="author-preview-header">
      <Link href={`/author/${slug.current}`} passHref>
        <ImageContainer
          className="author-preview-image"
          image={image}
          alt={name}
          title={name}
          width={1000}
          height={1000}
        />
      </Link>
    </div>
  )
}

export default AuthorPreviewHeader
