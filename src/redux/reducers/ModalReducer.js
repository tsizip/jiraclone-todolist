import Login from "../../components/Login/Login"
import ToDoListRedux from "../../pages/Todolist/ToDoListRedux"
const initialState = {
     Component: ''
}

const ModalReducer = (state = initialState, action) => {
     switch (action.type) {

          case 'GET_MODAL':
               // let newState = {...state}
               // newState.Component = action.Component
               // state = newState
               // console.log(state.Component)
               state.Component = action.Component
               return { ...state}

          default:
               return {...state}
     }
}

export default ModalReducer
