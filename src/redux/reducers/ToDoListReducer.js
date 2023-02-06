import { ADD_TASK_API, ADD_TASK_API_ACTION, DELETE_TASK_API, DEL_TASK_API_ACTION, GET_TASK_API, PUT_TASK, PUT_TASK_API_ACTION } from "../constants/ToDoListConst"

const initialState = {
     taskList: [],
     values: {
          taskName: ''
     },
     errors: {
          taskName: ''
     },
     valuesReset: {
          taskName: ''
     }
}


export default (state = initialState, action) => {
     switch (action.type) {
          case GET_TASK_API:
               console.log('get task complete!')
               state.taskList = action.taskList
               return { ...state }
               break;

          case ADD_TASK_API_ACTION:
               // alert('ok')
               // state.values.taskName = '';
               // console.log(state.values.taskName)
               return { ...state }
          case DEL_TASK_API_ACTION:
               // alert('ok')
               state.values.taskName = '';
               // console.log(state.values.taskName)
               return { ...state }
          // case PUT_TASK_API_ACTION:
          //      console.log('aciton reducer', action.data)
          //      // alert('ok')
          //      return { ...state }
          default: return { ...state }; break;

     }
}
