export const dynamicParams = false
import Image from 'next/image'
import Link from 'next/link'
import {sanityClient} from '@/lib/sanity.server'
import {urlForImage} from '@/lib/sanity'

export default async function AuthorPage({params}) {
  const {description, name, posts} = await getStaticData(params.slug)
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      {posts &&
        posts.map((post) => (
          <li key={post.title}>
            <h4>{post.title}</h4>
            <Link href={`/posts/${post.slug.current}`} passHref>
              <Image
                src={urlForImage(post.mainImage).height(1000).width(2000).url()}
                alt={post.title}
                title={post.title}
                width={1000}
                height={1000}
                style={{height: '100%', width: '100%'}}
              />
            </Link>
          </li>
        ))}
    </div>
  )
}

export async function getStaticData(slug) {
  const query = `
  *[_type == "author" && slug.current =="${slug}"][0]{
    ...,
    "posts": *[_type == "post" && author._ref in *[_type=="author" && name == "Liam" ]._id ]
  }
  `

  const authorWithPosts = await sanityClient.fetch(query)
  console.log(authorWithPosts)
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
