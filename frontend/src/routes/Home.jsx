import React, { useRef, useEffect } from 'react';
import background from '../assets/background.webp';
import profile from '../assets/profile.jpeg';
import { IoArrowRedo } from "react-icons/io5";

const Home = () => {
  // Refs for the elements you want to animate
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const profileRef = useRef(null);




  return (
    <div className='bg-[#0e1110] relative w-full bg-transparent'>
      <img src={background} className='w-[100vw] h-[93vh] mt-[7vh] fixed top-0 z-[-1]' />
      <div ref={containerRef} className='w-[100vw] h-[93vh] relative  flex justify-center items-center mt-[7vh]'>
        <div className='w-[83vw] h-[50vh] sm:w-[30rem] sm:h-[30rem] bg-[#1a191e] relative rounded-full flex justify-center items-center' style={{ boxShadow: "-2px -10px 50px #f4ac6a" }}>
          <div className='w-[90%] h-[90%] bg-transparent rounded-full absolute border-dashed border-2 z-10'></div>

          <div ref={profileRef} className='w-[25vw] h-[15vh] sm:w-[150px] sm:h-[150px] flex justify-center items-center rounded-full bg-[#1a191e] absolute sm:top-[-4rem] top-[-3rem] sm:left-[10.4rem] z-20 border-white border-2' style={{ boxShadow: "-2px -10px 50px #f4ac6a" }}>
            <div className='w-[90%] h-[90%] bg-transparent rounded-full border-2 overflow-hidden' style={{ boxShadow: "-1px -2px 50px #f4ac6a, 1px 2px 10px  #f4ac6a inset" }}>
              <img src={profile} className='w-full h-full' />
            </div>
          </div>

          <div className='flex items-center justify-between sm:h-10 sm:w-[9rem] w-[7.2rem] absolute sm:top-[22.5%] top-[18%] sm:left-[32%] z-20 '>
            <IoArrowRedo className='sm:text-[2rem]' style={{ filter: "drop-shadow(-1px 3px 5px #f4ac6a)", color: "#ffffff" }} />
            <p className='text-white sm:my-4 my-2 text-sm sm:text-base'>Ankan Mandal</p>
          </div>

          <h1 ref={headingRef} className='text-white absolute z-30 font-Rampart md:scale-[1.5] top-[35%] text-center text-[6vw] md:text-[2.5rem]' style={{ fontWeight: "900" }}>
            Welcome to Techno Empire
          </h1>

          <h3 ref={subheadingRef} className='text-white absolute z-30 font-Rampart md:scale-[1.5] top-[50%] text-center text-[5vw] md:text-[2rem]' style={{ fontWeight: "900" }}>
            Empower Your Learning Journey Today
          </h3>

          <p className='md:text-xs text-[1.5vw] text-gray-600 w-[60%] absolute top-[70%] left-[21%] z-20 text-center'>
            Discover courses, enhance skills, and connect with expert instructors. Start your journey to success with personalized learning experiences.
          </p>
%
          <button ref={buttonRef} className='absolute bg-[#171417] sm:w-[25vw] sm:h-[7vh] z-30 sm:top-[84%] top-[81%] md:w-[12rem] w-[6rem] md:h-[4rem] h-[2rem] rounded-full border-white border-2 text-[#b3dc89] sm:text-base text-xs' style={{ boxShadow: "3px 2px 20px #f4ac6a" }}>
            Let's Start
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
