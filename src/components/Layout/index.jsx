import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import MenuHeader from '../MenuHeader'

const Layout = (props) => {
  return (
    <>
        <Header />
        {props.subheader ? '' : <MenuHeader />}
        {props.children}
        <Footer />
    </>
  )
}

export default Layout