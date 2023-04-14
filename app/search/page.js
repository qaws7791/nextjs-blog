'use client'
import {useEffect, useState} from 'react'
import PostPreview from '@/components/post-preview'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import './page.css'
import {hahmlet} from '../layout'

export default function SearchPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState([])
  const [lastPublishedAt, setLastPublishedAt] = useState('')
  const [lastId, setLastId] = useState('')
  const [isFetching, setFetching] = useState(false)
  const [hasNextPage, setNextPage] = useState(true)

  const [searchText, setSearchText] = useState('')

  function getQuery() {
    return searchParams.get('searchText') || ''
  }

  async function fetchNextPage() {
    console.log('start fetch')
    const query = searchParams.get('searchText')
    if (!query) {
      setFetching(false)
      return
    }

    try {
      const response = await fetch(
        '/api/search?' +
          new URLSearchParams({
            searchText: query,
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
      console.log(result)
      setPosts(posts.concat(result))

      if (result.length >= 5) {
        setLastPublishedAt(result[result.length - 1].publishedAt)
        setLastId(result[result.length - 1]._id)
      } else {
        setLastId(null) // Reached the end
        setNextPage(false)
      }
    } catch (e) {
      console.log('ERROR', e)
      setFetching(false)
    }
    setFetching(false)
  }

  useEffect(() => {
    console.log(isFetching, hasNextPage, searchText)
    if (isFetching && hasNextPage) fetchNextPage()
  }, [isFetching])

  function enterkey(e) {
    if (e.keyCode == 13) {
      router.push(
        '/search?' +
          new URLSearchParams({
            searchText: searchText,
          })
      )
    }
  }

  useEffect(() => {
    console.log('changed path!')
    setPosts([])
    setLastPublishedAt('')
    setLastId('')
    setNextPage(true)
    setSearchText(() => getQuery())
    setFetching(true)
  }, [pathname, searchParams])

  return (
    <>
      <div class="container">
        <label class="input-label" for="search">
          검색어를 입력하세요.
        </label>
        <input
          className={`search-input ${hahmlet.className}`}
          type="text"
          id="search"
          name="search"
          value={searchText}
          onInput={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => enterkey(e)}
        />
      </div>
      {posts.map((post) => (
        <PostPreview post={post} key={post.title} />
      ))}
      <div className="load-more">
        {hasNextPage && getQuery() && (
          <button
            className="btn"
            onClick={() => {
              setFetching(true)
            }}
          >
            LOAD MORE
          </button>
        )}
      </div>
    </>
  )
}
