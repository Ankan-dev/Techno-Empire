import React, { useRef } from 'react'
import { FaEdit } from "react-icons/fa";
import ProfileImage from '../components/ProfileImage.jsx';
import { useSelector } from 'react-redux';

const Profile = () => {
    const userExists = useSelector(state => state.user);
    console.log(userExists.user.data)

    

    return (
        <div className='w-full h-[100vh]  lg:flex'>
            <div className='hidden lg:block lg:w-[50%] h-full lg:bg-gray-300'>
                <div className='my-6'>
                    <ProfileImage/>
                </div>
                <div className='w-[80%] h-[60%]  mx-auto flex flex-col items-center py-3 px-3 overflow-auto'>
                    <h1 className='font-bold text-[2rem] mb-5'>Your Courses</h1>
                    <ul className='w-full min-h-[60%] p-4'>
                        <li className='w-full flex justify-center'>No Courses are available</li>
                    </ul>
                </div>
            </div>
            <div className='w-full h-full pt-7 lg:w-[50%]'>
                <div className='lg:hidden'>
                    <ProfileImage/>
                </div>
                <form className='w-full h-[70%]  flex flex-col items-center gap-5 pt-8 lg:border-2 lg:border-black lg:border-solid lg:w-[80%] rounded-2xl lg:mx-auto lg:mt-10'>
                    <h1 className='font-bold text-[3rem]'>Your Details</h1>
                    <div className='w-full flex justify-center '><input className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-full border-2 border-solid border-black  rounded-r-lg flex justify-center items-center'><FaEdit /></button></div>
                    <input className='w-[80%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-md' disabled />
                    <div className='w-full flex justify-center '><input className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-black  rounded-r-lg flex justify-center items-center'><FaEdit /></button></div>
                    <div className='w-full flex justify-center '><input className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-black rounded-r-lg flex justify-center items-center'><FaEdit /></button></div>
                    <div className='w-full flex justify-center '><input className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-black  rounded-r-lg flex justify-center items-center'><FaEdit /></button></div>
                    <button className='border-2 border-black border-solid px-10 py-3 font-bold'>save</button>
                </form>
            </div>
            
        </div>
    )
}

export default Profile