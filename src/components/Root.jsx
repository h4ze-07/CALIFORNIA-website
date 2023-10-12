import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Root = ({cartCounter}) => {
  return (
    <>
      <Header cartCounter={cartCounter} />
      <Outlet />
      <Footer />
    </>
  )
}

export default Root