import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebasConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [userLogin, setUserLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleUserLogin = async (e) => {
        e.preventDefault();

        if (!userLogin.email || !userLogin.password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            // Query the database for the user document with the same UID
            const q = query(
                collection(fireDB, 'user'),
                where('uid', '==', users.user.uid)
            );

            const querySnapshot = await getDocs(q);
            let user = null;
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });

            if (user) {
                localStorage.setItem('users', JSON.stringify(user));
                toast.success("Login Successful");

                setUserLogin({ email: '', password: '' });

                // Navigate based on role
                if (user.role === "user") {
                    navigate('/userdashboard');
                } else if (user.role === "admin") {
                    navigate('/admindashboard');
                } else {
                    toast.error("Unknown user role");
                }
            } else {
                toast.error("User data not found");
            }
        } catch (error) {
            toast.error("Login Unsuccessful. Please check your credentials and try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-2">Log In</h1>
                <p className="text-gray-600 mb-4">Access your account</p>
                <form onSubmit={handleUserLogin} className="space-y-4">
                    <div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={userLogin.email}
                            onChange={(e) => setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            })}
                            className='w-full rounded-md'
                        />
                    </div>
                    <div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={userLogin.password}
                            onChange={(e) => setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            })}
                            className='w-full rounded-md'
                        />
                    </div>
                    <Button
                        type="submit"
                        className={`w-full mt-4 bg-zinc-700 text-white font-semibold py-2 rounded-md hover:bg-zinc-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account? <Link className="text-blue-500 hover:underline" to={'/signup'}>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
