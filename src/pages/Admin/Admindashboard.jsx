import React, { useContext } from 'react'
import { MoreHorizontal, ShoppingCart, Package, Users } from 'lucide-react'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import TotalProductTable from '../../components/Admin/TotalProductTable';
import OrderDetail from '../../components/Admin/OrderDetail';
import TotalUser from '../../components/Admin/TotalUser';
import { Mycontext } from '../../context/Mycontext';
const Admindashboard = () => {
    const { getProduct, getAllOrder, getAllUsers } = useContext(Mycontext)
    const orderLength = getAllOrder.reduce((total, order) => {
        // Accumulate the length of each cartItems array in the order
        return total + order.cartItems.length;
    }, 0); // Initial value is 0

    console.log(orderLength); // Logs the total length of all cartItems


    const adminData = {
        name: "Rohit",
        email: "admin@example.com"
    };
    return (
        <>
            <div className="mx-auto w-[95%] md:w-[80%] py-10">
                {/* Admin Info Section */}
                <div className="bg-zinc-800 text-white p-6 rounded-lg mb-8">
                    <h1 className="text-3xl font-semibold mb-2">Admin Dashboard</h1>
                    <div className="space-y-2">
                        <p className="text-lg">Welcome, <strong>{adminData.name}</strong></p>
                        <p className="text-sm text-muted-foreground">{adminData.email}</p>
                    </div>
                </div>

                {/* Cards Section */}
                <Tabs>
                    <TabList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Total Orders Card */}
                        <Tab className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="text-sm font-medium">Total Orders</h3>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-semibold text-zinc-700">{orderLength}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </Tab>

                        {/* Total Products Card */}
                        <Tab className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="text-sm font-medium">Total Products</h3>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-semibold text-zinc-700">{getProduct.length}</div>
                            <p className="text-xs text-muted-foreground">+180 new products added this month</p>
                        </Tab>

                        {/* Total Users Card */}
                        <Tab className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <h3 className="text-sm font-medium">Total Users</h3>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-semibold text-zinc-700">{getAllUsers.length}</div>
                            <p className="text-xs text-muted-foreground">+12.3% new users this month</p>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <OrderDetail />
                    </TabPanel>

                    <TabPanel>
                        <TotalProductTable />
                    </TabPanel>

                    <TabPanel>
                        <TotalUser />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default Admindashboard