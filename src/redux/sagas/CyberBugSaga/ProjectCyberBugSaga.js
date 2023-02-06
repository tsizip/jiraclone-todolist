import { CloseSquareFilled } from "@ant-design/icons"
import { Axios } from "axios"
import { call, delay, put, takeLatest } from "redux-saga/effects"
import { cyberbugsService } from "../../../services/CyberBugService"
import { STATUS_CODE, TOKEN } from "../../../util/constant/SettingSystem"
import { notificationFunc } from "../../../util/NotificationCyberBugs"

import { GET_ALL_PROJECT_CATE, GET_ALL_PROJECT_CATE_ACTION, GET_ALL_PROJECT_MANA_ACTION, SET_PROJECT_MANA_ON_REDUCER } from "../../constants/LoginCyberBugConst"
import { ACTIVE_LOADING, HIDE_LOADING } from "../../constants/ToDoListConst"


function* getAllProjectSaga(action) {
     // yield console.log('theo doi thanh cong')
     try {
          let { data, status } = yield call(() => { return cyberbugsService.getAllProjectCategory() })
          // console.log(data.content)
          yield put({
               type: GET_ALL_PROJECT_CATE_ACTION,
               projectCate: data.content
          })
          yield JSON.stringify(localStorage.setItem('idFirst', data.content[0].id))
     } catch (err) {
          console.log(err)
     }
}

export function* theoDoiGetAllProject() {
     yield takeLatest(GET_ALL_PROJECT_CATE, getAllProjectSaga)
}


function* getAllProjectManaSaga() {
     // yield console.log('kk')
     try {
          let { data, status } = yield call(() => { return cyberbugsService.getProjectAuthor() })
          // yield console.log('dataSaga', data)
          yield put({
               type: SET_PROJECT_MANA_ON_REDUCER,
               data: data
          })
     } catch (err) {
          console.log('err')
     }
     // console.log('localStorage:', 'brearer ', localStorage.getItem(TOKEN))
     // yield console.log('da load lai')
}

export function* theoDoigetAllProjectManaSaga() {
     yield takeLatest(GET_ALL_PROJECT_MANA_ACTION, getAllProjectManaSaga)
}


function* updateProjectSaga(action) {
     // console.log(action)
     yield put({
          type: ACTIVE_LOADING
     })

     yield delay(500)

     try {
          let { data } = yield call(() => { return cyberbugsService.updateProjectAuthor(action.projectUpdate) })
          // if(data === STATUS_CODE.SUCCESS){
          //      yield console.log('thanh cong')
          // } else {
          //      console.log()
          // }
          // yield console.log('data', data)
          // yield put(getAllProjectSaga)
          yield put({
               type: GET_ALL_PROJECT_MANA_ACTION
          })

     } catch (err) {
          console.log('err')
     }
     yield put({
          type: HIDE_LOADING
     })
}

export function* theoDoiupdateProjectSaga() {
     yield takeLatest('UPDATE_PROJECT_AUTH', updateProjectSaga)
}


function* deleteProjectSagaAuth(action) {
     yield put({
          type: ACTIVE_LOADING
     })

     yield delay(500)

     try {
          let { data, status } = yield call(() => { return cyberbugsService.deleProjectAuthor(action.project) })
          if (status === 200) {
               notificationFunc('success', 'Delete successfully!')

          } else {
               notificationFunc('error', 'Delete error!')
          }

          yield put({
               type: GET_ALL_PROJECT_MANA_ACTION
          })

     } catch (err) {
          // notificationFunc('error', 'Delete error!')
     }
     yield put({
          type: HIDE_LOADING
     })


}

export function* theoDoiDeleteProjectSagaAuth() {
     yield takeLatest('DELETE_PROJECT_AUTHOR', deleteProjectSagaAuth)
}


function* getUserAuthorSaga(action) {
     try {
          let { data, status } = yield call(() => { return cyberbugsService.getUserAuthor(action.keyWord) })
          // if (status === 200) {
          //      notificationFunc('success', 'Delete successfully!')

          // } else {
          //      notificationFunc('error', 'Delete error!')
          // }
          yield put({
               type: 'SEARCH_USER',
               data: data
          })

          // console.log('data', data)
          // yield put({
          //      type: GET_ALL_PROJECT_MANA_ACTION
          // })

     } catch (err) {
     }
}
export function* theoDoiGetUserAuthorSaga() {
     yield takeLatest('GET_USER', getUserAuthorSaga)
}


function* addUserAuthorSaga(action) {
     try {
          let { data, status } = yield call(() => { return cyberbugsService.assignUserAuthor(action.data) })

          // let { data1, status1 } = yield call(() => { return cyberbugsService.getUserByProjectId(action.data.projectId) })

          // yield console.log('data1', data1)
          if (status === 200) {
               yield put({
                    type: GET_ALL_PROJECT_MANA_ACTION,

               })
          } else {
               console.log('loi roi')
          }


     } catch (err) {
     }
     // yield console.log(action.data)
}
export function* theoDoiAddUserAuthorSaga() {
     yield takeLatest('ADD_USER_AUTHOR', addUserAuthorSaga)
}

function* removeUserAuthorSaga(action) {
     try {
          let { data, status } = yield call(() => { return cyberbugsService.removeUserProject(action.data) })

          // let { data1, status1 } = yield call(() => { return cyberbugsService.getUserByProjectId(action.data.projectId) })

          // yield console.log('data1', data1)
          if (status === 200) {
               yield put({
                    type: GET_ALL_PROJECT_MANA_ACTION,

               })
          } else {
               console.log('loi roi')
          }


     } catch (err) {
     }
     // yield console.log(action.data)
}
export function* theoDoiRemoveUserAuthorSaga() {
     yield takeLatest('REMOVE_USER_PROJECT', removeUserAuthorSaga)
}



function* getProjectDetailSaga(action) {
     yield put({
          type: ACTIVE_LOADING
     })

     yield delay(500)

     try {
          let { data, status } = yield call(() => { return cyberbugsService.getProjectDetail(action.id) })

          // yield console.log('dataSaga', data)
          yield put({
               type: 'PROJECT_DETAIL',
               data: data
          })

          yield put({
               type: GET_ALL_PROJECT_MANA_ACTION
          })

     } catch (err) {
          // notificationFunc('error', 'Delete error!')
     }
     yield put({
          type: HIDE_LOADING
     })

     // yield console.log('action',action)
}

export function* theoDoigetProjectDetailSaga() {
     yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga)
}



// nghiep vu create task

function* getAllPriority() {

     try {
          let { data, status } = yield call(() => { return cyberbugsService.getAllPriorityService() })

          if (status === 200) {
               yield put({
                    type: 'GET_PRIORITY',
                    data: data
               })
          } else {
               console.log('loi cmnr')
          }
     } catch (err) {
          console.log('err', err)
     }
}

export function* theoDoigetAllPriority() {
     yield takeLatest('GET_ALL_PRIORITY', getAllPriority)
}


function* getAllTaskType() {

     try {
          let { data, status } = yield call(() => { return cyberbugsService.getAllTaskTypeService() })

          if (status === 200) {
               yield put({
                    type: 'GET_TASK_TYPE',
                    data: data
               })
          } else {
               console.log('loi cmnr')
          }
     } catch (err) {
          console.log('err', err)
     }
}

export function* theoDoigetAllTaskType() {
     yield takeLatest('GET_ALL_TASK_TYPE', getAllTaskType)
}

function* getAllUserTask(action) {
     // console.log('saga')
     try {
          let { data, status } = yield call(() => { return cyberbugsService.getAllUserService(action.keyWord) })
          if (status === 200) {
               // console.log('data',data)
               yield put({
                    type: 'GET_TASK_ASSIGN',
                    data: data
               })
          }
     } catch (err) {
          console.log('err')
     }
}

export function* theoDoigetAllUserTask() {
     yield takeLatest('GET_ALL_USER_TASK', getAllUserTask)
}


function* createTaskSaga(action) {
     yield put({
          type: ACTIVE_LOADING
     })

     yield delay(500)

     try {
          let {status,data} = yield call(()=>{return cyberbugsService.createTaskService(action.data)})
          // console.log('data', data)
     } catch(err){
          console.log(err.response.data)
     }

     yield put({
          type: HIDE_LOADING
     })
}

export function* theoDoicreateTaskSaga() {
     yield takeLatest('CREATE_TASK', createTaskSaga)
}


function* getStatus() {
    

     yield delay(500)

     try {
          let {status,data} = yield call(()=>{return cyberbugsService.getStatusService()})
          // console.log('status', data)
          if(status === 200){
               yield put({
                    type:'GET_STATUS_SAGA',
                    data: data
               })
          }
     } catch(err){
          console.log(err.response.data)
     }

    
}

export function* theoDoigetStatusSaga() {
     yield takeLatest('GET_STATUS', getStatus)
}

function* getUser(action) {
    

     yield delay(500)

     try {
          let {status,data} = yield call(()=>{return cyberbugsService.getUserService(action.data)})
          // console.log('status', data)
          if(status === 200){
               yield put({
                    type:'GET_USER_SAGA',
                    data: data
               })
          }
     } catch(err){
          console.log(err.response.data)
     }

    
}

export function* theoDoigetUserSaga() {
     yield takeLatest('GET_NUM_USER', getUser)
}


// function *getProjectById(action){
//      try {
//           let {data} = yield call(()=>{return cyberbugsService.getProjectById(action.data)})

//           // console.log('data tu saga', data)
//      } catch(err){
//           console.log(err.response.data)
//      }
// }

// export function* theoDoigetProjectById(){
//      yield takeLatest('GET_PROJECT_BY_ID', getProjectById)
// }