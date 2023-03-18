import React from 'react'
import './category-header.css'

const CategoryHeader = ({title, postNumber}) => {
  return (
    <div className="category-header">
      <h1 className="category-name">{title}</h1>
      <p className="category-number">
        <b>{postNumber}</b> post
      </p>
    </div>
  )
}

export default CategoryHeader
