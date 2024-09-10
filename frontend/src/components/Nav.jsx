import React, { useEffect, useState } from 'react'
import { IoCartSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { removeUser } from '../slice/user-slice';
import axios from 'axios'


const Nav = () => {

    const navigate=useNavigate();
    const User =useSelector((state)=>state.user);
    const dispatch=useDispatch()
    const [menu,setMenu]=useState(-100);

    const openMenu=()=>{
        setMenu(0)
    }

    const closeMenu=()=>{
        setMenu(-100)
    }
    
    const navigateToLoginRoute=(e)=>{
        e.preventDefault();
        navigate('/Register-Login');
    }

    const logoutsubmitHandler=(e)=>{
        e.preventDefault()
        console.log("clicked");
        logout();
    }

    const logout=async()=>{
        try{
            const response=await axios.put('/app/student-logout')
            if(response && response.data){
                dispatch(removeUser());
            }
        }catch(err){
            console.log(err.message)
        }
    }

    const profileNavigate=()=>{
        navigate("/Profile")
    }
  return (
    <nav className='w-full h-[7vh] text-white bg-black flex justify-between px-[5%] fixed top-0 z-50 shadow-md shadow-slate-600'>
        <div className=' h-full flex items-center justify-center'>
            <p className='xl:text-[95%] text-[90%] font-bold my-5 hover:scale-110 transition-scale duration-500 ease-in-out cursor-pointer'>Techno Empire</p>
        </div>
        <div className='w-[40%] h-full hidden md:flex'>
            <ul className='flex w-full h-full justify-around items-center text-[80%] font-bold'>
                <li className='hover:text-blue-400 cursor-pointer hover:scale-110 transition-scale duration-500 ease-in-out'>Learning</li>
                <li className='hover:text-blue-400 cursor-pointer hover:scale-110 transition-scale duration-500 ease-in-out'>courses</li>
                <li className='hover:text-blue-400 cursor-pointer hover:scale-110 transition-scale duration-500 ease-in-out'>classes</li>
                <li className='hover:text-blue-400 cursor-pointer hover:scale-110 transition-scale duration-500 ease-in-out'>others</li>
            </ul>
        </div>
        <div className=' h-full  hidden md:flex items-center justify-center' >
            {
                (User.user.length===0)? 
                <button className='border-2 px-6 py-1 font-bold md:text-sm active:scale-90' onClick={navigateToLoginRoute}>login</button>
                :
                <ul className='w-full h-full  hidden justify-center gap-12 items-center md:flex my-5' >
                <li className='text-xl'><IoCartSharp /></li>
                <li onClick={profileNavigate} className='font-bold text-[80%]'>{User.user[0]?.data?.fullname}</li>
                <li>
                    <button className='border-2 px-6 py-1 font-bold active:scale-90' onClick={logoutsubmitHandler}>logout</button>
                </li>
            </ul>
            }
                           
        </div>
        <div className='h-full md:hidden flex items-center justify-center'>
        <RxHamburgerMenu className='text-3xl cursor-pointer font-bold' onClick={openMenu}/>
        </div>
        <div className={`w-[50vw] h-full fixed  bg-black shadow-md shadow-slate-300 transition-right duration-500 ease-in-out`} style={{right:`${menu}%`}}>
        {
                (User.user.length===0)? 
                <button className='border-2 px-6 py-1 font-bold mx-3 mt-3 ' onClick={navigateToLoginRoute}>login</button>
                :
                <ul className='w-full h-[9rem] py-[2rem] ' >
                <li className='font-bold text-[80%]'>Welcome</li>
                <li onClick={profileNavigate} className='font-bold text-[1.2rem] mb-3'>{User.user[0]?.data?.fullname}</li>
                <li>
                    <button className='border-2 px-6 py-1 font-bold text-sm ' onClick={logoutsubmitHandler}>logout</button>
                </li>
            </ul>
            }
            <hr className='w-[90%] mx-auto'></hr>
            <div className='w-full min-h-[13rem] '>
            
                <p className=' w-full py-2 px-7 hover:bg-blue-600'>Home</p>
                <p className=' w-full py-2 px-7 hover:bg-blue-600'>courses</p>
                <p className=' w-full py-2 px-7 hover:bg-blue-600'>classes</p>
                <p className=' w-full py-2 px-7 hover:bg-blue-600'>others</p>
        </div>
        <hr className='w-[90%] mx-auto'></hr>
        <div>
            <p className='w-full flex justify-center active:text-blue-600' onClick={closeMenu}> Close Menu </p>
        </div>
        </div>
    </nav>
  )
}

export default Nav