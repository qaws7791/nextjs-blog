import React from 'react'
import Date from './date'
import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

const PostHeader = ({title, category, publishedAt, author}) => {
  return (
    <div className="post-header">
      <div className="post-header-info">
        <p className="post-category">{category.title}</p>
        <div className="post-time">
          <Date dateString={publishedAt}></Date>
        </div>
      </div>

      <h1 className="post-title">{title}</h1>
      <div className="post-author">
        <Link href={`/author/${author.slug.current}`} passHref>
          <Image
            className="author-image"
            src={urlForImage(author.image).height(500).width(500).url()}
            alt={title}
            width={50}
            height={50}
          />
        </Link>
        <Link href={`/author/${author.slug.current}`} passHref>
          <p className="author-name">{author.name}</p>
        </Link>
      </div>
    </div>
  )
}

export default PostHeader
