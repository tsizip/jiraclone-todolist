import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskApi, deleteTaskListApi, getTaskListApi } from '../../redux/actions/ToDoListAction'
import { DELETE_TASK_API, GET_TASK_API } from '../../redux/constants/ToDoListConst'

export default function ToDoListRedux() {
     const refInput = useRef(null)
     const { taskList } = useSelector(state => state.ToDoListReducer)
     const dispatch = useDispatch();
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
          dispatch(getTaskListApi())
     }

     useEffect(() => {

          getData()
          return () => {

          }
     }, [])
     const handleDelete = (value) => {
          setState({
               ...state,
               values: {
                    taskName: ''
               },
               errors: {
                    taskName: ''
               }
          })
          dispatch(deleteTaskListApi(value))
          
     }
     const handlePut = (taskName) => {
          let promise = Axios({
               url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
               method: 'PUT'
          })

          promise.then(respon => {
               getData()
          })
     }
     const handleReject = (taskName) => {
          let promise = Axios({
               url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
               method: 'PUT'
          })

          promise.then(respon => {
               getData()
          })
     }
     const handleChange = (e) => {
          let { value, name } = e.target;

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
          // e.preventDefault();
          e.preventDefault();
          dispatch(addTaskApi(state.values.taskName))
          refInput.current.value = ''
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
               // return taskList.filter(value=>!value.status).map((value, index)=>{
               //      return <li></li>...
               // })
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
               {/* <button onClick={getData}>get data</button> */}
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
