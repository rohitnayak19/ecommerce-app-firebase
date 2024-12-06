import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, Trash } from 'lucide-react';
import { deleteFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Buynow from './Buynow';
import { Navigate } from 'react-router-dom';
import { fireDB } from '../firebase/FirebasConfig';
const Cart = () => {
    const cartItems = useSelector((state) => state.cart); // Access the cart state
    const dispatch = useDispatch();

    const handleRemove = (item) => {
        dispatch(deleteFromCart(item)); // Dispatch action to remove item
        toast.warning('Item removed from cart');
    };

    const handleIncreament = (item) => {
        dispatch(incrementQuantity(item))
        toast.success("Item Increament")
    }


    const handleDecreament = (item) => {
        dispatch(decrementQuantity(item))
        toast.success("Item Decreament")
    }


    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };


    //user info
    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: '',
        address: '',
        pincode: '',
        mobileNumber: '',
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })

    });



    const buyNow = () => {
        if (!addressInfo.name || !addressInfo.address || !addressInfo.pincode || !addressInfo.mobileNumber) {
            toast.error("All fields are required")
            return
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userId: user.uid,
            status: 'confirmed',
            time: Timestamp.now(),
            date: new Date().toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            })
        }

        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo)
            setAddressInfo({
                name: '',
                address: '',
                pincode: '',
                mobileNumber: ''
            })
            toast.success("Order placed successfully")
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="container w-[100%] md:w-[85%] mx-auto py-8 px-4">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-4 border px-2 rounded"
                        >
                            <div className="flex items-center">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-20 h-20 object-contain rounded-md mr-4 pt-1"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500">₹{item.price}</p>
                                    <p className="text-gray-500">⭐{item.rating}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => handleDecreament(item)}
                                        className="border px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        <Minus className="w-3 h-4" />
                                    </button>
                                    <span className='font-mono'>{item.quantity}</span>

                                    <button onClick={() => handleIncreament(item)}
                                        className="border px-2 py-1 rounded hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemove(item)}
                                    className="text-red-500 hover:text-red-600 transition duration-200"
                                >
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Total: ₹{calculateTotal()}</h2>
                    {user ? <Buynow
                        addressInfo={addressInfo}
                        setAddressInfo={setAddressInfo}
                        BuyNowFunc={buyNow}
                    />
                        : <Navigate to={'/login'} />}
                </div>
            )}
        </div>
    );
};

export default Cart;
