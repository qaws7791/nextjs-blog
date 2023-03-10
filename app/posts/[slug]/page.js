import utilStyles from '../../utils.module.css'
import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import {urlForImage} from '@/lib/sanity'
import {sanityClient} from '@/lib/sanity.server'
import Date from '@/components/date'
import './page.css'
export const dynamicParams = false

export default async function Post({params}) {
  const {slug} = params
  const {title, publishedAt, author, body, categories, mainImage} =
    await getPost(slug)
  console.log(title, publishedAt, author, body)
  return (
    <>
      <article className="post">
        <div className="post-header">
          <div className="post-header-info">
            <p className="post-category">{categories.title}</p>
            <div className="post-time">
              <Date dateString={publishedAt}></Date>
            </div>
          </div>

          <h1 className="post-title">{title}</h1>
          <div className="post-author">
            <Link href={`/author/${author.slug.current}`} passHref>
              <Image
                className="author-image"
                src={urlForImage(author.image).height(500).width(500).url()}
                alt={title}
                width={50}
                height={50}
              />
            </Link>
            <Link href={`/author/${author.slug.current}`} passHref>
              <p className="author-name">{author.name}</p>
            </Link>
          </div>
        </div>

        <div className="post-content">
          <div className="post-image"></div>
          <Image
            src={urlForImage(mainImage).width(1000).url()}
            alt={title}
            width={1000}
            height={1000}
            style={{height: 'auto'}}
          />
          <PortableText value={body} />
        </div>
      </article>
    </>
  )
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
    categories[0]->,
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
