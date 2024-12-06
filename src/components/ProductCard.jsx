import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ title, price, description, rating, imageUrl, id }) => {
    const cartItem = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = () => {
        const item = { id, title, price, description, rating, imageUrl };
        dispatch(addToCart(item));
        toast.success('Add item in cart');
    };

    const deleteCart = () => {
        const item = { id, title, price, description, rating, imageUrl };
        dispatch(deleteFromCart(item));
        toast.error('Delete item in cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem));
    }, [cartItem]);

    return (
        <div className="w-full max-w-[280px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
            <Link to={`/ProductDetail/${id}`}>
                {/* Product Image */}
                {imageUrl && (
                    <div className="h-[200px] overflow-hidden rounded-t-lg mb-4">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Product Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{title}</h3>

                {/* Product Price */}
                <div className="text-xl font-bold text-green-600 mb-2">₹{price}</div>

                {/* Product Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {description.length > 60 ? description.slice(0, 60) + '...' : description}
                </p>

                {/* Product Rating */}
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500 mr-2">&#9733;</span>
                    <span className="text-gray-700">{rating}</span>
                    <span className="text-gray-500 ml-1">/ 5</span>
                </div>
            </Link>
            {/* Add to Cart Button */}
            {cartItem.some((item) => item.id === id) ?
                <button onClick={deleteCart} className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-md">
                    Delete from Cart
                </button>

                : <button onClick={addCart} className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-md">
                    Add to Cart
                </button>
            }
        </div>
    );
};

export default ProductCard;
