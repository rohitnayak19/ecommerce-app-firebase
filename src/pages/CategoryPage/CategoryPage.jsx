import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mycontext } from '../../context/Mycontext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const CategoryPage = () => {
    const cartItems = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const { categoryname } = useParams();
    const { getProduct } = useContext(Mycontext);

    // Filter products by category
    const filterCategoryProduct = getProduct.filter((item) => item.category.includes(categoryname));

    const addCart = (item) => {
        dispatch(addToCart(item))
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item))
        toast.error("item deleted")
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-center text-3xl font-bold text-gray-800 mt-6">
                {categoryname}
            </h2>

            {filterCategoryProduct.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {filterCategoryProduct.map((product) => (

                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                            <Link to={`/ProductDetail/${product.id}`} key={product.id}>
                                {/* Product Image */}
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />

                                {/* Product Title */}
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {product.title}
                                </h3>

                                {/* Product Price */}
                                <div className="text-xl font-bold text-green-600 mb-2">
                                    ₹{product.price}
                                </div>

                                {/* Product Description */}
                                <p className="text-gray-700 text-sm mb-4">
                                    {product.description.length > 60
                                        ? product.description.slice(0, 60) + '...'
                                        : product.description}
                                </p>

                                {/* Product Rating */}
                                <div className="flex items-center mb-4">
                                    <span className="text-yellow-500 mr-2">&#9733;</span>
                                    <span className="text-gray-700">{product.rating || 'No Rating'}</span>
                                    <span className="text-gray-500 ml-1">/ 5</span>
                                </div>
                            </Link>
                            {/* Add to Cart Button */}
                            {cartItems.some((item) => item.id === product.id) ? < button onClick={() => deleteCart(product)} className="w-full py-2 bg-rose-700 hover:bg-rose-600 text-white font-semibold rounded-md">
                                Delete from cart
                            </button> : < button onClick={() => addCart(product)} className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-md">
                                Add to Cart
                            </button>}
                        </div>
                    ))
                    }
                </div >
            ) : (
                <div className="text-center mt-20 text-gray-600 text-lg">
                    No products found in this category.
                </div>
            )}
        </div >
    );
};

export default CategoryPage;
