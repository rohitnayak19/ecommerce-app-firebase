// components/ui/Input.js
import React from 'react';

export default function Input({ type = 'text', placeholder = '', className = '', ...props }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 ${className}`}
            {...props}
        />
    );
}
