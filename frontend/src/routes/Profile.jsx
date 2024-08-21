import React from 'react'
import { MdAdd } from "react-icons/md";


const Profile = () => {
    return (
        <div className='w-full h-[100vh] bg-red-500 md:flex'>
            <div className='hidden'></div>
            <div className='w-full h-full bg-yellow-300 pt-7'>
                <div className='w-[50vw] h-[20vh] bg-black m-auto relative flex items-center justify-center'>
                    <div className='w-[60%] h-[90%] bg-white rounded-full absolute'></div>
                    <button className='w-7 h-7 rounded-full bg-red-500 absolute right-12 bottom-4 flex items-center justify-center'>
                        <MdAdd />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile