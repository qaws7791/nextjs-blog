import React from 'react'
import Date from './date'
import Link from 'next/link'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {urlForImage} from '@/lib/sanity'
import PostHeader from './post-header'

const PostContent = ({mainImage, title, body}) => {
  return (
    <div className="post-content">
      <div className="post-image">
        <Image
          src={urlForImage(mainImage).width(1000).url()}
          alt={title}
          width={1000}
          height={1000}
          style={{height: 'auto'}}
        />
      </div>
      <div className="post-text">
        <PortableText value={body} />
      </div>
    </div>
  )
}

export default PostContent
