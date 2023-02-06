import { TOKEN } from "../../util/constant/SettingSystem"
import { USER_SIGNIN_API } from "../constants/LoginCyberBugConst"

const initialState = {
     history: {}
}

const CyberBugReducer = (state = initialState, action) => {
     switch (action.type) {
          case 'ADD_HIS':

               state.history = action.history
               // console.log('first, ', state)
               return { ...state }

          default:
               return state
     }
}

export default CyberBugReducer
