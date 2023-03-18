import ImageContainer from './Image'
import './author-header.css'

const AuthorHeader = ({image, name, description, postLength}) => {
  return (
    <div className="author-header">
      <div className="author-image">
        <ImageContainer
          image={image}
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
