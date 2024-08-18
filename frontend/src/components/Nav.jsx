import React, { useEffect } from 'react'
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

  return (
    <nav className='w-full h-[7vh] text-white bg-black flex justify-between'>
        <div className=' w-[50%] md:w-[20%] h-full flex items-center justify-center'>
            <p className='xl:text-3xl text-2xl font-bold'>Techno Empire</p>
        </div>
        <div className='w-[40%] h-full hidden md:flex'>
            <ul className='flex w-full h-full justify-around items-center text-xl font-bold'>
                <li>Home</li>
                <li>courses</li>
                <li>classes</li>
                <li>others</li>
            </ul>
        </div>
        <div className='w-[30%] h-full  hidden md:flex items-center justify-center' >
            {
                (User.user.length===0)? 
                <button className='border-2 px-6 py-1 font-bold ' onClick={navigateToLoginRoute}>login</button>
                :
                <ul className='w-full h-full  hidden justify-center gap-16 items-center md:flex' >
                <li className='text-3xl'><IoCartSharp /></li>
                <li className='font-bold text-xl'>{User.user[0]?.data?.fullname}</li>
                <li>
                    <button className='border-2 px-6 py-1 font-bold ' onClick={logoutsubmitHandler}>logout</button>
                </li>
            </ul>
            }
                           
        </div>
        <div className='h-full w-[30%]  md:hidden flex items-center justify-center'>
        <RxHamburgerMenu className='text-3xl cursor-pointer font-bold'/>
        </div>
    </nav>
  )
}

export default Nav