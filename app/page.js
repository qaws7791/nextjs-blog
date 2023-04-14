import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'
import {recentPostQuery} from '@/lib/queries'
import styles from './page.module.css'

export default async function Home() {
  const posts = await getStaticData()
  return (
    <>
      <h1 className={styles.title}>Recently Post</h1>
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
