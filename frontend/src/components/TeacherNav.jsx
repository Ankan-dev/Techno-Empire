import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

const TeacherNav = ({ openLogin, setOpenLogin }) => {

    const teacher = useSelector((state)=>state.teacher)
    console.log(teacher)

    const loginClickHandle = (e) => {
        e.preventDefault();
        if (openLogin === false)
            setOpenLogin(true)
        else
            setOpenLogin(false)
    }

    const logoutClickHandle=(e)=>{
        e.preventDefault();
        
    }

    return (
        <div className='w-full h-[7vh] bg-black flex fixed top-0 z-[99] items-center justify-between px-5 shadow-slate-600 shadow-md'>
            <div className='h-full flex items-center justify-center'>
                <p className='xl:text-[95%] text-[90%] font-bold my-5 hover:scale-110 transition-scale duration-500 ease-in-out cursor-pointer text-white'>Techno Empire</p>
            </div>
            {
                teacher===null?
            <div>
                
                   
                    <button className='border-2 px-6 py-1 font-bold md:text-sm active:scale-90 text-white' onClick={loginClickHandle}>login</button>
                    
                
            </div>
            :<div className='w-[30%] h-full flex items-center justify-center gap-[50px]'>
                <p className='my-3 font-bold text-white text-[80%]'>{teacher.teacher.fullname}</p>
                <p className='my-3 font-bold text-white text-[80%]'>Dashboard</p>
                <button className='border-2 px-6 py-1 font-bold md:text-sm active:scale-90 text-white'>Logout</button>
            </div>
            }
        </div>
    )
}

export default TeacherNav