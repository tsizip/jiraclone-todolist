import React, { Component } from 'react'

import './TodolistStyle.css'
import Axios from 'axios'

export default class Todolist extends Component {
     // hookUseRef = useRef('')
     // refContainer = useRef(null);

     state = {
          taskList: [],
          values: {
               taskName: ''
          },
          errors: {
               taskName: ''
          }
     }

     textInput = React.createRef();

     focusTextInput=()=> {
          this.textInput.current.value = ''
     }

     getData = () => {
          let promise = Axios({
               url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
               method: "GET"
          })

          // console.log('first', this.hookUseRef)

          promise.then((result) => {
               // console.log(result.data)
               // console.log('result', result.data)
               this.setState({
                    taskList: result.data

               })


          })
          promise.catch((err) => {
               console.log(err.response.data.Message)
          })
          // this.setState({
          //      values: {
          //           taskName: ''
          //      }
          // })
     }

     // inputRef = React.createRef();

     // changeInput = (name)=>{
     //      this.inputRef.current.changeInput(name)
     // }

     componentDidMount() {
          this.getData()
          this.setState({
               values: {
                    taskName: ''
               },
               errors: {
                    taskName: ''
               }
          })
          // this.focusTextInput()

     }
     // static getDerivedStateFromProps(next, prev){
     //      let newState = {...prev, values: {
     //           taskName: ''
     //      },
     //      errors: {
     //           taskName: ''
     //      }}

     //      return newState
     // }

     // checkTrue = (value) => {
     //      let index = this.state.taskList.findIndex(task => task.taskName === value.taskName)
     //      let stateUpdate = [...this.state.taskList]
     //      stateUpdate[index].status = true
     //      this.setState({
     //           taskList: stateUpdate
     //      })
     // }

     // checkFalse = (value) => {
     //      let index = this.state.taskList.findIndex(task => task.taskName === value.taskName)
     //      let stateUpdate = [...this.state.taskList]
     //      stateUpdate[index].status = false
     //      this.setState({
     //           taskList: stateUpdate
     //      })

     // }

     // handleRemove =(value)=>{
     //      let index = this.state.taskList.findIndex(task=>task.taskName === value.taskName)
     //      let stateUpdate = [...this.state.taskList]
     //      stateUpdate.splice(index, 1)
     //      this.setState({
     //           taskList: stateUpdate
     //      })
     // }

     renderTaskFalse = () => {
          if (this.state.taskList.find(value => value.status === false)) {
               return this.state.taskList.map((value, index) => {
                    if (!value.status) {
                         return <li key={index}>
                              <span>{value.taskName}</span>
                              <div className="buttons">
                                   <button className="remove" onClick={() => { this.handleDelete(value) }}>
                                        <i className="fa fa-trash-alt" />
                                   </button>
                                   <button type='button' onClick={() => { this.handlePut(value.taskName) }} className="complete">
                                        <i className="far fa-check-circle" />
                                        <i className="fas fa-check-circle" />
                                   </button>
                              </div>
                         </li>

                    }
               })
          }
     }

     renderTaskTrue = () => {

          if (this.state.taskList.find(value => value.status === true)) {
               return this.state.taskList.map((value, index) => {
                    if (value.status) {
                         return <li key={index}>
                              <span>{value.taskName}</span>
                              <div className="buttons">
                                   <button className="remove" onClick={() => { this.handleDelete(value) }}>
                                        <i className="fa fa-trash-alt" />
                                   </button>
                                   <button type='button' onClick={() => { this.handleReject(value.taskName) }} className="complete">
                                        <i className="far fa-undo" />
                                        <i className="fas fa-undo" />
                                   </button>
                              </div>
                         </li>
                    }
               })
          }

     }
     handleSubmit = (e) => {
          // this.changeInput('da thay doi') 
          e.preventDefault();
          if (this.state.values.taskName !== '') {
               let promise = Axios({
                    url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                    method: 'POST',
                    data: { taskName: this.state.values.taskName }
               })

               promise.then(result => {
                    this.setState({
                         values: {
                              taskName: ''
                         },
                         errors: {
                              taskName: ''
                         }
                    })
                    this.getData('add');
                    // console.log('focus',this.textInput);
                    this.focusTextInput()
                    
               })

               promise.catch(err => {

               })
          }
     }

     handleDelete = (value) => {
          // value.preventDefault();
          // if(this.state.values.taskName !== ''){
               this.setState({
                    values: {
                         taskName: ''
                    },
                    errors: {
                         taskName: ''
                    }
               })
               let promise = Axios({
                    url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${value.taskName}`,
                    method: 'DELETE',
               })
     
               promise.then(result => {
                    alert('delete complete!')
                    this.getData('del')
                    
               })
     
               promise.catch(err => {
                    alert('delete fail!')
               })
          // }
         
          // console.log(value)
     }

     handlePut = (taskName) => {
          let promise = Axios({
               url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
               method: 'PUT'
          })

          promise.then(respon => {
               this.getData()
          })
     }

     handleReject = (taskName) => {
          let promise = Axios({
               url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
               method: 'PUT'
          })

          promise.then(respon => {
               this.getData()
          })
     }
  

     handleChange = (e) => {
          let { value, name } = e.target;

          let newValues = { ...this.state.values, [name]: value }
          // newValues = { ...newValues, [name]: value }
          let newErrors = { ...this.state.errors }
          // console.log('test', newErrors.taskName)
          let regexString = /^[a-z A-Z]+$/;

          if (!regexString.test(value) || value.trim() === '') {
               newErrors.taskName = value + 'is invalid!';
          } else {
               newErrors.taskName = '';
          }


          // newErrors = { ...newErrors, taskName: value }
          this.setState({
               ...this.state,
               values: newValues,
               errors: newErrors
          })

     }

     

     render() {

          return (
               <form onSubmit={this.handleSubmit} >
                    <button onClick={() => { this.getData() }} className='btn btn-danger'>Get Data</button>
                    <div className="card">
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
                                        <input ref={this.textInput} name='taskName' onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />

                                        <button id="addItem" onClick={() => { this.handleSubmit() }} >
                                             <i className="fa fa-plus" />
                                        </button>

                                   </div>
                                   <p className='text text-danger'>{this.state.errors.taskName}</p>
                                   <div className="card__todo">
                                        {/* Uncompleted tasks */}
                                        <ul style={{ paddingLeft: 0 }} className="todo" id="todo">
                                             {this.renderTaskFalse()}
                                        </ul>
                                        {/* Completed tasks */}
                                        <ul className="todo" id="completed">
                                             {this.renderTaskTrue()}
                                        </ul>
                                   </div>
                              </div>
                         </div>
                    </div>
               </form>

          )
     }
}
