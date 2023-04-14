export const dynamicParams = false
import {sanityClient} from '@/lib/sanity.server'
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

        <div className="author-posts">
          {posts.map((post) => {
            post.author = author
            return <PostPreview post={post} key={post.title} />
          })}
        </div>
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
