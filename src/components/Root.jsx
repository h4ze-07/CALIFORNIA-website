import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'

const Root = ({cartCounter, searchProductsByName}) => {
    return (
        <>
            <Header
            searchProductsByName={searchProductsByName}
             cartCounter={cartCounter}/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Root