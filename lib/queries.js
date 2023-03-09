const postFields = `
_id,
title,
mainImage,
publishedAt,
"slug": slug.current,
"author": author->{name, image},
`

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`
