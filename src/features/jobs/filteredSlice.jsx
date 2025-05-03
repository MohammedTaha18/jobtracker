import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters:{
    status:'all',
    jobType:'all',
    sort:'newtoold',
    search:''
    },
    page:1
}

export const filtersSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setfilters : (state,action) => {
            const {field,value} = action.payload
            state.filters[field] = value
        },
        setPage:(state,action) => {
            const {page} = action.payload
            state.page = page
        }
    }
}) 

export const filters = (state) => state.filter.filters
export const page = (state) => state.filter.page
export const {setfilters,setPage} = filtersSlice.actions
export default filtersSlice.reducer