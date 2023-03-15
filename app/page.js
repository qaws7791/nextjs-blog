import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'
import {recentPostQuery} from '@/lib/queries'

export default async function Home() {
  const posts = await getStaticData()
  return (
    <>
      {posts.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
    </>
  )
}

export async function getStaticData() {
  const recentlyPost = await sanityClient.fetch(recentPostQuery)

  return recentlyPost
}
