import React from 'react'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

const ImageContainer = ({
  className,
  image,
  alt,
  title,
  width,
  height,
  style,
}) => {
  return (
    <Image
      className={className}
      src={urlForImage(image).height(height).width(width).url()}
      alt={alt || title}
      title={title}
      width={width}
      height={height}
      style={style}
    />
  )
}

export default ImageContainer
