import {sanityClient} from '@/lib/sanity.server'
import {allCategoryQuery} from '@/lib/queries'
import CategoryList from '@/components/category-list'

export default async function allCatPage() {
  const allCategory = await getStaticData()
  return <CategoryList Categories={allCategory} />
}

export async function getStaticData() {
  const allCategory = await sanityClient.fetch(allCategoryQuery)
  return allCategory
}
