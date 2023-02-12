import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugService";
import { CREATE_PROJECT_AUTHOR, SET_PROJECT_MANA_ON_REDUCER } from "../../constants/LoginCyberBugConst";
import { ACTIVE_LOADING, HIDE_LOADING } from "../../constants/ToDoListConst";


function *createProjectAuthor (action){
     // yield console.log('ok')
     yield put({
          type: ACTIVE_LOADING
     })

     yield delay(500)

     try {
          let {data, status} = yield call(()=>{return cyberbugsService.createProjectAuthor(action.newProject)})

          if(status === 200){
               yield alert('Add project complete!')
          }
          // yield console.log('them thanh cong!')
          // yield console.log('data', data)
          // yield localStorage.setItem(JSON.stringify('dataProject', ))
          
          // let dataOld = yield JSON.parse(localStorage.getItem('dataProject'))
          // yield dataOld.push(data.content)
          // yield localStorage.setItem('dataProject', dataOld)
     } catch(err){
          console.log('err', err.response.data)
     }
     yield put({
          type: HIDE_LOADING
     })
}

export function * theoDoiCreateProjectAuthor(){
     yield takeLatest(CREATE_PROJECT_AUTHOR, createProjectAuthor)
}