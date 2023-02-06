import { GET_ALL_PROJECT_CATE_ACTION } from "../constants/LoginCyberBugConst"

const initialState = {
     projectCategory: [
          // {
          //      id:1,
          //      name:'project1'
          // },
          // {
          //      id:2,
          //      name:'project2'
          // }
     ]
}

const ProjectCategoryReducer = (state = initialState, action) => {
     switch (action.type) {

          case GET_ALL_PROJECT_CATE_ACTION: {
               state.projectCategory = action.projectCate
               return {...state}
          }

          default:
               return { ...state }
     }
}

export default ProjectCategoryReducer
