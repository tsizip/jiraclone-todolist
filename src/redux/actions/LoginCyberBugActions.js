// import { useNavigate } from "react-router-dom"
import { CREATE_PROJECT_AUTHOR, GET_ALL_PROJECT_CATE, USER_SIGNIN_API } from "../constants/LoginCyberBugConst"


export const singinCyberBugsAction = (email, password)=>{
   
     return {
          type: USER_SIGNIN_API,
          userLogin:{
               email: email,
               password: password
          }

     }
}

export const getAllProjectCategoryAction = ()=>{
     return {
          type: GET_ALL_PROJECT_CATE
     }
}

export const createProjectAuthorAction = (value)=>{
     return {
          type: CREATE_PROJECT_AUTHOR,
          newProject: value
     }
}