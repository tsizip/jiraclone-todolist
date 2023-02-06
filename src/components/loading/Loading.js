import React from 'react'
import style from './Loading.module.css'


export default function Loading() {
     
     // console.log('peding', pending)
     return (
          <div className={style.bgLoading}>
               <img src={require('../../assets/imgLoading/loading.gif')}></img>
          </div>
     )
}
