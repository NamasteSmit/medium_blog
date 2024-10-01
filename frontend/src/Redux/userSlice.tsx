import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState : {
        items : ""
    },
    reducers : {
        setUser : (state , action)=>{
            state.items = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer