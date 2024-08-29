import React, { useRef } from 'react'
import { IoMdAdd } from "react-icons/io";


const Profile = () => {

    const upload = useRef();

    const uploadImage = (e) => {
        e.preventDefault();
        if (upload.current) {
            upload.current.click()
        }
    }

    return (
        <div className='w-full h-[100vh] bg-yellow-300'>
            <div className='hidden'></div>
            <div className='w-full h-full pt-7'>
                <div className='w-[10rem] h-[10rem]  mx-auto rounded-full border-solid border-2 border-black relative'>
                    <button className='w-[30px] h-[30px] absolute bottom-0 right-5 rounded-full bg-white border-solid border-2 border-black' onClick={uploadImage}><IoMdAdd className='w-full h-full' />
                    </button>
                </div>
                <form className='w-full h-[70%] bg-red-400 flex flex-col items-center gap-5'>
                    <input/>
                    <input/>
                    <div><input/><button></button></div>
                    <div><input/><button></button></div>
                    <div><input/><button></button></div>
                    <button>save</button>
                </form>
            </div>
            <input ref={upload} type='file' accept='image' className='hidden' />
        </div>
    )
}

export default Profile