import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Login from '../../components/Login/Login';
import SlideShow from '../../HOC/modal/SlideShow';
import TodolistRFC from '../Todolist/TodolistRFC';

export default function DemoHOCModal(props) {

     let LoginSlideShow = new SlideShow(Login)
     let dispatch = useDispatch();
     
     return (
          <div>
               <button onClick={()=>{
                     dispatch({
                         type:'GET_MODAL',
                         Component: <Login/>
                    })
               }} data-bs-toggle="modal" data-bs-target="#modalId" type="button" className="btn btn-primary btn-lg" >
                    login
               </button>

               <button onClick={()=>{
                    dispatch({
                         type:'GET_MODAL',
                         Component: <TodolistRFC/>
                    })
               }} type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalId">
                    to do list
               </button>

               {LoginSlideShow}
          </div>
     )
}
