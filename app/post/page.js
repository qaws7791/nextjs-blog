'use client'

import {sanityClient} from '@/lib/sanity.server'
import PostPreview from '@/components/post-preview'
import {useState, useEffect} from 'react'

export default function PostsPage() {
  // const allPosts = await getStaticData()
  const [posts, setPosts] = useState([])
  const [lastPublishedAt, setLastPublishedAt] = useState('')
  const [lastId, setLastId] = useState('')
  const [isFetching, setFetching] = useState(true)
  const [hasNextPage, setNextPage] = useState(true)

  async function fetchNextPage() {
    try {
      const response = await fetch(
        '/api/post?' +
          new URLSearchParams({
            lastPublishedAt,
            lastId,
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) throw new Error(`ERROR: ${response.status}`)
      const {result} = await response.json()
      setPosts(posts.concat(result))

      if (result.length > 0) {
        setLastPublishedAt(result[result.length - 1].publishedAt)
        setLastId(result[result.length - 1]._id)
      } else {
        setLastId(null) // Reached the end
      }
    } catch (e) {
      console.log('ERROR', e)
      setFetching(false)
    }
    setFetching(false)
  }

  useEffect(() => {
    if (isFetching) fetchNextPage()
  }, [isFetching])

  return (
    <div>
      {posts.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
      {lastId && (
        <button
          onClick={() => {
            setFetching(true)
          }}
        >
          more post
        </button>
      )}
    </div>
  )
}

// export async function getStaticData() {
//   const query = `
//   *[_type=="post"] | order(publishedAt desc)[0...5] {
//     title,
//     mainImage,
//     slug,
//     publishedAt,
//     author->{
//       name,
//       image,
//       slug
//     }
//   }
//   `
//   const allPosts = await sanityClient.fetch(query)
//   return allPosts
// }
