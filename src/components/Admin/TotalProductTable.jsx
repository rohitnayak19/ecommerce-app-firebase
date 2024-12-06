import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash } from 'lucide-react';
import { Mycontext } from '../../context/Mycontext';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebasConfig';
import { toast } from 'react-toastify';
const TotalProductTable = () => {
    const { getProduct, getAllProductFunc } = useContext(Mycontext)

    const handleRemove = async (id) => {
        try {
            await deleteDoc(doc(fireDB, 'product', id));
            toast.success('Product deleted succesfully')
            getAllProductFunc()
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong')
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm mt-6 overflow-auto">
            <div className='flex justify-between'>
                <h3 className="text-xl font-semibold mb-4">Total Products</h3>
                <Link to="/addproduct">
                    <button className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 font-semibold'>Add Product</button>
                </Link>
            </div>
            {
                getProduct.length > 0 ? (<>
                    <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Sr No</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Product Name</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Image</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Category</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                                <th className="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getProduct.map((product, index) => (
                                <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                                    <td className="py-3 px-4 text-gray-600">{product.title}</td>
                                    <td className="py-3 px-4">
                                        <div className="w-20 h-20 overflow-hidden rounded-md">
                                            <img src={product.imageUrl} alt={product.title} className="object-cover w-full h-full" />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{product.category}</td>
                                    <td className="py-3 px-4 text-gray-600">{product.price}</td>
                                    <td className="py-3 px-4 text-gray-600">{product.date}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-baseline gap-1">
                                            <Link to={`/updateproduct/${product.id}`}>
                                                <button className="text-blue-500 hover:text-blue-600 transition duration-200">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleRemove(product.id)}
                                                className="text-red-500 hover:text-red-600 transition duration-200"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>)
                    : (<><p className='text-center text-xl font-medium'>No Product found in Admin pannel</p></>)
            }
        </div>
    );
};

export default TotalProductTable;
