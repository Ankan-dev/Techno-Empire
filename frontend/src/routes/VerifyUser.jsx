import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../slice/user-slice.js'


const VerifyUser = () => {

    const [counter, setcounter] = useState(60);
    const timeInterval = useRef();
    const location = useLocation();
    const { email } = location.state || {}
    const [code, setcode] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        const data = {
            email: email,
            code: code
        }

        try {
            const sendCode = await axios.post('/app/verify-student', data)
            if (sendCode) {
                setcode("");
                await getUser();
                navigate('/')
            }
        } catch (err) {
            console.log(err.message);
        }

    }

    const timer = () => {
        timeInterval.current = setInterval(() => {
            setcounter(function (previousCount) {
                if (previousCount >= 1) {
                    return previousCount - 1;
                } else {
                    clearInterval(timeInterval.current);
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

    return (
        <div className='w-full h-[70vh] flex flex-col items-center pt-6'>
            <h1 className='text-2xl font-bold md:text-5xl md:mt-10'>Enter the Code sent to your mail</h1>
            <form className='w-full min-h-[15vh]  flex flex-col items-center justify-center mt-5 gap-3 '>
                <input type='password' value={code} onChange={(e) => { handleChange(e) }} placeholder='Enter the code' className='w-[80%] h-10 border-2 border-black p-2 md:w-[30%]' />
                <button className='bg-black text-white font-bold w-[10rem] h-[2.5rem]' onClick={handleSubmit}>Verify</button>
            </form>

            <div className=' w-[5rem] h-[5rem] border-black border-4 rounded-full flex justify-center items-center mt-4'>
                <h1 className='font-bold text-3xl'>{counter}</h1>
            </div>
        </div>
    )
}

export default VerifyUser