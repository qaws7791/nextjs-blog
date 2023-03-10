import {sanityClient} from '@/lib/sanity.server'
import {indexQuery} from '@/lib/queries'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

export default async function PostsPage() {
  const allPosts = await getStaticData()
  return (
    <div>
      {allPosts.map((post) => (
        <article key={post.slug}>
          <h3>{post.title}</h3>
          <Image
            src={urlForImage(post.mainImage).height(1000).width(2000).url()}
            alt={post.title}
            width={1000}
            height={1000}
            style={{height: '100%', width: '100%'}}
          />
        </article>
      ))}
    </div>
  )
}

export async function getStaticData() {
  const allPosts = await sanityClient.fetch(indexQuery)
  return allPosts
}
