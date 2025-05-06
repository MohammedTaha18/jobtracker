import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <button className="btn btn-outline-light me-2" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
        ☰
      </button>
      <a className="navbar-brand" href="#">My App</a>
    </nav>
  );
};

export default Navbar;
