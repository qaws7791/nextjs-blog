import {sanityClient} from '@/lib/sanity.server'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'
import Link from 'next/link'
import './page.css'
import {authorListQuery} from '@/lib/queries'
import AuthorPreview from '@/components/author-preview'

export default async function AuthorsPage() {
  const authors = await getStaticData()

  return (
    <ul className="author-list">
      {authors.map((author) => (
        <AuthorPreview author={author} key={author.name} />
      ))}
    </ul>
  )
}

export async function getStaticData() {
  const authors = await sanityClient.fetch(authorListQuery)
  return authors
}
