import React, { useContext } from 'react';
import { Edit, Trash } from 'lucide-react';
import { Mycontext } from '../../context/Mycontext';

const userData = [
    { id: 'USR001', name: 'John Doe', email: 'john.doe@example.com', joinDate: '2024-11-01' },
    { id: 'USR002', name: 'Jane Smith', email: 'jane.smith@example.com', joinDate: '2024-10-21' },
    { id: 'USR003', name: 'Alice Johnson', email: 'alice.johnson@example.com', joinDate: '2024-09-15' },
    // Add more users as needed
];

const TotalUser = () => {

    const { getAllUsers } = useContext(Mycontext)
    console.log(getAllUsers);

    return (
        <div className="mx-auto py-10">
            <h1 className="text-3xl font-semibold mb-6">Total Users</h1>

            <div className="overflow-auto">
                <table className="w-full text-zinc-700 rounded-lg">
                    <thead className="">
                        <tr>
                            <th className="py-3 px-4 text-left">Sr No</th>
                            <th className="py-3 px-4 text-left">User ID</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Join Date</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUsers.map((user, index) => (
                            <tr key={user.id} className="border-b">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{user.id}</td>
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.date}</td>
                                <td className="py-3 px-4 flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
                                        <Edit className="w-4 h-4" />
                                        {/* <span>Edit</span> */}
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 flex items-center space-x-1">
                                        <Trash className="w-4 h-4" />
                                        {/* <span>Remove</span> */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalUser;
