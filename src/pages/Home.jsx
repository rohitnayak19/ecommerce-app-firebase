import React, { useContext } from 'react'
import HeroSection from '../components/Herosection'
import Category from '../components/Category'
import Products from '../components/Products'
import { Mycontext } from '../context/Mycontext'
const Home = () => {
    return (
        <>
            <HeroSection />
            <Category />
            <Products />
        </>
    )
}

export default Home