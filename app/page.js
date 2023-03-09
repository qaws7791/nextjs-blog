import Link from 'next/link'
import {sanityClient} from '@/lib/sanity.server'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'

export default async function Home() {
  const post = await getStaticData()
  return (
    <>
      <section>
        <h2>Blog</h2>
        <article>
          <h3>{post.title}</h3>
          <Link href={`/author/${post.author.slug.current}`} passHref>
            <Image
              src={urlForImage(post.author.image).height(100).width(100).url()}
              alt={post.title}
              width={100}
              height={100}
            />
          </Link>
          <p>By {post.author.name}</p>

          <div>
            <Image
              src={urlForImage(post.mainImage).height(1000).width(2000).url()}
              alt={post.title}
              width={1000}
              height={1000}
              style={{height: '100%', width: '100%'}}
            />
          </div>
        </article>
        <Link href={'/posts'}>
          <h2>All Posts →</h2>
        </Link>
        <Link href={'/authors'}>
          <h2>All Users →</h2>
        </Link>
      </section>
    </>
  )
}

export async function getStaticData() {
  const query = `
  *[_type=="post"] | order(_updatedAt asc)[0] {
    title,
      mainImage,
      slug,
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
