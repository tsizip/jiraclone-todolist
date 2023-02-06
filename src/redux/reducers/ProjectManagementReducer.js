import { SET_PROJECT_MANA_ON_REDUCER } from "../constants/LoginCyberBugConst"

const initialState = {
     allProject: [],
     projectDetail: ''
}

const ProjectManagementReducer = (state = initialState, action) => {
     switch (action.type) {
          case SET_PROJECT_MANA_ON_REDUCER: {
               // console.log('data on reducer', action.data.content)
               state.allProject = action.data
               // console.log('state reducer', state.allProject)
               // localStorage.setItem('dataProject', JSON.stringify(state.allProject))
               return {...state}
          }
          case 'PROJECT_DETAIL':
               // console.log('detail',state.projectDetail)
               state.projectDetail = action.data
               // console.log('action', action.data)
               // console.log('stateDetail', state)
               
               return {...state, }
          default:
               return {...state}
     }
}

export default ProjectManagementReducer
