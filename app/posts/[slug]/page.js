import utilStyles from '../../utils.module.css'
import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'
import {sanityClient} from '@/lib/sanity.server'
export const dynamicParams = false

export default async function Post({params}) {
  const {slug} = params
  const {title, _updatedAt, author, body} = await getPost(slug)
  console.log(title, _updatedAt, author, body)
  return (
    <>
      <article>
        <h2>{title}</h2>
        <p>updated {_updatedAt}</p>
        <Image
          src={urlForImage(author.image).height(500).width(500).url()}
          alt={title}
          title={title}
          width={50}
          height={50}
        />
        <p>{author.name}</p>
        <div>
          <PortableText value={body} />
        </div>
      </article>
    </>
  )
}

export async function getPost(slug) {
  const query = `
    *[_type == "post" && slug.current =="about-the-environmental-pollution-of-the-earth"][0]{
    _updatedAt,
    author-> {
      name,
      image,
    },
    body,
    categories,
    mainImage,
    title
  }
  `

  const post = await sanityClient.fetch(query)
  return post
}

export async function generateMetadata({params, searchParams}) {
  const postData = await getPost(params.id)
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
