'use client'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import './layout.css'
import {Hahmlet} from 'next/font/google'
import {useEffect, useRef, useState} from 'react'

const name = 'qaws7791'
export const siteTitle = 'Next.js Sample Website using App Router'

export const hahmlet = Hahmlet({
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
})

export default function RootLayout({children}) {
  const [isOpen, setOpen] = useState(false)
  const navBar = useRef(null)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <html lang="en" className={hahmlet.className}>
      <head title="Blog"></head>
      <body className={isOpen && 'of-h'}>
        <header className="header">
          <div className="header-container">
            <h1 className="header__title">
              <a href="/">{name}</a>
            </h1>

            <div>
              <ul className="header__menu">
                <li>
                  <Link href={'/post'}>Post</Link>
                </li>
                <li>
                  <Link href={'/author'}>Author</Link>
                </li>
                <li>
                  <Link href={'/category'}>Category</Link>
                </li>
                <li>
                  <Link href={'/search'}>Search</Link>
                </li>
              </ul>
              <ul className="header__btns">
                <li className="header-open-btn" onClick={handleOpen}>
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{fill: 'rgba(0, 0, 0, 1)'}}
                  >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className={isOpen ? 'nav-bar open' : 'nav-bar'} ref={navBar}>
          <div className="nav-inner">
            <nav className="nav-menu">
              <h2>메뉴</h2>
              <ul>
                <li>
                  <Link href={'/post'}>Post</Link>
                </li>
                <li>
                  <Link href={'/author'}>Author</Link>
                </li>
                <li>
                  <Link href={'/category'}>Category</Link>
                </li>
                <li>
                  <Link href={'/search'}>Search</Link>
                </li>
              </ul>
            </nav>
            <a href="#" class="nav-close-btn" onClick={handleClose}>
              닫기
            </a>
          </div>
        </div>
        <main className="main">
          <section className="main-container">{children}</section>
        </main>
        <footer className="footer">©2023 qaws7791. this is footer</footer>
      </body>
    </html>
  )
}
