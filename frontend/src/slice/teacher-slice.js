import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./user-slice";

const initialState={
    teacher:[]
}

export const teacherSlice= createSlice({
    name:'teachers',
    initialState,
    reducers:{
        addTeachers:(state,action)=>{
            if(state.teacher.length===0){
                state.teacher.push(action.payload)
            }
        },
        removeTeachers:(state)=>{
            state.teacher=[]
        }
    }
})

export const {addTeachers,removeTeachers}=teacherSlice.actions
export default teacherSlice.reducer