import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slice/user-slice'
import teacherSlice from '../slice/teacher-slice'

export const store = configureStore({
  reducer: {user:userSlice,teacher:teacherSlice},
})