import React from 'react'
import background from '../assets/background.webp'

const Home = () => {
  return (
    <div className='bg-[#0e1110] relative '>

    <img src={background} className='w-[100vw] h-[93vh] mt-[7vh] absolute z-[-1]'/>
    <div className='w-[100vw] h-[93vh] absolute flex justify-center items-center mt-[7vh]'>
      <div className='w-[30rem] h-[30rem] bg-[#1a191e] relative rounded-full flex justify-center items-center' style={{boxShadow:"-2px -10px 50px #f4ac6a"}}>
        <div className='w-[90%] h-[90%] bg-transparent rounded-full absolute border-dashed border-2 z-10'></div>
      </div>
    </div>

    </div>
  )
}

export default Home