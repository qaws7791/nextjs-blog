export const dynamicParams = false
import Image from 'next/image'
import {sanityClient} from '@/lib/sanity.server'
import {urlForImage} from '@/lib/sanity'
import PostPreview from '@/components/post-preview'
import './page.css'
import AuthorHeader from '@/components/author-header'
import {authorPostsQuery, authorSlugsQuery} from '@/lib/queries'

export default async function AuthorPage({params}) {
  const {description, name, posts, image, postLength, slug} =
    await getStaticData(params.slug)
  const author = {image: image, slug: slug, name: name}
  return (
    <>
      <div className="author">
        <AuthorHeader
          image={image}
          name={name}
          description={description}
          postLength={postLength}
        />
      </div>
      <div className="author-posts">
        {posts.map((post) => (
          <PostPreview post={post} author={author} key={post.title} />
        ))}
      </div>
    </>
  )
}

export async function getStaticData(slug) {
  const authorWithPosts = await sanityClient.fetch(authorPostsQuery, {
    slug: slug,
  })
  return authorWithPosts
}

export async function generateStaticParams() {
  const allAuthors = await sanityClient.fetch(authorSlugsQuery)

  const allPaths = allAuthors.map((author) => {
    return {
      slug: author.slug.current,
    }
  })

  return allPaths
}
