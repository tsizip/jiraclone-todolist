// import { useNavigate } from "react-router-dom"
import { call, delay, put, takeLatest, select } from "redux-saga/effects"
import { cyberbugsService } from "../../../services/CyberBugService"
import { TOKEN, USER_LOGIN } from "../../../util/constant/SettingSystem"
import { GET_ALL_PROJECT_CATE, USER_SIGNIN_API } from "../../constants/LoginCyberBugConst"
import { ACTIVE_LOADING, HIDE_LOADING } from "../../constants/ToDoListConst"




// quan ly cac aciton saga

// singin account
function *singinSaga(action){

     
     // yield console.log('action', action)
     yield put({
          type: ACTIVE_LOADING
     })
     // yield delay(900)
     try {
          // su dung call de sau nay xu li them nhieu logic roi moi tra ve promise
          let {data, status} = yield call(()=>{return cyberbugsService.signinCyberBugs(action.userLogin)})
          // console.log(data)
          localStorage.setItem(TOKEN, data.content.accessToken)
          localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))
          yield put({
               type:'RE_LOGIN',
               userLogin: data.content
          })
          // lấy history từ CyberBugReducer bằng phương thức select(), thay thế cho dispatch
          let his = yield select(state=>state.CyberBugReducer.history)
          yield his('/projectmanagement')

     } catch(err){
          console.log(err.response.data.message)
     }
     // yield delay(900)
     yield put({
          type: HIDE_LOADING
     })
}

export function *theoDoiSingin(){
     yield takeLatest(USER_SIGNIN_API, singinSaga)
}



