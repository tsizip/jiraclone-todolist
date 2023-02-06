import { json } from "react-router-dom"
import { USER_LOGIN } from "../../util/constant/SettingSystem"

let usLogin = {}

if (localStorage.getItem(USER_LOGIN)) {
     usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
     userLogin: usLogin,
     searchUser: ''
}

const UserLoginCyberBugReudcer = (state = initialState, action) => {
     switch (action.type) {
          case 'RE_LOGIN': {
               state.userLogin = action.userLogin
               return { ...state }
          }

          case 'SEARCH_USER':
               // console.log('srew')
               state.searchUser = action.data
               console.log(state.searchUser)
               return { ...state }
          // case 'GET_USER_BY_PROJECT_ID':

          //      return { ...state }
          default:
               return { ...state }
     }
}

export default UserLoginCyberBugReudcer
