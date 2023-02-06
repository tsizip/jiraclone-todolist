import React from 'react'
import {useParams, useLocation} from 'react-router-dom'

export default function Pnf(props) {
  let {id} = useParams();
  let location = useLocation();
  console.log(location)
  return (
    <div>
     page not found {location.search} ?
    </div>
  )
}
