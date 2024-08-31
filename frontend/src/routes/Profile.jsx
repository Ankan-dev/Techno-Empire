import React, { useEffect, useRef, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import ProfileImage from '../components/ProfileImage.jsx';
import { useSelector } from 'react-redux';

const Profile = () => {
    const userExists = useSelector(state => state.user);
    const [loggeinUser,setLoggedInUser]=useState(null);
    const [nameField,setNameField]=useState(true);
    const [collegeField,setCollegeField]=useState(true);
    const [CGPAField,setCGPAField]=useState(true);
    const [phoneField,setPhoneField]=useState(true);
    const [name,setName]=useState(null);
    const [email, setEmail]=useState(null);
    const [phone, setPhone]=useState(null);
    const [college, setCollege]=useState(null);
    const [cgpa, setcgpa]=useState(null);


    useEffect(()=>{
        if(userExists && userExists.user && userExists.user[0]){
            setLoggedInUser(userExists.user[0].data);
            setName(userExists.user[0].data.fullname);
            setEmail(userExists.user[0].data.email)
        }
    },[userExists])
    console.log(loggeinUser);


    const changeName=(e)=>{
        const newName=e.target.value;
        setName(newName);
    }

    const changePhone=(e)=>{
        const newphone=e.target.value;
        setPhone(newphone);
    }

    const changeCollege=(e)=>{
        const newCollege=e.target.value;
        setCollege(newCollege);
    }

    const changeCgpa=(e)=>{
        const newCgpa=e.target.value;
        setcgpa(newCgpa);
    }


    const nameEdit=(e)=>{
        e.preventDefault()
        setNameField(!nameField);
    }
    const phoneEdit=(e)=>{
        e.preventDefault()
        setPhoneField(!phoneField);
    }

    const collegeEdit=(e)=>{
        e.preventDefault()
        setCollegeField(!collegeField);
    }

    const CGPAEdit=(e)=>{
        e.preventDefault()
        setCGPAField(!CGPAField);
    }



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
                    <div className='w-full flex justify-center '><input onChange={changeName} value={name} disabled={nameField} className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg' /><button className='w-[10%] h-full border-2 border-solid border-black  rounded-r-lg flex justify-center items-center' onClick={nameEdit}><FaEdit /></button></div>
                    <input value={email} className='w-[80%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-md' disabled />
                    <div className='w-full flex justify-center '><input onChange={changePhone} value={phone} placeholder='Phone No.' disabled={phoneField} className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-black  rounded-r-lg flex justify-center items-center' onClick={phoneEdit}><FaEdit /></button></div>
                    <div className='w-full flex justify-center '><input onChange={changeCollege} value={college} disabled={collegeField} placeholder='College or University' className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-black rounded-r-lg flex justify-center items-center' onClick={collegeEdit}><FaEdit /></button></div>
                    <div className='w-full flex justify-center '><input onChange={changeCgpa} value={cgpa} disabled={CGPAField} placeholder='CGPA' className='w-[70%] h-[2.5rem] border-black border-2 border-solid px-4 rounded-l-lg'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-black  rounded-r-lg flex justify-center items-center' onClick={CGPAEdit}><FaEdit /></button></div>
                    <button className='border-2 border-black border-solid px-10 py-3 font-bold'>save</button>
                </form>
            </div>
            
        </div>
    )
}

export default Profile