import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Home(props) {
     let navi = useNavigate();
     return (
          <div>
               trang chu
               <button onClick={()=>{
                    navi('/login')
               }} className='btn btn-danger'>chuyen trang login</button>
          </div>
     )
}
