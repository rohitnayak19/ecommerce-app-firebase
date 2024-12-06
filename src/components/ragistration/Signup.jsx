import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { auth, fireDB } from '../../firebase/FirebasConfig';
import { toast } from 'react-toastify';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
    const [userSignup, setUserSignup] = useState({
        name: '',
        email: '',
        password: '',
        confirPassword: '',
        role: 'user'
    });
    const [loading, setLoading] = useState(false); // loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userSignup.name || !userSignup.email || !userSignup.password || !userSignup.confirPassword) {
            toast.error("All fields are required");
            return;
        }

        if (userSignup.password !== userSignup.confirPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true); // start loading

        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: userSignup.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userReference = collection(fireDB, "user");
            await addDoc(userReference, user);

            setUserSignup({
                name: '',
                email: '',
                password: '',
                confirPassword: '',
                role: 'user'
            });

            toast.success("Signup Successfully");
            navigate('/login');

        } catch (error) {
            console.log(error);
            toast.error("Signup failed. Please try again...");
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
                <p className="text-gray-600 mb-4">Create your account to get started</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={userSignup.name}
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })}
                            className='w-full rounded-xl'
                        />
                    </div>
                    <div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={userSignup.email}
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })}
                            className='w-full rounded-xl'
                        />
                    </div>
                    <div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={userSignup.password}
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })}
                            className='w-full rounded-xl'
                        />
                    </div>
                    <div>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={userSignup.confirPassword}
                            onChange={(e) => setUserSignup({
                                ...userSignup,
                                confirPassword: e.target.value
                            })}
                            className='w-full rounded-xl'
                        />
                    </div>
                    <Button
                        type="submit"
                        className={`w-full mt-4 bg-zinc-600 text-white font-semibold py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>

                    <p>Already have an account? <Link className="text-blue-400" to={'/login'}>Login</Link></p>
                </form>
            </div>
        </div>
    );
}
