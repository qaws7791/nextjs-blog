import {sanityClient} from '@/lib/sanity.server'
import {NextResponse} from 'next/server'

export async function GET(req) {
  const {searchParams} = new URL(req.url)
  const lastPublishedAt = searchParams.get('lastPublishedAt')
  const lastId = searchParams.get('lastId')
  let filter = ''
  if (lastPublishedAt && lastId) {
    filter = `&& (
        publishedAt < "${lastPublishedAt}"
        || (publishedAt == "${lastPublishedAt}" && _id < "${lastId}")
      )`
  } else {
    filter = ''
  }
  const result = await sanityClient.fetch(
    `*[_type == "post" ${filter} ] | order(publishedAt desc) [0...6] {
          title,
          _id,
          mainImage,
          slug,
          publishedAt,
          author->{
          name,
          image,
          slug
          }
        }`
  )

  return NextResponse.json(result)
}
