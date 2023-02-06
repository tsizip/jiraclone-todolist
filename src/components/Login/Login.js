import { createBrowserHistory } from '@remix-run/router';
import React, { useState } from 'react'
import { Routes, Route, Outlet, Link, BrowserRouter, useNavigate, Navigate } from "react-router-dom";


// import {u} from 'react-router-dom'
export default function Login(props) {
     const [state, setState] = useState({
          userName:'',
          passWord:''
     })
   
     const history = useNavigate();
     const handleChange = (e)=>{
          let {name,value} = e.target
          setState({
               ...state,
               [name]: value
          })   
     }
     // console.log(state)
     
     const handleSubmit = (e)=>{
          e.preventDefault();
          if(state.userName === 'tri' && state.passWord==='tri'){
               localStorage.setItem('userLogin', JSON.stringify(state))
               history('/profile');
               console.log(history)
               
          } else {
               alert('login fail!')
               return;
          }
     }

     return (
          <div className='container'>
               <h3>Login form</h3>
               <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                         <label >UseName:</label>
                         <input className='form-control' name='userName' onChange={handleChange} ></input>
                    </div>
                    <div className='form-group'>
                         <label >PassWord:</label>
                         <input className='form-control' name='passWord' onChange={handleChange} ></input>
                    </div>
                    <div className='form-group'>
                         <button   className='btn btn-success'>Login</button>
                    </div>
               </form>

          </div>
     )
}
