import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'
import './page.css'
import {categoryPostsQuery, categorySlugsQuery} from '@/lib/queries'
import CategoryHeader from '@/components/category-header'

export default async function catPage({params}) {
  const {title, posts, postNumber} = await getStaticData(params.slug)
  return (
    <div>
      <CategoryHeader title={title} postNumber={postNumber} />

      {posts.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
    </div>
  )
}

export async function getStaticData(slug) {
  const allCategoryPost = await sanityClient.fetch(categoryPostsQuery, {
    slug: slug,
  })
  return allCategoryPost
}

export async function generateStaticParams() {
  const allCategory = await sanityClient.fetch(categorySlugsQuery)

  const allPaths = allCategory.map((cat) => {
    return {
      slug: cat.slug.current,
    }
  })
  return allPaths
}
