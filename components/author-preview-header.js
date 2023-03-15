import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

const AuthorPreviewHeader = ({slug, image, name}) => {
  return (
    <div className="author-preview-header">
      <Link href={`/author/${slug.current}`} passHref>
        <Image
          className="author-preview-image"
          src={urlForImage(image).height(1000).width(1000).url()}
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
