import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { toDoListService } from '../../services/ToDoListService'
import { STATUS_CODE } from '../../util/constant/SettingSystem'
import { ACTIVE_LOADING, ADD_TASK_API_ACTION, DEL_TASK_API_ACTION, GET_TASK_API, GET_TASK_API_ACTION, HIDE_LOADING, PUT_TASK, PUT_TASK_API_ACTION, REJECT_TASK_API_ACTION } from '../constants/ToDoListConst'


// chức năng get task từ API
function* getTaskApi(action) {
     yield put({
          type: ACTIVE_LOADING
     })

     yield delay(500)
     try {
          // let result = yield call(() => {
          let { data, status, ...res } = yield call(toDoListService.getTaskApi)
          if (status === 200) {
               yield put({
                    type: GET_TASK_API,
                    taskList: data
               })

               // yield console.log('dataGet', data)
          } else {
               console.log('error')
          }
          // console.log('result', result)
          // SAU KHI LẤY GIÁ TRỊ THÀNH CÔNG THÌ DÙNG PUT (GIỐNG DISPATCH BÊN THUNK) ĐỂ ĐẨY DỮ LIỆU LÊN REDUCER
     } catch (err) {
          console.log('err')
     }
     yield put({
          type: HIDE_LOADING
     })

}

export function* theoDoiGetTaskApi() {

     // yield fork(getTaskApi)

     yield takeLatest(GET_TASK_API_ACTION, getTaskApi)

     // console.log('rootSaga')
}


// chức năng xóa task Api
function* delTaskApi(action) {
     console.log('action', action)
     let { value } = action
     let { taskName } = value
     try {

          let result = yield call(() => { return toDoListService.delTaskApiSer(taskName) })
          if (result.status === 200) {
               yield getTaskApi()
          } else {
               console.log('error')
          }
          // console.log('data', status)
     } catch (err) {
          console.log('error')
     }

}

export function* theoDoiXoaTaskApi() {
     yield takeLatest(DEL_TASK_API_ACTION, delTaskApi)
}
// chuc nang them task api
function* addTaskApi(action) {
     // let {taskName} = action
     try {
          let { data, status } = yield call(() => { return toDoListService.addTaskApiSer(action.taskName) })
          if (status === 200) {
               yield getTaskApi()

          } else {
               console.log('err')
          }
     } catch (err) {
          console.log('error')
     }
     // console.log(action.taskName)
     // yield console.log('add')
}
export function* theoDoiAddTaskApi() {
     yield takeLatest(ADD_TASK_API_ACTION, addTaskApi)
}

// chuc nang put (thay doi trang thai) api false => true
function* putTaskApi(action) {
     // console.log('action', taskName)
     let {data} = action
     try {
          let {status} = yield call(()=>{return toDoListService.putTaskApiSer(data)})
          if(status === STATUS_CODE.SUCCESS){
               yield put({
                    type:GET_TASK_API_ACTION
               })
          } else {
               console.log('error')
          }
     } catch(err){
          console.log('err')
     }

     
    
}

export function* theoDoiPutTaskApi() {
     yield takeLatest(PUT_TASK_API_ACTION, putTaskApi)
}

// chuc nang put (thay doi trang thai) api true => false

function *rejectTaskApi(action){
     // yield console.log(action)
     let {data } = action
     try{
          let {status} = yield call(()=>{
               return toDoListService.rejectTaskApiSer(data)
          })
          if(status === STATUS_CODE.SUCCESS){
               yield put({
                    type:GET_TASK_API_ACTION
               })
          }
     } catch (err){
          console.log('err')
     }
}

export function * theoDoiRejectTaskApi(){
     yield takeLatest(REJECT_TASK_API_ACTION, rejectTaskApi)
}