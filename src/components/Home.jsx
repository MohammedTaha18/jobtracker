import React from 'react'
import { useSelector } from 'react-redux'
import { Loading, error } from '../features/auth/authSlice'
import { Audio } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const isLoading = useSelector(Loading)
  const isError = useSelector(error)

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="black"
          ariaLabel="loading"
        />
      </div>
    )
  }

  if (isError) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h1>Welcome to Job Tracking Application</h1>
    </>
  )
}

export default Home