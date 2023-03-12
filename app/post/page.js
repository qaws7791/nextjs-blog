import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'

export default async function PostsPage() {
  const allPosts = await getStaticData()
  return (
    <div>
      {allPosts.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
    </div>
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
  const allPosts = await sanityClient.fetch(query)
  return allPosts
}
