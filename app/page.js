import Link from 'next/link'
import {sanityClient} from '@/lib/sanity.server'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'
import Date from '@/components/date'
import './page.css'
import PostPreview from '@/components/post-preview'

export default async function Home() {
  const posts = await getStaticData()
  return (
    <>
      <section className="main-container">
        {posts.map((post) => (
          <PostPreview post={post} key={post.title} />
        ))}
      </section>
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
