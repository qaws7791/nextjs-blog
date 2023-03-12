export const dynamicParams = false
import Image from 'next/image'
import {sanityClient} from '@/lib/sanity.server'
import {urlForImage} from '@/lib/sanity'
import PostPreview from '@/components/post-preview'
import './page.css'

export default async function AuthorPage({params}) {
  const {description, name, posts, image, postLength, slug} =
    await getStaticData(params.slug)
  const author = {image: image, slug: slug, name: name}
  return (
    <div className="author">
      <div className="author-header">
        <div className="author-image">
          <Image
            src={urlForImage(image).height(500).width(500).url()}
            alt={name}
            title={name}
            width={100}
            height={100}
          />
        </div>
        <h1 className="author-name">{name}</h1>
        <h2 className="author-desc">{description}</h2>
        <p className="author-number">posted {postLength} post</p>
      </div>
      <div className="author-posts">
        {posts.map((post) => (
          <PostPreview post={post} author={author} key={post.title} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticData(slug) {
  const query = `
  *[_type == "author" && slug.current =="${slug}"][0]{
    ...,
    "posts": *[_type == "post" && author._ref in *[_type=="author" && slug.current == "${slug}" ]._id ],
    "postLength": count(*[_type == "post" && author._ref in *[_type=="author" && slug.current == "liam" ]._id ])
  }
  `

  const authorWithPosts = await sanityClient.fetch(query)
  return authorWithPosts
}

export async function generateStaticParams() {
  const query = `
    *[_type=="author"] {
        slug
    }
    `

  const allAuthors = await sanityClient.fetch(query)

  const allPaths = allAuthors.map((author) => {
    return {
      slug: author.slug.current,
    }
  })

  return allPaths
}
