import React, { useEffect } from 'react'
import {updateJob,setFormField, formValues} from './jobsSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { allJobs,clearForm } from './jobsSlice'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from "react-toastify";

const EditJobForm = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jobs = useSelector(allJobs)
    const job = jobs.find((job)=>job.id===id)
    const {position,company,jobLocation,jobType,status} = useSelector(formValues)
    const [isInitialized, setisInitialized] = useState(false)

      const handleChange = (field) => (e) => {
        dispatch(setFormField({field,value:e.target.value}))
      }
      useEffect(()=>{
        if(job && !isInitialized){
            Object.entries(job).forEach(([field,value])=>{
                dispatch(setFormField({field,value}))
            })
            setisInitialized(true)
        }
      },[job,dispatch,isInitialized])

      const savePost = (e) => {
        e.preventDefault()
        try{
        dispatch(updateJob({id}))
        dispatch(clearForm())
        toast.success("Job Edited Successfully!",{autoClose:1000})
        navigate('/alljobs')
        }catch(err){
            console.log(err)
        }
      }

  return (
    <div className="container mt-4">
    <h3 className="mb-4">Update Job</h3>
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="position" className="form-label">Position</label>
        <input
          type="text"
          id="position"
          className="form-control"
          value={position}
          required
          onChange={handleChange('position')}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="company" className="form-label">Company</label>
        <input
          type="text"
          id="company"
          className="form-control"
          value={company}
          required
          onChange={handleChange('company')}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="location" className="form-label">Job Location</label>
        <input
          type="text"
          id="location"
          className="form-control"
          value={jobLocation}
          required
          onChange={handleChange('jobLocation')}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="jobtype" className="form-label">Job Type</label>
        <select
          id="jobtype"
          className="form-select"
          value={jobType}
          onChange={handleChange('jobType')}
        >
          <option value="fulltime">Full-Time</option>
          <option value="parttime">Part-Time</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div className="col-md-6">
        <label htmlFor="jobstatus" className="form-label">Status</label>
        <select id="jobstatus" className="form-select" value={status} onChange={handleChange('status')}>
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary" onClick={(e)=>savePost(e)}>Submit</button>
      </div>
    </form>
  </div>
  )
}

export default EditJobForm
