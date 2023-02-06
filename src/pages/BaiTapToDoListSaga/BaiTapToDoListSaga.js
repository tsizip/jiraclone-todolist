import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import './TodolistStyle.css'
import Axios from 'axios'
import { getTaskListApi } from '../../redux/actions/ToDoListAction'
import { GET_TASK_API_ACTION, ADD_TASK_API_ACTION, GET_TASK_API, DEL_TASK_API_ACTION, PUT_TASK_API_ACTION, PUT_TASK, REJECT_TASK_API_ACTION } from '../../redux/constants/ToDoListConst'


export default function BaiTapToDoListSaga(props) {
     const refInput = useRef(null)
     let dispatch = useDispatch();
     let { taskList } = useSelector(state => state.ToDoListReducer)
     // console.log('task', taskList)
     const [state, setState] = useState({
          taskList: [],
          values: {
               taskName: ''
          },
          errors: {
               taskName: ''
          }
     })

     const getData = () => {
          dispatch({
               type: GET_TASK_API_ACTION
          })
     }

     useLayoutEffect(() => {
          // 


     })

     useEffect(() => {
          getData()
          // refInput.current.value = ''
          // console.log(state.values.taskName)
          return () => {

          }
     }, [])
     const handleDelete = (value) => {
          dispatch({
               type: DEL_TASK_API_ACTION,
               value: value,
               // taskList: taskList
          })
          // refInput.current.value = ''
          

     }
     const handlePut = (taskName) => {
          dispatch({
               type:PUT_TASK_API_ACTION,
               data: taskName
          })
     }
     const handleReject = (taskName) => {
          dispatch({
               type:REJECT_TASK_API_ACTION,
               data:taskName
          })
     }
     const handleChange = (e) => {
          let { value, name } = e.target;
          // console.log(name, value)
          let newValues = { ...state.values, [name]: value }
          // newValues = { ...newValues, [name]: value }
          let newErrors = { ...state.errors }
          // console.log('test', newErrors.taskName)
          let regexString = /^[a-z A-Z]+$/;

          if (!regexString.test(value) || value.trim() === '') {
               newErrors.taskName = value + 'is invalid!';
          } else {
               newErrors.taskName = '';
          }


          // newErrors = { ...newErrors, taskName: value }
          setState({
               ...state,
               values: newValues,
               errors: newErrors
          })

     }
     const handleSubmit = (e) => {
          // changeInput('da thay doi') 
          e.preventDefault();

          if(state.values.taskName !== ''){
               dispatch({
                    type: ADD_TASK_API_ACTION,
                    taskName: state.values.taskName
               })
          }

          refInput.current.value = ''
          state.values.taskName = ''
          // dispatch({
          //      type: GET_TASK_API_ACTION
          // })


     }
     const renderTaskFalse = () => {
          if (taskList.find(value => value.status === false)) {
               return taskList.map((value, index) => {
                    if (!value.status) {
                         return <li key={index}>
                              <span>{value.taskName}</span>
                              <div className="buttons">
                                   <button className="remove" onClick={() => { handleDelete(value) }}>
                                        <i className="fa fa-trash-alt" />
                                   </button>
                                   <button type='button' onClick={() => { handlePut(value.taskName) }} className="complete">
                                        <i className="far fa-check-circle" />
                                        <i className="fas fa-check-circle" />
                                   </button>
                              </div>
                         </li>

                    }
               })
          }
     }
     const renderTaskTrue = () => {

          if (taskList.find(value => value.status === true)) {
               return taskList.map((value, index) => {
                    if (value.status) {
                         return <li key={index}>
                              <span>{value.taskName}</span>
                              <div className="buttons">
                                   <button className="remove" onClick={() => { handleDelete(value) }}>
                                        <i className="fa fa-trash-alt" />
                                   </button>
                                   <button type='button' onClick={() => { handleReject(value.taskName) }} className="complete">
                                        <i className="far fa-undo" />
                                        <i className="fas fa-undo" />
                                   </button>
                              </div>
                         </li>
                    }
               })
          }

     }
     return (
          <form onSubmit={handleSubmit} className="card">
               <button type='button' onClick={() => {
                    dispatch({
                         type: GET_TASK_API_ACTION
                    })
               }}>get data</button>
               <div className="card__header">
                    {/* <img src="./img/X2oObC4.png" /> */}
                    <img src={require('./bg.png')} />
               </div>
               {/* <h2>hello!</h2> */}
               <div className="card__body">
                    <div className="card__content">
                         <div className="card__title">
                              <h2>My Tasks</h2>
                              <p>September 9,2020</p>
                         </div>
                         <div className="card__add">
                              <input ref={refInput} onChange={handleChange} id="newTask" name='taskName' type="text" placeholder="Enter an activity..." />
                              <button id="addItem" onClick={handleSubmit}>
                                   <i className="fa fa-plus" />
                              </button>
                         </div>
                         <div className="card__todo">
                              {/* Uncompleted tasks */}
                              <ul style={{ paddingLeft: 0 }} className="todo" id="todo">
                                   {renderTaskFalse()}
                              </ul>
                              {/* Completed tasks */}
                              <ul className="todo" id="completed">
                                   {renderTaskTrue()}
                              </ul>
                         </div>
                    </div>
               </div>
          </form>
     )
}
