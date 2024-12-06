import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Mycontext } from '../context/Mycontext';
import Loader from './Loader';
const Products = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const { getProduct } = useContext(Mycontext)


    useEffect(() => {
        if (getProduct.length > 0) {
            setProduct(getProduct)
            setLoading(false)
            return
        }
    }, [getProduct]);
    return (
        <>

            {loading ? (<Loader />) :
                (
                    product.length > 0 ? (
                        <div className='flex flex-wrap items-center justify-center gap-3'>
                            {product.map((product) => (
                                <ProductCard key={product.id} title={product.title} price={product.price} description={product.description} rating={product.rating} imageUrl={product.imageUrl} id={product.id} />
                            ))}
                        </div>
                    ) : (
                        <p className='text-center font-semibold text-2xl mt-10'>No Product found</p>
                    )
                )}
        </>
    )
}

export default Products