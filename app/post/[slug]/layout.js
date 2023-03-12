import Link from 'next/link'
import './layout.css'

export default function layout({children}) {
  return (
    <div>
      {children}
      <div className="posts-footer">
        <Link href={'/post'} className="link-btn">
          다른 글 보기
        </Link>
      </div>
    </div>
  )
}
