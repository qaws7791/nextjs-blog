import React from 'react'
import {PortableText} from '@portabletext/react'
import ImageContainer from './Image'

const PostContent = ({mainImage, title, body}) => {
  return (
    <div className="post-content">
      <div className="post-image">
        <ImageContainer
          image={mainImage}
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
