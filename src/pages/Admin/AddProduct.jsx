import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Shirt, Footprints, Smartphone, Laptop, Home, BookOpenText } from 'lucide-react';
import { toast } from 'react-toastify';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebasConfig';

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
        rating: 4.4,
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            { month: 'short', day: '2-digit', year: 'numeric' }
        )
    });


    const navigate = useNavigate();

    const categories = [
        { id: 1, name: 'Clothes', icon: <Shirt /> },
        { id: 2, name: 'Shoes', icon: <Footprints /> },
        { id: 3, name: 'Mobile', icon: <Smartphone /> },
        { id: 4, name: 'Laptop', icon: <Laptop /> },
        { id: 5, name: 'Home', icon: <Home /> },
        { id: 6, name: 'Books', icon: <BookOpenText /> }
    ];

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.title || !product.price || !product.imageUrl || !product.category || !product.description) {
            toast.error('All field are required')
            return
        }
        setLoading(true);
        // Perform your product addition logic here, such as saving to the database
        // console.log('Product added:', product);

        // Simulating form submission delay
        setTimeout(async () => {
            const ProductRef = collection(fireDB, 'product');
            await addDoc(ProductRef, product)
            toast.success('Product Added')
            setLoading(false);
            navigate('/admindashboard');  // Navigate to product list or dashboard after submission
        }, 1000);
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Product Title"
                                value={product.title}
                                onChange={handleInputChange}
                                className="w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                placeholder="Product Price"
                                value={product.price}
                                onChange={handleInputChange}
                                className="w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                type="text"
                                placeholder="Enter Image URL"
                                value={product.imageUrl}
                                onChange={handleInputChange}
                                className="w-full rounded-xl"
                            />
                        </div>
                        <div>
                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 p-2"
                            >
                                <option disabled value="">Select Product Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Product Description"
                                value={product.description}
                                onChange={handleInputChange}
                                className="w-full rounded-xl border-gray-300 p-2"
                            />
                        </div>
                        <Button
                            type="submit"
                            className={`w-full mt-4 bg-zinc-600 text-white font-semibold py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </Button>
                        <p className="text-center text-gray-600 mt-4">
                            {/* <Link className="text-blue-500 hover:underline" to={'/product-list'}>
                                Go to Product List
                            </Link> */}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
