import {sanityClient} from '@/lib/sanity.server'
import Post from '@/components/post'

export const dynamicParams = false

export default async function PostPage({params}) {
  const {slug} = params
  const post = await getPost(slug)
  return <Post post={post} />
}

export async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current =="${slug}"][0]{
    publishedAt,
    author-> {
      name,
      slug,
      image,
    },
    body,
    category->,
    mainImage,
    title,
  }
  `

  const post = await sanityClient.fetch(query)
  return post
}

export async function generateMetadata({params, searchParams}) {
  const postData = await getPost(params.slug)
  return {title: postData.title}
}

export async function generateStaticParams() {
  const query = `
    *[_type=="post"] {
        slug
    }
    `

  const allPosts = await sanityClient.fetch(query)

  const allPaths = allPosts.map((post) => {
    return {
      slug: post.slug.current,
    }
  })

  return allPaths
}
