import React, { useState } from 'react'
import TeacherNav from './components/TeacherNav'
import { Outlet } from 'react-router-dom'

const TeacherLayout = () => {

  const [openLogin,setOpenLogin]=useState(false)

  return (
    <>
    <TeacherNav openLogin={openLogin} setOpenLogin={setOpenLogin}/>
    <Outlet context={{openLogin,setOpenLogin}}/>
    </>
  )
}

export default TeacherLayout