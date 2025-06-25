import React, { useEffect, useRef, useState } from "react";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const UserCourses = () => {
    const { logout,user,courses,set_courses } = useAuth();
    const navigate = useNavigate();
    const playerRef = useRef(null);
    const [course_IDs,set_course_IDs]=useState([]);
    const [showOverlay, setShowOverlay] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setShowOverlay(true);
                playerRef.current?.pause();
            } else {
                setShowOverlay(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        async function LoadCourses() {
            if (!user?.courses?.[0]?.ids) return;
    
            const ids = user.courses[0].ids;
            set_course_IDs(ids); // optional, since you can directly use user.courses[0].ids
    
            const { data, error } = await supabase.storage.from('accounts').download('course_list.json');
            if (error) {
                console.error("Failed to fetch course list:", error.message);
                return;
            }
    
            const allCourses = JSON.parse(await data.text()).courses;
            const filteredCourses = allCourses.filter(course => ids.includes(course.course_id));
            set_courses(filteredCourses);
        }
    
        LoadCourses();
    }, [user]);

    return (
        <>
            <ProfileNavbar onLogout={handleLogout} />
            <div className="mt-8 flex justify-center" style={{ marginTop: '150px', marginLeft: '10px', marginRight: '10px' }}>
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 dark:bg-gray-900">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Courses</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                        {courses.length>0 ? 
                            courses.map((cour,index)=>(
                                <div style={{height:"200px",cursor:"pointer"}}
                                    key={index}
                                    onClick={(e)=>navigate(`/user-course/${cour.course_id}`)}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{cour.course_name}</span>
                                </div>
                            )):<div>Loading . . . </div>
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCourses;
