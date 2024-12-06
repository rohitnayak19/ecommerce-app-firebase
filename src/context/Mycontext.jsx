import { createContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, updateDoc, getDoc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { fireDB } from "../firebase/FirebasConfig";
import { toast } from "react-toastify";
export const Mycontext = createContext();

export const ContextProvider = ({ children }) => {

    const [getProduct, setProduct] = useState([])
    const [getAllOrder, setAllOrder] = useState([])
    const [getAllUsers, setAllUsers] = useState([])

    //get all product funtion
    const getAllProductFunc = async () => {
        try {

            const q = query(
                collection(fireDB, 'product'), orderBy('time')
            )

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                });

                setProduct(productArray)
            })

            return () => data;
        } catch (error) {
            console.log(error)
        }
    }

    //get all order function
    const getAllOrderFunc = async () => {
        try {
            const q = query(
                collection(fireDB, 'order'), orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });

                setAllOrder(orderArray)
            });

            return () => data;
        } catch (error) {
            console.log(error)
        }
    }

    //Order delete function with orderId and ItemId
    const deleteOrder = async (orderId, itemId) => {
        try {
            const orderRef = doc(fireDB, 'order', orderId)
            const orderDoc = await getDoc(orderRef)

            if (orderDoc.exists()) {
                const orderData = orderDoc.data()

                const updatedCartItem = orderData.cartItems.filter((item) => item.id !== itemId);

                if (updatedCartItem.length === 0) {
                    await deleteDoc(orderRef)
                    toast.success("Order deleted successfully");
                } else {
                    const updatedOrderData = {
                        cartItems: updatedCartItem,
                    };

                    // Remove addressInfo if cartItems is empty
                    if (updatedCartItem.length === 0) {
                        delete updatedOrderData.addressInfo;
                    }

                    await updateDoc(orderRef, updatedOrderData);
                    toast.success("Item deleted successfully");
                }
                getAllOrderFunc();
            } else {
                toast.error("Order not found");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item");
        }
    }

    // get All user information function

    const getAllUsersFunc = async () => {
        try {
            const q = query(collection(fireDB, 'user'), orderBy('time'));  // Ensure 'time' field exists and is indexed.

            const data = onSnapshot(q, (querySnapshot) => {  // Corrected the parameter to 'querySnapshot'
                let userArray = [];
                querySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });

                setAllUsers(userArray);  // Set users in state
            });

            return () => data;  // Cleanup the listener
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllUsersFunc()
        getAllProductFunc()
        getAllOrderFunc()
    }, [])
    return (
        <>
            <Mycontext.Provider value={{ getProduct, getAllProductFunc, getAllOrder, deleteOrder, getAllUsers }}>
                {children}
            </Mycontext.Provider>
        </>
    )
}
