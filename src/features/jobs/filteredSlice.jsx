import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem('jobView')) || {}

const initialState = {
  filters: {
    status: saved.filters?.status   || 'all',
    jobType: saved.filters?.jobType || 'all',
    sort: saved.filters?.sort       || 'newtoold',
    search: saved.filters?.search   || ''
  },
  page: saved.page || 1
}

export const filtersSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setfilters : (state,action) => {
            const {field,value} = action.payload
            state.filters[field] = value
            localStorage.setItem('jobView', JSON.stringify({
                filters: state.filters,
                page: state.page
              }))
        },
        setPage:(state,action) => {
            const {page} = action.payload
            state.page = page
            localStorage.setItem('jobView', JSON.stringify({
                filters: state.filters,
                page: state.page
              }))
        }
    }
}) 

export const filters = (state) => state.filter.filters
export const page = (state) => state.filter.page
export const {setfilters,setPage} = filtersSlice.actions
export default filtersSlice.reducer