import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Netflix Logo" />
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fw-bold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/tv-shows">TV Shows</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">Movies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">Recently Added</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">My List</a>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            <div className="search-wrapper">
              <SearchBar />
            </div>
            <div id="kids" className="fw-bold">KIDS</div>
            <i className="bi bi-bell icons" aria-label="Notifiche"></i>
            <i className="bi bi-person-circle icons" aria-label="Profilo"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}