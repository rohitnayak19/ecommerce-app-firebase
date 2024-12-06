import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Shirt, Footprints, Smartphone, Laptop, Home, BookOpenText } from 'lucide-react';
import { toast } from 'react-toastify';
import { Mycontext } from '../../context/Mycontext';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebasConfig';

const UpdateProduct = () => {
    const { getAllProductFunc } = useContext(Mycontext);
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
    const { id } = useParams();
    const navigate = useNavigate();

    const categories = [
        { id: 1, name: 'Clothes', icon: <Shirt /> },
        { id: 2, name: 'Shoes', icon: <Footprints /> },
        { id: 3, name: 'Mobile', icon: <Smartphone /> },
        { id: 4, name: 'Laptop', icon: <Laptop /> },
        { id: 5, name: 'Home', icon: <Home /> },
        { id: 6, name: 'Books', icon: <BookOpenText /> }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const getSingleProductFromData = async () => {
        try {
            const productDoc = await getDoc(doc(fireDB, 'product', id));
            const productData = productDoc.data();

            setProduct({
                title: productData?.title,
                price: productData?.price,
                imageUrl: productData?.imageUrl,
                category: productData?.category,
                description: productData?.description,
                quantity: 1,
                time: productData?.time,
                date: productData?.date
            });
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateDoc(doc(fireDB, 'product', id), {
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                category: product.category,
                description: product.description,
                quantity: product.quantity,
                time: product.time,
                date: product.date
            });
            getAllProductFunc();
            toast.success("Product updated successfully");
            navigate('/admindashboard');
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error('Product not updated');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFromData();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-2">Update Product</h1>
                <form onSubmit={updateProduct} className="space-y-4">
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
                            className="w-full rounded-xl border-gray-300 p-2 border"
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
                            className="w-full rounded-xl border-gray-300 p-2 border"
                        />
                    </div>
                    <Button
                        type="submit"
                        className={`w-full mt-4 bg-zinc-600 text-white font-semibold py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating Product...' : 'Update Product'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
