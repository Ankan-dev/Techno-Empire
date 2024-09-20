import React, { useEffect, useRef, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import ProfileImage from '../components/ProfileImage.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addUser} from '../slice/user-slice.js'
import './style-folder/style.css'

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
    const dispatch=useDispatch();


    useEffect(()=>{
        if(userExists && userExists.user && userExists.user[0]){
            setLoggedInUser(userExists.user[0].data);
            setName(userExists.user[0].data.fullname);
            setEmail(userExists.user[0].data.email)
            if(userExists.user[0].data.phone){
                setPhone(userExists.user[0].data.phone)
            }
            if(userExists.user[0].data.college){
                setCollege(userExists.user[0].data.college)
            }
            if(userExists.user[0].data.cgpa){
                setcgpa(userExists.user[0].data.cgpa)
            }
        }
    },[userExists])
    console.log(loggeinUser);
    

    const updateProfileData=async(e)=>{
        e.preventDefault();
        const updatedData={
            name:name,
            phone:phone,
            college:college,
            cgpa:cgpa
        };

        try {
            const response = await axios.put('/app/student-updateDetails',updatedData);
            if(response && response.data){
                //console.log(response.data.data);
                dispatch(addUser(response.data.data))
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.log(error.response.data.message); // Log the error message from the server
                
                setisLoginError(error.response.data.message);
                console.log(error.response.status); // Log the status code
            } else if (error.request) {
                // Request was made, but no response was received
                console.log("No response received:", error.request);
            } else {
                // Something else happened while setting up the request
                console.log("Error:", error.message);
            }
        }
    }

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
        <div className='w-full h-[93vh] mt-[7vh] lg:flex bg-black'>
            <div className='hidden lg:block lg:w-[45%] h-full '>
                <div className='my-6'>
                    <ProfileImage/>
                </div>
                <div className='w-[80%] h-[60%]  mx-auto flex flex-col items-center py-3 px-3 overflow-auto'>
                    <h1 className='font-bold text-[2rem] mb-5 text-white'>Your Courses</h1>
                    <ul className='w-full min-h-[60%] p-4'>
                        <li className='w-full flex justify-center text-white'>No Courses are available</li>
                    </ul>
                </div>
            </div>
            <hr className='w-[2px] h-[80%] mt-16 bg-white lg:block hidden'/>
            <div className='w-full h-full pt-7 lg:w-[50%]'>
                <div className='lg:hidden'>
                    <ProfileImage/>
                </div>
                <form id='profile-frame' className='w-full h-[33rem]  flex flex-col items-center md:border-4 md:border-white md:border-solid md:w-[80%] rounded-2xl md:mx-auto md:mt-10'>
                    <h1 className='font-bold py-3 text-white'>Your Details</h1>
                    <div className='flex justify-center w-[100%] h-[2.5rem] mb-4'><input id='Name' className='w-[70%] border-2 text-white border-solid border-blue-400 px-4 rounded-l-lg' onChange={changeName} value={name} disabled={nameField}  /><button className='w-[10%] h-[2.5rem] border-2 border-solid border-blue-400 text-blue-400  rounded-r-lg flex justify-center items-center' onClick={nameEdit}><FaEdit /></button></div>
                    <input id='email' className='w-[80%] h-[2.5rem] text-white border-2 border-solid border-blue-400 px-4 rounded-lg mb-4' value={email} disabled />
                    <div className='flex justify-center w-[100%] h-[2.5rem] mb-4'><input id='phn_No' className='w-[70%] border-2 border-solid border-blue-400 px-4 rounded-l-lg text-white' onChange={changePhone} value={phone} placeholder='Phone No.' disabled={phoneField} /><button className='w-[10%] h-[2.5rem] border-2 border-solid border-blue-400 text-blue-400  rounded-r-lg flex justify-center items-center' onClick={phoneEdit}><FaEdit /></button></div>
                    <div className='flex justify-center w-[100%] h-[2.5rem] mb-4'><input id='college' className='w-[70%] border-2 border-solid border-blue-400 px-4 rounded-l-lg text-white' onChange={changeCollege} value={college} disabled={collegeField} placeholder='College or University' /><button className='w-[10%] h-[2.5rem] border-2 border-solid border-blue-400 text-blue-400  rounded-r-lg flex justify-center items-center' onClick={collegeEdit}><FaEdit /></button></div>
                    <div className='flex justify-center w-[100%] h-[2.5rem] mb-4'><input id='cgpa' className='w-[70%] border-2 border-solid border-blue-400 px-4 rounded-l-lg text-white' onChange={changeCgpa} value={cgpa} disabled={CGPAField} placeholder='CGPA'/><button className='w-[10%] h-[2.5rem] border-2 border-solid border-blue-400 text-blue-400  rounded-r-lg flex justify-center items-center' onClick={CGPAEdit}><FaEdit /></button></div>
                    <button id='profile-save-button' onClick={updateProfileData} className='text-white bg-black px-16 py-2.5 rounded-full font-bold text-xl border-4 border-white'>save</button>
                </form>
            </div>
            
        </div>
    )
}

export default Profile