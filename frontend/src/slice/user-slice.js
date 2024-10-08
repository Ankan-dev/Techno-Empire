import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:[]
}

export const userSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    addUser:(state,action)=>{
      //console.log(action.payload)
      if(state.user.length===0){
        state.user.push(action.payload)
      }
    },
    removeUser:(state)=>{
      state.user=[]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser,removeUser } = userSlice.actions

export default userSlice.reducer