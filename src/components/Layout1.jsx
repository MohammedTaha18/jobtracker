import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout1 = () => {
  return (
    <div>
       <Navbar />
       <Sidebar />
       <Outlet />
    </div>
  )
}

export default Layout1
