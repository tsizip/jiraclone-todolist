import Axios from "axios"
import { DELETE_TASK_API, GET_TASK_API } from "../constants/ToDoListConst"

export const getTaskListApi = () => {
     // sử dụng async await
     return async dispatch => {
          try{
               let { status, data } = await Axios({
                    url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                    method: "GET"
               })
     
               if (status === 200) {
                    dispatch({
                         type: GET_TASK_API,
                         taskList: data
                    })
               }
          } catch (err){
               console.log('err', err.message)
          }

         
     }
}

export const deleteTaskListApi = (value) => {
     return dispatch => {
          let promise = Axios({
               url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${value.taskName}`,
               method: 'DELETE',
          })

          promise.then(result => {
               
               dispatch(getTaskListApi())

          })

          promise.catch(err => {
               alert('delete fail!')
          })
     }
}

export const addTaskApi = (taskName) => {
     return async dispatch => {
          if (taskName !== '') {
               try {
                    let {data,status} = await Axios({
                         url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                         method: 'POST',
                         data: { taskName: taskName }
                    })
                    // console.log(promise)
                    if(status === 200){

                         dispatch(getTaskListApi())
                    }
               } catch (err){
                    console.log(err.response.data)
               }

          }
     }
}