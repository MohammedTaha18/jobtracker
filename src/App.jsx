import { Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import AddJobForm from './features/jobs/AddJobForm'
import JobsList from './features/jobs/Alljobs'
import EditJobForm from './features/jobs/EditJobForm'
import Login from './features/auth/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Stats from './features/jobs/Stats'
import Layout1 from './components/Layout1'
import Error from './pages/error'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout1/>} >
        <Route index element={<Home/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path = 'alljobs' element={<JobsList/>} />
        <Route path ='addjob' element={<AddJobForm/>} />
        <Route path='editJob/:id' element={<EditJobForm/>} />
        <Route path="stats" element={<Stats/>} />
        </Route>
        <Route path='login' element={<Login/>}/>
        <Route path="*" element={<Error/>} />
      </Route>

    </Routes>
  )
}

export default App
