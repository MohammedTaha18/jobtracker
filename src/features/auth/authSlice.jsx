import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false, 
    user:{
        name:'',
        email:''
    }
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action) => {
            state.isLoggedIn = true
            const {name,email} = action.payload
            state.user = {name,email}
            console.log(state.user)
        },
        logout:(state)=>{
            state.isLoggedIn = false
            state.user['email']=''
            state.user['name'] =''
        },
        changeValues:(state,action)=>{
            const {field,value} = action.payload
            state.user[field]=value 
        }
    }
})
export const userData = (state) => state.auth.user;
export const islogged = (state) => state.auth.isLoggedIn
export const {login,logout,changeValues} = authSlice.actions
export default authSlice.reducer