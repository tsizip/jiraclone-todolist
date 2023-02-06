import React from 'react'
import { useParams, useLocation } from "react-router-dom"

export default function Detail(props) {
     const location = useLocation();
     let {id} = useParams();
    console.log(id)
     return (
          <div>
               detail: {location.pathname}
               params: {id}
          </div>
     )
}
