//post page using SWRInfinite

'use client'
import PostPreview from '@/components/post-preview'
import './page.css'
import useSWRInfinite from 'swr/infinite'
import Spinner from '@/components/spinner'

const PAGE_SIZE = 6

const getKey = (index, prev) => {
  console.log('get key:', index, prev)
  if (prev && prev.length < PAGE_SIZE) return null

  if (prev)
    return `/api/post?page=${index + 1}&lastPublishedAt=${
      prev[prev.length - 1].publishedAt
    }&lastId=${prev[prev.length - 1]._id}`

  return `/api/post?page=${index + 1}`
}

const fetchNextPage = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export default function PostsPage() {
  const {data, error, isLoading, isValidating, mutate, size, setSize} =
    useSWRInfinite(getKey, fetchNextPage)

  if (error) return <div>failed to load</div>
  if (isLoading) return <Spinner />

  const isReachingEnd = data && data[data.length - 1].length < PAGE_SIZE

  return (
    <>
      {data.map((posts) => {
        return posts.map((post) => <PostPreview post={post} key={post.title} />)
      })}
      {isValidating && <Spinner />}
      <div className="load-more">
        {isReachingEnd ? (
          'NO MORE CONTENT'
        ) : (
          <button className="btn" onClick={() => setSize(size + 1)}>
            Load {size + 1} Page
          </button>
        )}
      </div>
    </>
  )
}
