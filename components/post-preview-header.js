import React from 'react'
import Link from 'next/link'
import Date from './date'
import ImageContainer from './Image'

const PostPreviewHeader = ({publishedAt, author, title}) => {
  return (
    <div className="post-preview-header">
      <div className="post-preview-author">
        <Link href={`/author/${author.slug.current}`} passHref>
          <ImageContainer
            className="author-image"
            image={author.image}
            alt={title}
            title={title}
            width={40}
            height={40}
          />
        </Link>
        <Link href={`/author/${author.slug.current}`} passHref>
          <p className="author-name">{author.name}</p>
        </Link>
        <Date dateString={publishedAt}></Date>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{fill: 'rgba:(0,0,0,0.2)'}}
      >
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
      </svg>
    </div>
  )
}

export default PostPreviewHeader
