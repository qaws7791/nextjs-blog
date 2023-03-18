import React from 'react'
import Link from 'next/link'
import './category-list.css'

const CategoryList = ({Categories}) => {
  return (
    <ul className="category-list">
      {Categories.map((cat) => (
        <li key={cat.title} className="category-item">
          <Link href={`/category/${cat.slug.current}`}>{cat.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
