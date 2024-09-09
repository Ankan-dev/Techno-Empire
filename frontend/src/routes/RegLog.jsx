import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addUser} from '../slice/user-slice.js'


const RegLog = () => {

    const [isRegistered, setisRegistered] = useState(false);
    const [data,setData]=useState({
        fullname:"",
        email:"",
        password:""
    });
    const [checkPassword,setCheckPassword]=useState("");
    const [iscorrect,setIscorrect]=useState(true);
    const navigate=useNavigate();
    const [loginData,setLoginData]=useState({
        email:"",
        password:""
    });
    const dispatch=useDispatch();
    const [isError,setisError]=useState("");
    const [isLoginError,setisLoginError]=useState("");


    const Registered = (val) => {
        setisRegistered(val);
    }

    const handleRegesterChange=(e)=>{
        const newData={...data};
        newData[e.target.name]=e.target.value;
        setData(newData);
    }

    const handleLoginChange=(e)=>{
        const newData={...loginData};
        newData[e.target.name]=e.target.value;
        setLoginData(newData);
    }

    const submitLogin= async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('/app/student-login',loginData);
            if(response && response.data){
                dispatch(addUser(response.data));
                navigate('/')
            }else if(response && response.success===false && response.message==="user not verified"){
                const resendCode=await axios.put('/app/student-resend',loginData.email);
                if(resendCode && resendCode.success===true){
                    
                    navigate('/verify-user')
                }
            }
        }catch(error){
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


    const confirmPassword=(e)=>{
        let confPass=[...checkPassword];
        confPass=e.target.value;
        setCheckPassword(confPass);
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(checkPassword!=data.password){
            setIscorrect(false);
            console.log(iscorrect);
        }else{
            setIscorrect(true);
            try{
                const registerResponse= await axios.post('/app/register-student',data);
                if(registerResponse){
                    console.log(registerResponse);
                    if(registerResponse.data.success==true){
                        navigate('/verify-user',{state:{email:data.email}})
                        console.log(registerResponse.data);
                    }
                }


            }catch(error){
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.log(error.response.data.message); // Log the error message from the server
                    setisError(error.response.data.message);
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
    }

    return (
        <div className='mt-[16vh]'>
            <form className='w-full h-[100vh] flex flex-col items-center py-[10%] md:border-4 md:border-black md:w-[30%] md:h-[50%] md:py-[5%] md:mx-auto md:my-[3%]'>
                <div className='w-[50vw] h-[5vh] md:w-[20vw] rounded-full border-black border-4 relative flex'>
                    <div className='w-[50%] h-full absolute bg-black rounded-full z-[-1]'></div>
                    <div className='w-[99%] h-[99%] rounded-full flex items-center justify-around font-bold '>
                        <p className='text-white my-2' onClick={()=>Registered(false)}>Login</p>
                        <p className='my-2' onClick={()=>Registered(true)}> Register</p>
                    </div>
                </div>
                {
                    isRegistered===false?
                    <>
                        <h1 className='text-[8vw] font-bold  mt-7 md:text-[2vw]'>Login</h1>
                        <input name='email' type='email' placeholder='username' value={loginData.email} onChange={handleLoginChange} className='w-[80%] h-[7%] outline-none border-b-4 border-black bg-transparent mb-4 py-2' />
                        <input name='password' type='password' placeholder='password' value={loginData.password} onChange={handleLoginChange} className='w-[80%] h-[7%] outline-none border-b-4 border-black bg-transparent mb-6 py-2' />
                        {
                            isLoginError!=""?<div className='w-[20rem] h-[3rem] bg-red-300 border-4 border-red-600 border-solid mb-5 flex items-center justify-center font-bold'>{isLoginError}</div> :""
                        }
                        <button onClick={submitLogin} className='border-black border-2 px-10 py-2'>Login</button>
                    </>:
                    <>
                    <h1 className='text-[8vw] font-bold mt-7 md:text-[2vw]'>Register</h1>
                        <input name='fullname' onChange={(e)=>handleRegesterChange(e)} value={data.fullname} type='text' placeholder='full name' className='w-[80%] h-[7%] outline-none border-b-4 border-black bg-transparent mb-4 py-2' />
                        <input name='email' onChange={(e)=>handleRegesterChange(e)} value={data.email} type='email' placeholder='email' className='w-[80%] h-[7%] outline-none border-b-4 border-black bg-transparent mb-4 py-2' />
                        <input name='password' onChange={(e)=>handleRegesterChange(e)} value={data.password} type='password' placeholder='password' className={iscorrect===true?'w-[80%] h-[7%] outline-none border-b-4 border-black bg-transparent mb-6 py-2':'w-[80%] h-[7%] outline-none border-b-4 border-red-600 bg-transparent mb-6 py-2'} />
                        <input onChange={(e)=>confirmPassword(e)} value={checkPassword} type='password' placeholder='confirm password' className={iscorrect===true?'w-[80%] h-[7%] outline-none border-b-4 border-black bg-transparent mb-6 py-2':'w-[80%] h-[7%] outline-none border-b-4 border-red-600 bg-transparent mb-6 py-2'} />
                        {
                            iscorrect===false?<p className='mb-6 text-red-600 font-bold'>Password Doesn't Match</p>:""
                        }     
                        {
                            isError!=""?<div className='w-[20rem] h-[3rem] bg-red-300 border-4 border-red-600 border-solid mb-5 flex items-center justify-center font-bold'>{isError}</div> :""  
                        }
                                        
                        <button className='border-black border-2 px-10 py-2' onClick={handleSubmit}>Register</button>
                        
                    </>
                }
            </form>
        </div>
    )
}

export default RegLog