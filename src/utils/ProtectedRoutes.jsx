import { islogged } from "../features/auth/authSlice"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

const ProtectedRoutes = () => {

    const isLoggedIn = useSelector(islogged)
    const location = useLocation()

    return (
        <div>
            {
                isLoggedIn
                        ? <Outlet/>
                        : <Navigate to="/login" replace state={{from:location}}/> 
                    }           
        </div>
    )
}

export default ProtectedRoutes
