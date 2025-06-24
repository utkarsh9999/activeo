import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [alert, setAlert] = useState({ type: '', message: '' });
    const navigate=useNavigate();
    const { login } = useAuth();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(form);
        const { data, error } = await supabase.storage.from('accounts').download('account_ids.json');
        if (error) {
            setAlert({ type: 'error', message: 'Failed to fetch user data' });
            return;
        }

        // Parse the JSON
        const text = await data.text();
        let users;
        try {
            users = JSON.parse(text);
        } catch (e) {
            setAlert({ type: 'error', message: 'Failed to parse user data' });
            return;
        }

        // Validate email and password
        const found = users.find(
            (user) => user.email === form.email && user.password === form.password
        );

        if (found) {
            setAlert({ type: 'success', message: 'Login successful!' });
            login(found);
            setTimeout(() => {
              setAlert({ type: '', message: '' });
              navigate('/user-dashboard');
            }, 1000);
        } else {
            setAlert({ type: 'error', message: 'Invalid email or password' });
        }
    };

    return (
        <div>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 z-50">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="#" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MyApp</span>
                    </a>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto${open ? '' : ' hidden'}`} id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">

                            <li>
                                <Link to="/"  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    User Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin-login"  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="mt-8 flex justify-center" style={{ marginTop: '150px',marginLeft:"10px",marginRight:"10px" }}>
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 dark:bg-gray-900">
                    {/* Alert message */}
                    {alert.message && (
                      <div
                        id={alert.type === 'success' ? 'alert-border-3' : 'alert-border-2'}
                        className={`flex items-center p-4 mb-4 text-${
                          alert.type === 'success' ? 'green' : 'red'
                        }-800 border-t-4 ${
                          alert.type === 'success'
                            ? 'border-green-300 dark:border-green-800'
                            : 'border-red-300 dark:border-red-800'
                        } bg-${
                          alert.type === 'success' ? 'green' : 'red'
                        }-50 dark:text-${
                          alert.type === 'success' ? 'green' : 'red'
                        }-800 dark:bg-gray-100`}
                        role="alert"
                      >
                        <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div className="ms-3 text-sm font-medium">
                          {alert.message}
                        </div>
                        <button
                          type="button"
                          className={`ms-auto -mx-1.5 -my-1.5 bg-${
                            alert.type === 'success' ? 'green' : 'red'
                          }-50 text-${
                            alert.type === 'success' ? 'green' : 'red'
                          }-500 rounded-lg focus:ring-2 focus:ring-${
                            alert.type === 'success' ? 'green' : 'red'
                          }-400 p-1.5 hover:bg-${
                            alert.type === 'success' ? 'green' : 'red'
                          }-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-100 dark:text-${
                            alert.type === 'success' ? 'green' : 'red'
                          }-400 dark:hover:bg-gray-200`}
                          aria-label="Close"
                          onClick={() => setAlert({ type: '', message: '' })}
                        >
                          <span className="sr-only">Dismiss</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">User Login</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} maxLength={30} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Enter your email" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} maxLength={13} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" 
                        onClick={(e)=>handleSubmit(e)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;