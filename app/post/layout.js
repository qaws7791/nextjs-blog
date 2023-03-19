import React, {Suspense} from 'react'
import Loading from './loading'

const Layout = ({children}) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  )
}

export default Layout
