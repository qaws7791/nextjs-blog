import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

const AuthorHeader = ({image, name, description, postLength}) => {
  return (
    <div className="author-header">
      <div className="author-image">
        <Image
          src={urlForImage(image).height(500).width(500).url()}
          alt={name}
          title={name}
          width={140}
          height={140}
        />
      </div>
      <h1 className="author-name">{name}</h1>
      <h2 className="author-desc">{description}</h2>
      <p className="author-number">posted {postLength} post</p>
    </div>
  )
}

export default AuthorHeader
