import Axios from "axios"
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constant/SettingSystem"



export const cyberbugsService = {
     signinCyberBugs: (userLogin) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Users/signin`,
               method: 'POST',
               data: userLogin
          })
     },

     getAllProjectCategory: () => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
               method: 'GET',

          })
     },

     createProjectAuthor: (newProject) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
               method: 'POST',
               data: newProject,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     getProjectAuthor: () => {
          // console.log('local', 'Bearer ' + localStorage.getItem(TOKEN))
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
               method: 'GET',
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     updateProjectAuthor: (project) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${project.id}`,
               method: 'PUT',
               data: project,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     deleProjectAuthor: (project) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/deleteProject?projectId=${project.id}`,
               method: 'DELETE',
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     getUserAuthor: (keyWord) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Users/getUser?keyword=${keyWord}`,
               method: 'GET',
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     assignUserAuthor: (data) => {
          console.log('ccjz', data)
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/assignUserProject`,
               data: data,
               method: 'POST',
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },
     // getUserByProjectId: (id) => {
     //      return Axios({
     //           url: `${DOMAIN_CYBERBUG}/Users/getUserByProjectId?idProject=${id}`,
     //           method: 'GET',
     //           headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
     //      })
     // },
     removeUserProject: (data) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/removeUserFromProject
               `,
               data: data,
               method: 'POST',
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     getProjectDetail: (id) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/getProjectDetail?id=${id}`,
               method: 'GET',
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     // nghiep vu create task
     getAllPriorityService: () => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Priority/getAll`,
               method: 'GET',
          })
     },
     getAllTaskTypeService: () => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/TaskType/getAll`,
               method: 'GET',
          })
     },

     getAllUserService: (keyWord) => {
          if (keyWord === null) {
               return Axios({
                    url: `${DOMAIN_CYBERBUG}/Users/getUser`,
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
               })
          } else {
               return Axios({
                    url: `${DOMAIN_CYBERBUG}/Users/getUser?keyword=${keyWord}`,
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
               })
          }
     },

     createTaskService: (task) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/createTask`,
               method: 'POST',
               data: task,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     getStatusService: () => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Status/getAll`,
               method: 'GET',
               
               // headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     getUserService: (id) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Users/getUserByProjectId?idProject=${id}`,
               method: 'GET',
               // data: task,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     getTaskDetailService: (id) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/getTaskDetail?taskId=${id}`,
               method: 'GET',
               // data: task,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },

     updateStatusService: (data) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/updateStatus`,
               method: 'PUT',
               data: data,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },


     updateTaskService: (data) => {
          return Axios({
               url: `${DOMAIN_CYBERBUG}/Project/updateTask`,
               method: 'POST',
               data: data,
               headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
          })
     },


     // getProjectById:(id)=>{
     //      return Axios({
     //           url: `${DOMAIN_CYBERBUG}/Project/getProjectDetail?id=${id}`,
     //           method: 'GET',
     //           // data: task,
     //           headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
     //      })
     // }


}