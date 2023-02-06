import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'

export default function Profile() {
     const login = localStorage.getItem('userLogin')
     const navi = useNavigate();
     return <div>profile</div> 
     
     

}
