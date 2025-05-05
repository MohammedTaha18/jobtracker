import React from 'react';
import { Link } from 'react-router-dom';
import { asyncLogout } from '../features/auth/authSlice';
import { islogged ,error} from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Offcanvas } from 'bootstrap';

const Sidebar = () => {

  const dispatch = useDispatch()
  const isLogged = useSelector(islogged)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(asyncLogout())
    const sidebarElement = document.getElementById('sidebar');
    const bsOffcanvas = Offcanvas.getInstance(sidebarElement) || new bootstrap.Offcanvas(sidebarElement);
    bsOffcanvas.hide();
  } 

  return (
    <div className="offcanvas offcanvas-start bg-light" tabIndex="-1" id="sidebar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addjob">Add Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alljobs">All Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stats">Stats</Link>
          </li>
          {
            isLogged ? (
              <li className="nav-item">
            <button onClick={handleLogout}>Logout</button>
            </li>
            ):(
              <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
              </li>
            )
          }
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
