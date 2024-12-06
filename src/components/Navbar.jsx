import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import {
    Home,
    ShoppingBag,
    User,
    UserPlus,
    LogOut,
    UserRoundCheck,
    CircleUserRound,
    ShoppingCart,
    Search,
    Menu,
    X
} from 'lucide-react';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { toast } from 'react-toastify';
import { Mycontext } from '../context/Mycontext';

export default function Navbar() {
    const { getProduct } = useContext(Mycontext);
    const [searchInput, setSearchInput] = useState('');
    const cart = useSelector((state) => state.cart);
    const productQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0); // Calculate total quantity
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('users'));

    const handleLogout = () => {
        localStorage.clear('users');
        navigate('/login');
        toast.warning('Logout Successfully');
    };

    // Filter products based on search input
    const filterSearch = getProduct.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <nav className="bg-white shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl text-zinc-800">Logo...</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium">
                                    <Home className="inline-block w-5 h-5 mr-1 -mt-1" />
                                    Home
                                </Link>
                                <Link to="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium">
                                    <ShoppingBag className="inline-block w-5 h-5 mr-1 -mt-1" />
                                    All Products
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <form className="mr-4">
                                <div className="relative">
                                    <Input
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        type="search"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 py-2 rounded-full"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    {/* Display filtered products based on search */}
                                    {searchInput && filterSearch.length > 0 && (
                                        <div className='absolute bg-white rounded-sm p-2 w-full'>
                                            {filterSearch.slice(0, 8).map((product, index) => (
                                                <Link to={`productdetail/${product.id}`} key={index} className='flex items-center justify-between cursor-pointer hover:bg-gray-100 mx-2'>
                                                    <img src={product.imageUrl} alt={product.title} className='w-12 m-1' />
                                                    <h2 className='text-zinc-800'>{product.title}</h2>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {/* Display message if no products are found */}
                                    {searchInput && filterSearch.length === 0 && (
                                        <div className='absolute bg-white rounded-sm p-2 w-full'>
                                            <p>No products found</p>
                                        </div>
                                    )}
                                </div>
                            </form>
                            {user && (
                                <>
                                    <Link to={user.role === 'admin' ? "/admindashboard" : "/userdashboard"} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium">
                                        {user.role === 'admin' ? <User className="inline-block w-5 h-5 mr-1 -mt-1" /> : <CircleUserRound className="inline-block w-5 h-5 mr-1 -mt-1" />}
                                        {user.name}
                                    </Link>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium">
                                        <LogOut className="inline-block w-5 h-5 mr-1 -mt-1" />
                                        Logout
                                    </button>
                                </>
                            )}
                            {!user && (
                                <>
                                    <Link to="/signup" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium">
                                        <UserPlus className="inline-block w-5 h-5 mr-1 -mt-1" />
                                        Sign Up
                                    </Link>
                                    <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-md font-medium">
                                        <UserRoundCheck className="inline-block w-5 h-5 mr-1 -mt-1" />
                                        Login
                                    </Link>
                                </>
                            )}
                            <Link to="/cart" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                <ShoppingCart className="inline-block w-5 h-5" />
                                <span>{`(${productQuantity})`}</span>
                                <span className="sr-only">Shopping cart</span>
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </Button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                        <Home className="inline-block w-5 h-5 mr-1" />
                        Home
                    </Link>
                    <Link to="/products" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                        <ShoppingBag className="inline-block w-5 h-5 mr-1" />
                        All Products
                    </Link>
                    <Link to="/cart" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                        <ShoppingCart className="inline-block w-5 h-5 mr-1" />
                        Cart
                        <span>{`(${productQuantity})`}</span>
                    </Link>
                </div>
            )}
        </nav>
    );
}
