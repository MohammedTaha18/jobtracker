import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const savedJobs = JSON.parse(localStorage.getItem('jobs')) || []

const initialState = {
    jobs: savedJobs,
    form: {
        position: '',
        company: '',
        jobLocation: '',
        jobType: 'fulltime',
        status: 'pending',
    },
    jobTypes:["fulltime","parttime","remote","internship"],
    jobStatus:["pending","interview","declined"],
    charType:'perStatus'
}
const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        postJob: (state) => {
            const newJob = { ...state.form, date: new Date().toISOString() ,id:uuidv4()}
            state.jobs.push(newJob)
            localStorage.setItem('jobs', JSON.stringify(state.jobs))
        },
        setFormField: (state, action) => {
            const { field, value } = action.payload
            state.form[field] = value
        },
        clearForm: (state) => {
            state.form = {
                position: '',
                company: '',
                jobLocation: '',
                jobType: 'fulltime',
                status: 'pending',
            }
        },
        updateJob: (state, action) => {
            const jobId = action.payload.id;
            const jobIndex = state.jobs.findIndex((job)=>job.id===jobId)
            if(jobIndex!==-1){
                state.jobs[jobIndex] = { ...state.jobs[jobIndex],...state.form };
                localStorage.setItem('jobs', JSON.stringify(state.jobs));
            }

        },
        deleteJob:(state,action)=>{
            const {id} = action.payload
            state.jobs = state.jobs.filter((job)=>job.id!==id)
            localStorage.setItem('jobs',JSON.stringify(state.jobs))
        },
        changeChartType:(state,action) => {
            const {value} = action.payload 
            state.charType = value
        }
    }
})
export const allJobs = (state) => state.jobs.jobs
export const formValues = (state) => state.jobs.form
export const jobTypes = (state) => state.jobs.jobTypes
export const jobStatus = (state) =>state.jobs.jobStatus
export const chartType = (state) => state.jobs.charType

export const { postJob, clearForm, setFormField, updateJob,deleteJob,changeChartType} = jobsSlice.actions
export default jobsSlice.reducer