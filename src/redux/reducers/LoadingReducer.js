import { ACTIVE_LOADING, ADD_TASK_API_ACTION, HIDE_LOADING } from "../constants/ToDoListConst";

const initialState = {
     isActive: false
}

export default (state = initialState, action) => {
     switch (action.type) {

          case ACTIVE_LOADING:
               state.isActive = true;
               return { ...state }

          case HIDE_LOADING:
               state.isActive = false;

               return { ...state }
          
          default:
               return state
     }
}
