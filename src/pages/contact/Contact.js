import React from 'react'
import { useSelector } from 'react-redux'

export default function Contact(props) {
     let userLogin = useSelector(state=>state.UserLoginCyberBugReudcer.userLogin)
     console.log('userLogin', userLogin)
     return (
          <div>
               userLogin:
               <p>{userLogin?.email}</p>
               <img src={userLogin?.avatar}/>
          </div>
     )
}
