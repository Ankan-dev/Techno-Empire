import React from 'react'
import background from '../assets/background.webp'
import { IoArrowRedo } from "react-icons/io5";


const Home = () => {
  return (
    <div className='bg-[#0e1110] relative '>

      <img src={background} className='w-[100vw] h-[93vh] mt-[7vh] absolute z-[-1]' />
      <div className='w-[100vw] h-[93vh] absolute flex justify-center items-center mt-[7vh]'>
        <div className='w-[30rem] h-[30rem] bg-[#1a191e] relative rounded-full flex justify-center items-center' style={{ boxShadow: "-2px -10px 50px #f4ac6a" }}>
          <div className='w-[90%] h-[90%] bg-transparent rounded-full absolute border-dashed border-2 z-10'></div>

          <div className='w-[150px] h-[150px] flex justify-center items-center rounded-full bg-[#1a191e] absolute top-[-4rem] left-[10.4rem] z-20 border-white border-2' style={{ boxShadow: "-2px -10px 50px #f4ac6a" }}>
            <div className='w-[90%] h-[90%] bg-transparent rounded-full  border-2 ' style={{ boxShadow: "-1px -2px 50px #f4ac6a, 1px 2px 10px  #f4ac6a inset" }}></div>
          </div>
          <div className='flex items-center justify-between h-10 w-[9rem] absolute top-[20%] left-[32%] z-20'>
            <IoArrowRedo style={{ fontSize: "2rem", filter: "drop-shadow(-1px 3px 5px #f4ac6a)", color: "#ffffff" }} />
            <p className='text-white my-4'>Ankan Mandal</p>
          </div>
          <h1 className='text-white absolute z-30 font-Rampart font-extrabold scale-[1.5]'>Welcome to Techno Empire</h1>
        </div>
      </div>

    </div>
  )
}

export default Home