import {sanityClient} from '@/lib/sanity.server'
import Image from 'next/image'
import {urlForImage} from '@/lib/sanity'
import Link from 'next/link'

export default async function AuthorsPage() {
  const authors = await getStaticData()

  return (
    <ul>
      {authors.map((author) => (
        <li key={author.name}>
          <p>{author.name}</p>
          <Link href={`/authors/${author.slug.current}`} passHref>
            <Image
              src={urlForImage(author.image).height(1000).width(2000).url()}
              alt={author.name}
              title={author.name}
              width={1000}
              height={1000}
              style={{height: '100%', width: '100%'}}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticData() {
  const authors = await sanityClient.fetch(`*[_type=="author"]`)
  console.log(authors)
  return authors
}
