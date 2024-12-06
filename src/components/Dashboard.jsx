import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mycontext } from '../context/Mycontext';

const Dashboard = () => {
    const { getAllOrder } = useContext(Mycontext);
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
        localStorage.clear();
        toast.warning('Logout Successful');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold mb-4">Order History</h1>
            <h2 clas>Account Name : {user.name} </h2>
            <h2 className='mb-2'>email: {user.email}</h2>
            {getAllOrder
                .filter((order) => order.userId === user?.uid)
                .map((order, orderIndex) => {
                    // Find the name from the order's addressInfo (assuming addressInfo exists)
                    const userName = order.addressInfo?.name || 'N/A';
                    return (
                        <div
                            key={orderIndex}
                            className="bg-white p-4 rounded-lg shadow-md mb-6"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold mb-2">
                                    Order ID: {order.orderId || 'N/A'}
                                </h2>
                                <h2 className="text-lg font-bold mb-2">
                                    Name: {userName}
                                </h2>
                            </div>
                            <p
                                className={`text-sm mb-4 ${order.status === 'confirmed'
                                    ? 'text-green-600'
                                    : order.status === 'Pending'
                                        ? 'text-orange-600'
                                        : 'text-gray-600'
                                    }`}
                            >
                                Status: {order.status || 'Pending'}
                            </p>

                            <div className="space-y-4">
                                {order.cartItems.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex items-center space-x-4 border-b pb-4"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-16 h-16 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-800">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Category: {item.category}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Date: {order.date}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Price: ₹{item.price}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
