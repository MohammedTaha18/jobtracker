import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from '../features/jobs/jobsSlice'
import authReducer from '../features/auth/authSlice'
import filterReducer from '../features/jobs/filteredSlice'

export const store = configureStore({
    reducer : {
    auth:authReducer,
    jobs:jobsReducer,
    filter:filterReducer
}
})