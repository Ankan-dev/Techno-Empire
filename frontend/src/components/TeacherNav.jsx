import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTeachers,removeTeachers } from '../slice/teacher-slice.js';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const TeacherNav = ({ openLogin, setOpenLogin }) => {
    const dispatch = useDispatch();
    const [logoutLoader,setLogoutLoader]=useState(false)
    
    // Move useSelector outside of useEffect
    const teacher = useSelector((state) => state.teacher);

    useEffect(() => {
        const fetchTeacher = async () => {
            console.log(teacher.teacher)
            if (teacher.teacher === null) { // Ensure the condition checks teacher.teacher
                try {
                    const response = await axios.get('/app/profile-teacher');
                    console.log(response)
                    if (response.data) {
                        
                        dispatch(addTeachers(response.data.data));
                    }
                } catch (err) {
                    console.log(err.message);
                }
            }
        };
        fetchTeacher();
    }, [teacher, dispatch]); // Add dependencies

    const loginClickHandle = (e) => {
        e.preventDefault();
        setOpenLogin(!openLogin); // Toggle login state more concisely
    };


    const logout=async(e)=>{
        e.preventDefault();
        setLogoutLoader(true)
        try {
            const response=await axios.post('/app/logout-teacher');
            if(response){
                setLogoutLoader(false)
                dispatch(removeTeachers());
            }
        } catch (error) {
            console.log(error.message)
            setLogoutLoader(false)
        }
    }

    return (
        <div className='w-full h-[7vh] bg-black flex fixed top-0 z-[99] items-center justify-between px-5 shadow-slate-600 shadow-md'>
            <div className='h-full flex items-center justify-center'>
                <p className='xl:text-[95%] text-[90%] font-bold my-5 hover:scale-110 transition-scale duration-500 ease-in-out cursor-pointer text-white'>
                    Techno Empire
                </p>
            </div>
            {teacher.teacher === null ? (
                <div>
                    <button
                        className='border-2 px-6 py-1 font-bold md:text-sm active:scale-90 text-white'
                        onClick={loginClickHandle}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <div className='w-[30%] h-full flex items-center justify-center gap-[50px]'>
                    <p className='my-3 font-bold text-white text-[80%]'>{teacher.teacher?.fullname}</p>
                    <p className='my-3 font-bold text-white text-[80%]'>Dashboard</p>
                    <button className='border-2 px-6 py-1 font-bold md:text-sm active:scale-90 text-white' onClick={logout}>
                        {
                            logoutLoader===true?<ClipLoader
                            color={'#ffffff'}
                            
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"/>:<>Logout</>
                        }
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherNav;
