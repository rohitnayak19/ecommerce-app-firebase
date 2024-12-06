import React from 'react'
import { Shirt, Footprints, Smartphone, Laptop, Home, BookOpenText, icons } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate()
    const categories = [
        {
            id: 1,
            name: 'Clothes',
            icon: <Shirt />,
        },
        {
            id: 2,
            name: 'Shoes',
            icon: <Footprints />,
        },
        {
            id: 3,
            name: 'Mobile',
            icon: <Smartphone />,
        },
        {
            id: 4,
            name: 'Laptop',
            icon: <Laptop />,
        },
        {
            id: 5,
            name: 'Home',
            icon: <Home />,
        },
        {
            id: 6,
            name: 'Books',
            icon: <BookOpenText />
        }
    ];

    return (
        <>
            <div className='mt-5 flex justify-between gap-3 md:gap-1 flex-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {categories.map(item => (
                    <div
                        onClick={() => navigate(`/category/${item.name}`)}
                        key={item.id}
                        className='flex flex-col items-center justify-center transition duration-150 transform hover:scale-105 hover:bg-gray-200 cursor-pointer h-24 w-24 bg-gray-100 p-3 rounded-full shadow-sm'
                    >
                        <span className='text-3xl text-gray-700 mb-2'>{item.icon}</span>
                        <span className='text-sm font-semibold text-gray-800'>{item.name}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Category