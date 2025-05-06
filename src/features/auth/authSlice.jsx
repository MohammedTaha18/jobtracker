import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('login')).isLoggedIn || false,
    user: {
        email: JSON.parse(localStorage.getItem('login')).user?.email || '',
        name: JSON.parse(localStorage.getItem('login')).user?.name || ''
    },
    loading: false,
    error: null
}

export const MockAPI = async ({ email, name }) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (email === 'a@example.com') {
                rej(new Error('This Email is Not authentic'))
            } else {
                res({ name, email })
            }
        }, 3000);
    })
}

export const asyncLogin = createAsyncThunk(
    'auth/asyncLogin',
    async ({ email, name }, { rejectWithValue }) => {
        try {
            const user = await MockAPI({ email, name })
            return user
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const asyncLogout = createAsyncThunk(
    'auth/logout',
    async () => {
        return true
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            localStorage.setItem('login', JSON.stringify(true))
            const { name, email } = action.payload
            state.user = { name, email }
        },
        logout: (state) => {
            state.isLoggedIn = false
            localStorage.setItem('login', JSON.stringify(false))
            state.user['email'] = ''
            state.user['name'] = ''
        },
        changeValues: (state, action) => {
            const { field, value } = action.payload
            state.user[field] = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(asyncLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.loading = false
                const { email, name } = action.payload
                state.user = { name, email }
                localStorage.setItem('login', JSON.stringify({
                    isLoggedIn: true,
                    user: { name, email }
                }))
            })
            .addCase(asyncLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Error authenticating'
                state.user.email = ''
                state.user.name = ''
                toast.error(action.payload || 'Error authenticating', { autoClose: 1000 });
            })
            .addCase(asyncLogout.fulfilled,(state)=>{
                state.loading = false
                state.error = null
                state.user.email = ''
                state.user.name = ''
                state.isLoggedIn = false
                localStorage.setItem('login',JSON.stringify({
                  isLoggedIn: false,
                  user: { name: '', email: '' }
                }))
                toast.success("Logged out successfully!", { autoClose: 1000 });
              })
    }
})
export const userData = (state) => state.auth.user;
export const islogged = (state) => state.auth.isLoggedIn
export const error = (state) => state.auth.error
export const Loading = (state) => state.auth.loading
export const { login, logout, changeValues } = authSlice.actions
export default authSlice.reducer