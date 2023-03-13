import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'
import './page.css'

export default async function catPage({params}) {
  const category = await getCategory(params.slug)
  const allPost = await getStaticData(category._id)
  return (
    <div>
      <div className="category-header">
        <h1 className="category-name">{category.title}</h1>
        <p className="category-number">
          <b>{category.postNumber}</b> post
        </p>
      </div>

      {allPost.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
    </div>
  )
}

export async function getCategory(slug) {
  const query = `
  *[_type == "category" && slug.current=="${slug}"][0]{
    ...,
    "postNumber": count(*[_type=="post" && category._ref in  *[_type=="category" && slug.current == "life" ]._id])
  }
  `

  const category = await sanityClient.fetch(query)
  return category
}

export async function getStaticData(id) {
  const query = `
  *[_type == "post" && category._ref == "${id}"] {
    ...,
    category->,
    author->
  }
  `

  const allCategoryPost = await sanityClient.fetch(query)
  return allCategoryPost
}

export async function generateStaticParams() {
  const query = `
      *[_type=="category"] {
          slug
      }
      `

  const allCategory = await sanityClient.fetch(query)

  const allPaths = allCategory.map((cat) => {
    return {
      slug: cat.slug.current,
    }
  })
  return allPaths
}
