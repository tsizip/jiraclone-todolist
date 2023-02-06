import Axios from "axios"
import { DOMAIN } from "../util/constant/SettingSystem";

export class ToDoListService {
     constructor(){

     }

     getTaskApi = () => {
          return Axios({
               url: `${DOMAIN}/ToDoList/GetAllTask`,
               method: "GET"
          })
     }

     delTaskApiSer = (taskName) => {
          return Axios({
               url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
               method: 'DELETE',
          })
     }

     addTaskApiSer = (taskName)=>{
          return Axios({
               url: `${DOMAIN}/ToDoList/AddTask`,
               method: 'POST',
               data: { taskName:taskName }
          })
     }

     putTaskApiSer = (taskName)=>{
          return Axios({
               url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
               method: 'PUT'
          })
     }

     rejectTaskApiSer = (taskName)=>{
          return Axios({
               url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
               method: 'PUT'
          })
     }
}

export const toDoListService = new ToDoListService();

