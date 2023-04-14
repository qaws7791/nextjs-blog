//해당 author의 모든 posts들을 요청
export const authorPostsQuery = `
*[_type == "author" && slug.current ==$slug][0]{
  ...,
  "posts": *[_type == "post" && author._ref ==^._id ],
  "postLength": count(*[_type == "post" && author._ref ==^._id ])
}
`

//모든 author 요청
export const authorListQuery = `
*[_type=="author"] {
  image,
  name,
  slug,
  description,
  "numberOfPosts": count(*[_type=="post" && author._ref==^._id])
}
`

//모든 author의 slug 요청
export const authorSlugsQuery = `
*[_type=="author"] {
  slug
}
`

//해당 category의 모든 post들을 요청
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

// 모든 category의 slug 요청
export const categorySlugsQuery = `
*[_type=="category"] {
  slug
}
`

//모든 category 요청
export const allCategoryQuery = `
*[_type == "category"]
`

//단일 post 요청
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
//모든 post의 slug만 요청
export const postSlugsQuery = `
*[_type=="post"] {
  slug
}
`

//최근 게시물 5개를 요청
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
