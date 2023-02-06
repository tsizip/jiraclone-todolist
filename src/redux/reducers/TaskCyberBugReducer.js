import { actionChannel } from "redux-saga/effects"

const initialState = {
     priority: '',
     taskType: '',
     assignees: '',
     statusSaga: '',
     arrUser: ''
}

const TaskCyberBugReducer = (state = initialState, action) => {
     switch (action.type) {

          case 'GET_PRIORITY':

               return { ...state, priority: action.data }
          case 'GET_TASK_TYPE':

               return { ...state, taskType: action.data }
          case 'GET_TASK_ASSIGN':
               // console.log('dataReducer', action)
               // console.log('assi',state.assignees)
               return { ...state, assignees: action.data }
          case 'GET_STATUS_SAGA':
               // console.log('dataReducer', action)
               // console.log('assi',state.assignees)
               return { ...state, statusSaga: action.data }
          case 'GET_USER_SAGA':

               return { ...state, arrUser: action.data }
          default:
               return { ...state }
     }
}

export default TaskCyberBugReducer