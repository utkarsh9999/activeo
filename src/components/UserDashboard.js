import React, { use, useEffect, useState } from "react";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const {user}=useAuth();

    const [form, setForm] = useState({ email: '', password: '' });
    useEffect(()=>{
        function dis(){
            setForm({
                email:localStorage.getItem('user_email'),
                password:localStorage.getItem('user_password')
            })
        }
        dis();
    },[user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <ProfileNavbar onLogout={handleLogout} />
            <div className="mt-8 flex justify-center" style={{ marginTop: '150px', marginLeft: '10px', marginRight: '10px' }}>
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 dark:bg-gray-900">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">User Dashboard</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} maxLength={30} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} maxLength={13} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">  Save</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;