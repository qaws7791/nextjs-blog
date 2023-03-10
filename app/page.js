import Link from 'next/link'
import {sanityClient} from '@/lib/sanity.server'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'
import Date from '@/components/date'
import './page.css'

export default async function Home() {
  const posts = await getStaticData()
  return (
    <>
      <section className="main-container">
        {posts.map((post) => (
          <article key={post.title} className="post-preview">
            <div className="post-preview-header">
              <div className="post-preview-author">
                <Link href={`/author/${post.author.slug.current}`} passHref>
                  <Image
                    className="author-image"
                    src={urlForImage(post.author.image).height(500).width(500).url()}
                    alt={post.title}
                    width={40}
                    height={40}
                  />
                </Link>
                <Link href={`/author/${post.author.slug.current}`} passHref>
                  <p className="author-name">{post.author.name}</p>
                </Link>
                <Date dateString={post.publishedAt}></Date>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{fill: 'rgba:(0,0,0,0.2)'}}
              >
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </div>

            <div className="post-preview-content">
              <Link href={`/posts/${post.slug.current}`}>
                <h3 className="post-preview-title">{post.title}</h3>
                <Image
                  src={urlForImage(post.mainImage).height(1000).width(1000).url()}
                  alt={post.title}
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
          </article>
        ))}

        <Link href={'/posts'}>
          <h2>All Posts →</h2>
        </Link>
        <Link href={'/author'}>
          <h2>All Users →</h2>
        </Link>
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
