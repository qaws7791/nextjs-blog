export const authorPostsQuery = `
*[_type == "author" && slug.current ==$slug][0]{
  ...,
  "posts": *[_type == "post" && author._ref ==^._id ],
  "postLength": count(*[_type == "post" && author._ref ==^._id ])
}
`

export const authorListQuery = `
*[_type=="author"] {
  image,
  name,
  slug,
  description,
  "numberOfPosts": count(*[_type=="post" && author._ref==^._id])
}
`

export const authorSlugsQuery = `
*[_type=="author"] {
  slug
}
`

export const categoryPostsQuery = `
*[_type == "category" && slug.current==$slug][0]{
  ...,
  "posts": *[_type == "post" && category._ref ==^._id]{
    ...,
    author->,
  },
  "postNumber": count(*[_type == "post" && category._ref ==^._id ])
}
`

export const categorySlugsQuery = `
*[_type=="category"] {
  slug
}
`

export const allCategoryQuery = `
*[_type == "category"]
`

export const postQuery = `
*[_type == "post" && slug.current ==$slug][0]{
  publishedAt,
  author-> {
    name,
    slug,
    image,
  },
  body,
  category->,
  mainImage,
  title,
}
`

export const postSlugsQuery = `
*[_type=="post"] {
  slug
}
`

export const recentPostQuery = `
*[_type=="post"] | order(_updatedAt asc)[0...5] {
  title,
  mainImage,
  slug,
  publishedAt,
  author->{
    name,
    image,
    slug
  }
}
`
