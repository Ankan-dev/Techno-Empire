import React, { useState } from 'react'
import background from '../assets/techers-background.webp'
import './style-folder/style.css'
import { useOutletContext } from 'react-router-dom'

const TeacherHome = () => {

  const [openRegister, setOpenRegister] = useState(false)
  const { openLogin , setOpenLogin} = useOutletContext();
  const [loginOtp, setLoginOtp] = useState(false);
  const [registerData,setRegisterData]=useState({
    fullname:"",
    email:""
  })

  const openRegisterForm = (e) => {
    e.preventDefault();
    setOpenRegister(true);
  }

  const closeRegistrationForm = () => {
    setOpenRegister(false);
  }

  const closeLoginForm=()=>{
    setOpenLogin(false);
  }

  const getRegisterData=(e)=>{
    let newData={...registerData};
    newData[e.target.name]=e.target.value;
    setRegisterData(newData);
    console.log(registerData)
  }

  return (
    <div className='flex justify-center items-center'>
      <img className='fixed w-[100vw] h-[100vh] z-[-1] top-0' src={background} />
      <div className=' w-[80vw] h-[20rem]  lg:w-[60rem] lg:h-[25rem] md:w-[40rem] md:h-[30rem] sm:w-[35rem] sm:h-[35rem] fixed top-[20vh] rounded-2xl flex flex-col justify-center items-center bg-[#1a191e]' style={{ boxShadow: "-1px 1px 70px #f4ac6a" }}>
        <h1 id='teacher-head' className='text-white text-center'>Empower Your Teaching<br />reach the world</h1>
        <p id='text-section' className='text-gray-600 text-center lg:mt-3'>Create and sell interactive courses<br />with seamless tools</p>
        <button className='absolute bg-[#171417] sm:w-[25vw] sm:h-[7vh] z-30 lg:top-[90%] md:top-[92%] sm:top-[80%] top-[80%] md:w-[12rem] w-[6rem] md:h-[4rem] h-[2rem] rounded-full border-white border-2 text-[#b3dc89] sm:text-base text-xs active:scale-95' style={{ boxShadow: "3px 2px 20px #f4ac6a" }}
          onClick={openRegisterForm}>
          Let's Start
        </button>
      </div>
      {
        openRegister === true ?
          <div className='fixed z-10 w-full h-full bg-[rgba(0,0,0,0.6)] top-0 flex justify-center py-[12rem]' onClick={closeRegistrationForm}>
            <form id='register' className='w-[30rem] h-[22rem] bg-black border-3 border-white pt-4 flex flex-col items-center' onClick={(e) => { e.stopPropagation() }}>
              <h1 className='text-white '>Register</h1>
              <input name='fullname' onChange={getRegisterData} type='text' className='w-[80%] py-1 px-2 border-2 border-blue-400 bg-transparent text-white mt-3' placeholder='Full Name' />
              <input name='email' onChange={getRegisterData} type='email' className='w-[80%] py-1 px-2 border-2 border-blue-400 bg-transparent text-white mt-3' placeholder='Email' />
              
              {
                loginOtp===true?
                <input type='password' className='w-[80%] py-1 px-2 border-2 border-blue-400 bg-transparent text-white mt-3' placeholder='Enter your code' />
                :<></>
              }
              
              <button className='w-[8rem] h-[3rem] bg-blue-500 rounded-full my-4 bg-transparent active:scale-90 border-white border-4 text-white'
                style={{ boxShadow: "-2px 1px 45px #60a5fa, 5px 5px 50px inset #60a5fa" }}>
                Register
              </button>
            </form>
          </div> : <></>
      }

      {
        openLogin===true?
        <div className='fixed z-10 w-full h-full bg-[rgba(0,0,0,0.6)] top-0 flex justify-center py-[12rem]' onClick={closeLoginForm}>
          <form id='register' className='w-[30rem] h-[16rem] bg-black border-3 border-white pt-4 flex flex-col items-center' onClick={(e) => { e.stopPropagation() }}>
            <h1 className='text-white '>Login</h1>
            <input type='email' className='w-[80%] py-1 px-2 border-2 border-blue-400 bg-transparent text-white mt-3' placeholder='Email' />
            {
              loginOtp === true ?
                <input type='password' className='w-[80%] py-1 px-2 border-2 border-blue-400 bg-transparent text-white mt-3' placeholder='Enter your code' /> : <></>
            }
            <button className='w-[8rem] h-[3rem] bg-blue-500 rounded-full my-4 bg-transparent active:scale-90 border-white border-4 text-white'
              style={{ boxShadow: "-2px 1px 45px #60a5fa, 5px 5px 50px inset #60a5fa" }}>
              Login
            </button>
          </form>
        </div>:<></>

      }
    </div>
  )
}

export default TeacherHome