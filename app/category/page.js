import {sanityClient} from '@/lib/sanity.server'
import Link from 'next/link'
import './page.css'

export default async function allCatPage() {
  const allCategory = await getStaticData()
  return (
    <ul className="category-list">
      {allCategory.map((cat) => (
        <li key={cat.title} className="category-item">
          <Link href={`/category/${cat.slug.current}`}>{cat.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticData() {
  const query = `
    *[_type == "category"]
    `

  const allCategory = await sanityClient.fetch(query)
  return allCategory
}
