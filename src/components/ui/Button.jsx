// components/ui/Button.js
import React from 'react';
export default function Button({ children, onClick, className = '', ...props }) {
    return (
        <button
            onClick={onClick}
            className={`bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
