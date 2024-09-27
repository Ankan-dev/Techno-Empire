import { createSlice } from "@reduxjs/toolkit";


const initialState={
    teacher:null
}

export const teacherSlice= createSlice({
    name:'teachers',
    initialState,
    reducers:{
        addTeachers:(state,action)=>{
           state.teacher=action.payload
        },
        removeTeachers:(state)=>{
            state.teacher=null
        }
    }
})

export const {addTeachers,removeTeachers}=teacherSlice.actions
export default teacherSlice.reducer