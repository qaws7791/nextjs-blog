import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

const PostPreviewContent = ({title, slug, mainImage}) => {
  return (
    <div className="post-preview-content">
      <Link href={`/posts/${slug.current}`}>
        <h3 className="post-preview-title">{title}</h3>
        <Image
          src={urlForImage(mainImage).height(1000).width(1000).url()}
          alt={title}
          width={1000}
          height={1000}
        />
      </Link>
    </div>
  )
}

export default PostPreviewContent
