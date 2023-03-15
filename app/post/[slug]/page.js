import {sanityClient} from '@/lib/sanity.server'
import Post from '@/components/post'
import {postQuery, postSlugsQuery} from '@/lib/queries'

export const dynamicParams = false

export default async function PostPage({params}) {
  const {slug} = params
  const post = await getPost(slug)
  return <Post post={post} />
}

export async function getPost(slug) {
  const post = await sanityClient.fetch(postQuery, {
    slug: slug,
  })
  return post
}

export async function generateMetadata({params, searchParams}) {
  const postData = await getPost(params.slug)
  return {title: postData.title}
}

export async function generateStaticParams() {
  const allPosts = await sanityClient.fetch(postSlugsQuery)

  const allPaths = allPosts.map((post) => {
    return {
      slug: post.slug.current,
    }
  })

  return allPaths
}
