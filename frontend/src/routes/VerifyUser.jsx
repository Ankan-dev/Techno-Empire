import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../slice/user-slice.js'
import './style-folder/style.css'
import ButtonLoader from '../components/buttonLoader.jsx'

const VerifyUser = () => {

    const [counter, setcounter] = useState(60);
    const timeInterval = useRef();
    const location = useLocation();
    const { email } = location.state || {}
    const [code, setcode] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [timeOver, setTImeOver] = useState(false)
    const [verifyLoader,setVerifyLoader]=useState(false)
    const [resendLoader,setResendLoader]=useState(false);


    useEffect(() => {
        timer();
        return () => clearInterval(timeInterval.current);
    }, [])

    const handleChange = (e) => {
        const Newcode = e.target.value;
        setcode(Newcode);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setVerifyLoader(true)
        const data = {
            email: email,
            code: code
        }

        
        try {
            const sendCode = await axios.post('/app/verify-student', data)
            
            if (sendCode) {
                console.log(sendCode)
                
                setcode("");
                await getUser();
                navigate('/Learning')
                setVerifyLoader(false)
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    const timer = () => {
        timeInterval.current = setInterval(() => {
            setcounter(function (previousCount) {
                if (previousCount >= 1) {
                    return previousCount - 1;
                } else {
                    clearInterval(timeInterval.current);
                    setTImeOver(true);
                    deleteCode();
                    return 0
                }
            })
        }, 1000)
    }

    const getUser = async () => {
        try {
            const LoggedinUser = await axios.get('/app/student-profile')
            if (LoggedinUser) {
                if (LoggedinUser.data.success === true) {
                    //console.log(LoggedinUser);
                    dispatch(addUser(LoggedinUser.data));
                }

            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteCode=async()=>{
        try {
           const deleteToken= await axios.patch('/app/student-deleteToken',{email:email});
           if(!deleteToken){
            console.log("The token is not deleted")
           }
        } catch (error) {
            console.log(error)
        }
    }

    const resentCode= async(e)=>{
        e.preventDefault();
        setResendLoader(true)
        try {
            if(!email){
                setResendLoader(false)
                console.log("Email is missing")
            }
            const response=await axios.put('/app/student-resend',{email:email});
            if(!response){
                setResendLoader(false)
                console.log("Something is wrong");
            }
            setResendLoader(false)
            console.log(response.data);
        } catch (error) {
            setResendLoader(false)
            console.log(error.message)
        }
    }

    return (
        <div className='w-full h-[100vh] flex flex-col items-center pt-8 bg-black'>
            <h1 className='text-2xl font-bold md:text-5xl md:mt-10 text-white'>Enter the Code sent to your mail</h1>
            <form className='w-full min-h-[15vh]  flex flex-col items-center justify-center mt-5 gap-3 '>
                <input type='password' value={code} onChange={(e) => { handleChange(e) }} placeholder='Enter the code' className='w-[80%] h-10 border-2 text-white p-2 md:w-[30%] border-blue-400 bg-transparent' />
                <button id='verify-button' className='border-2 border-white rounded-lg text-white font-bold w-[10rem] h-[2.5rem] active:scale-90' onClick={handleSubmit}>{!verifyLoader?<>Verify</>:<ButtonLoader/>}</button>
                {
                    timeOver ?
                        <button className=' border-white border-solid border-2 font-bold w-[10rem] h-[2.5rem] my-5 text-white active:scale-90' onClick={resentCode}>{
                            !resendLoader?<>
                            Resend Code
                            </>:<ButtonLoader/>
                            }</button>
                        : <></>
                }
            </form>

            <div className=' w-[5rem] h-[5rem] border-white border-4 rounded-full flex justify-center items-center mt-4'>
                <h1 className='font-bold text-3xl text-white'>{counter}</h1>
            </div>
        </div>
    )
}

export default VerifyUser