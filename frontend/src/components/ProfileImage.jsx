import React, {useRef} from 'react'
import { IoMdAdd } from "react-icons/io";


const profile = () => {

    const upload = useRef();

    const uploadImage = (e) => {
        e.preventDefault();
        if (upload.current) {
            upload.current.click()
        }
    }

    return (
        <div className='w-[10rem] h-[10rem]  mx-auto rounded-full border-solid border-2 border-white relative' style={{boxShadow: "-1px 1px 70px #60a5fa"}}>
            <button className='w-[30px] h-[30px] absolute bottom-0 right-5 rounded-full bg-white border-solid border-2 border-black' onClick={uploadImage}><IoMdAdd className='w-full h-full' />
            </button>
            <input ref={upload} type='file' accept='image' className='hidden' />
        </div>
    )
}

export default profile