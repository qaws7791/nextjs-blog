import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'

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
  const query = `
  *[_type=="post"] | order(_updatedAt asc)[0...5] {
    title,
    mainImage,
    slug,
    publishedAt,
    author->{
      name,
      image,
      slug
    }
  }
  `
  const recentlyPost = await sanityClient.fetch(query)

  return recentlyPost
}
