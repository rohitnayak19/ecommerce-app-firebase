import React, { useContext } from 'react';
import { Edit, Trash } from 'lucide-react'; // Assuming you're using lucide-react icons
import { Mycontext } from '../../context/Mycontext';

const OrderDetail = () => {
    const { getAllOrder, deleteOrder } = useContext(Mycontext);
    let serialNumber = 1; // Initialize the serial number

    return (
        <div className="mx-auto w-full pt-10 border mt-6 px-4 rounded-md overflow-auto">
            <h1 className="text-3xl font-semibold mb-6">Order Details</h1>

            {/* Order Details Table */}
            <table className="min-w-full table-auto">
                <thead className="text-zinc-800">
                    <tr>
                        <th className="py-3 px-4 text-left">Sr No.</th>
                        <th className="py-3 px-4 text-left">Product Title</th>
                        <th className="py-3 px-4 text-left">Customer Name</th>
                        <th className="py-3 px-4 text-left">Phone No.</th>
                        <th className="py-3 px-4 text-left">Order Date</th>
                        <th className="py-3 px-4 text-left">Total Amount</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {getAllOrder.map((order) => (
                        // Loop through each cartItem and render a separate row for each
                        order.cartItems.map((item) => (
                            <tr key={`${order.id}-${item.id}`} className="hover:bg-zinc-100 border-b">
                                {/* Display the serial number */}
                                <td className="py-3 px-4">{serialNumber++}</td>
                                <td className="py-3 px-4">{item.title || 'No Title'}</td>
                                <td className="py-3 px-4">{order.addressInfo?.name || 'N/A'}</td>
                                <td className="py-3 px-4">{order.addressInfo?.mobileNumber || 'N/A'}</td>
                                <td className="py-3 px-4">{item.date || 'N/A'}</td>
                                <td className="py-3 px-4">₹{item.price || 'N/A'}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`text-sm ${order.status === 'confirmed' ? 'text-green-600' : 'text-orange-600'}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash onClick={() => deleteOrder(order.id, item.id)} className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;
