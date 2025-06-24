import React, { useState } from "react";
import { Link } from "react-router-dom";
const ProfileNavbar = ({ onLogout }) => {
    const [open, setOpen] = useState(false);
    return (
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
                                <Link to='/user-dashboard' className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link to='/user-courses' className="block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Courses</Link>
                            </li>
                            <li>
                                <button type="button" onClick={onLogout} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent bg-transparent border-none cursor-pointer">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
};

export default ProfileNavbar;