import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-zinc-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">About Us</h2>
                        <p className="text-sm text-gray-400">
                            Discover our story and values. We are dedicated to providing high-quality products and excellent customer service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Quick Links</h2>
                        <ul className="text-sm text-gray-400 space-y-2">
                            <li><a href="#home" className="hover:text-white">Home</a></li>
                            <li><a href="#shop" className="hover:text-white">Shop</a></li>
                            <li><a href="#about" className="hover:text-white">About Us</a></li>
                            <li><a href="#contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Contact Us</h2>
                        <p className="text-sm text-gray-400">
                            Email: rohit77.rn@gmail.com<br />
                            Phone: 7999548643
                        </p>
                        <div className="flex space-x-4">
                            <a href="#facebook" className="hover:text-blue-500"><Facebook /></a>
                            <a href="#twitter" className="hover:text-blue-400"><Twitter /></a>
                            <a href="#instagram" className="hover:text-pink-500"><Instagram /></a>
                            <a href="#email" className="hover:text-green-500"><Mail /></a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-700" />

                {/* Copyright */}
                <p className="text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Your Store Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
