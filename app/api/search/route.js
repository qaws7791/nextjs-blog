import {sanityClient} from '@/lib/sanity.server'
import {NextResponse} from 'next/server'

export async function GET(req) {
  const {searchParams} = new URL(req.url)
  const searchText = searchParams.get('searchText')
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
    `*[_type== "post" ${filter} && title match $searchText] | order(publishedAt desc) [0...6] {
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
        }`,
    {searchText: searchText}
  )

  return NextResponse.json({result})
}
