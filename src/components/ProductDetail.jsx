import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebasConfig';
import Loader from './Loader';
import { addToCart, deleteFromCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
const ProductDetail = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart)
    const { id } = useParams();
    const [product, setProduct] = useState(null); // Initial state set to null
    const [loading, setLoading] = useState(true);

    const addCart = (item) => {
        dispatch(addToCart(item))
        toast.success('Add item in cart')
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item))
        toast.error('Item deleted')
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const getProductInfo = async () => {
        try {
            const productDoc = await getDoc(doc(fireDB, 'product', id));
            if (productDoc.exists()) {
                setProduct({ ...productDoc.data(), id: productDoc.id });
            } else {
                console.error("Product not found!");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductInfo();
    }, [id]);

    if (loading) {
        return <Loader />
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl">
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image Section */}
                <div className="relative">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-96 object-cover transition ease-in-out duration-150 hover:scale-105 cursor-pointer"
                    />
                    <span className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-md shadow-md">
                        ⭐ {product.rating || 'No Rating'}
                    </span>
                </div>
                {/* Details Section */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                    <p className="text-green-500  text-xl mb-6">
                        <span className="font-semibold">₹{product.price}</span>
                    </p>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Description:</span> {product.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                        {cartItems.some((item) => item.id === product.id) ?
                            <button onClick={() => deleteCart(product)} className="bg-rose-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-rose-700 transition duration-200">
                                Delete from cart
                            </button>
                            : <button onClick={() => addCart(product)} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
                                Add to Cart
                            </button>}
                        <Link to={'/cart'}>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-200">
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
