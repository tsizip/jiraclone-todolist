import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function NavBar() {
     let activeStyle = {
          color: 'red'
     }
     return (
          <div>
               <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <div className="container">
                         {/* <a className="navbar-brand " href="#">Navbar</a> */}
                         <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon" />
                         </button>
                         <div className="collapse navbar-collapse" id="collapsibleNavId">
                              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                   {/* <li className="nav-item">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link active" to="/home" aria-current="page">Home <span className="visually-hidden">(current)</span></NavLink>
                                   </li>
                                   <li className="nav-item">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link" to="/about">About</NavLink>
                                   </li>
                                   <li className="nav-item dropdown">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link" to="/contact">Contact</NavLink>
                                   </li>
                                   
                                   {/* <li className="nav-item dropdown">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link" to="/demohocmodal">HOC Demo</NavLink>
                                   </li>
                                   <li className="nav-item dropdown">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link" to="/dragdrop">Drag Drop Demo</NavLink>
                                   </li> */}
                                   <li className="nav-item dropdown">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link" to="/login">Login</NavLink>
                                   </li> 
                                   <li className="nav-item dropdown">
                                        <NavLink style={({ isActive }) => { return isActive ? activeStyle : undefined }} className="nav-link" to="/dragdroplib">Drag Drop Demo Lib</NavLink>
                                   </li>

                                   <li className="nav-item dropdown">
                                   <NavLink style={({ isActive }) => { return isActive ? { color: 'black' } : undefined }} className="nav-link dropdown-item" to="/todolistredux">Todolist Redux</NavLink>
                                   </li>

                                   {/* <li className="nav-item dropdown">
                                        <div>
                                             <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                  Dropdown button
                                             </button>
                                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                  <li> <NavLink style={({ isActive }) => { return isActive ? { color: 'black' } : undefined }} className="nav-link dropdown-item" to="/todolistrcc">Todolist RCC</NavLink></li>
                                                  <li> <NavLink style={({ isActive }) => { return isActive ? { color: 'black' } : undefined }} className="nav-link dropdown-item" to="/todolistredux">Todolist Redux</NavLink></li>
                                                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                                             </ul>
                                        </div>



                                  
                                   </li> */}
                              </ul>

                         </div>
                    </div>
               </nav>
          </div>
     )
}



