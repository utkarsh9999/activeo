import React, { useEffect, useState, Suspense,lazy } from "react";
import { useParams } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const VideoList = lazy(() => import("./VideoList"));

const UserCourse=()=>{
    const { logout,user,courses,set_courses } = useAuth();
    const {course_id}=useParams();
    const navigate = useNavigate();
    const [videoDirectoryUrls,set_videoDirectoryUrls]=useState([]);
   

    useEffect(() => {
        async function LoadCourseVideos(){
            try{    
                if (course_id) {
                    const { data, error } = await supabase.storage.from('accounts').download('course_list.json');
                    if (error) {
                        console.error("Failed to fetch course list:", error);
                        return;
                    }
    
                    const text = await data.text();
    
                    const direUrls = JSON.parse(text).courses;
    
                    const matchedCourse = direUrls.find(course => String(course.course_id) === String(course_id));

                    if (matchedCourse) {
                        set_videoDirectoryUrls(matchedCourse?.course_content_urls);
                    }
                    else {
                        console.log("No match found for course_id:", course_id);
                    }
                }
            }catch(err){
                console.log("Caught error:", err);
            }
        }
        LoadCourseVideos()
    
    }, [course_id]);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return(
        <>
            <ProfileNavbar onLogout={handleLogout} />
            <div className="mt-8 flex justify-center" style={{ marginTop: '150px', marginLeft: '10px', marginRight: '10px' }}>
                <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-8 dark:bg-gray-900">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Course</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                        <Suspense fallback={<div style={{color:"white"}}>
                            <p style={{textAlign:"center"}}>Loading videos . . .</p></div>}>
                            <VideoList videos={videoDirectoryUrls} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserCourse;