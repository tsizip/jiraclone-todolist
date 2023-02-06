
import { call, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugService";


function* getTaskDetailIdSaga(action) {
     try {
          let { data, status } = yield call(() => { return cyberbugsService.getTaskDetailService(action.data) })
          // yield console.log('data tu saga', data)
          if (status === 200) {
               yield put({
                    type: 'TASK_DETAIL_REDUCER',
                    data: data.content
               })
          }
     } catch (err) {
          yield console.log('err')
     }
}

export function* theoDoigetTaskDetailIdSaga() {
     yield takeLatest('GET_DETAIL_ID', getTaskDetailIdSaga)
}


function* updateStatusSaga(action) {
     try {
          let { data } = yield call(() => { return cyberbugsService.updateStatusService(action.data) })
          console.log('update')
          yield put({
               type: 'GET_PROJECT_BY_ID',
               data: action.idProject
               // type:'GET_PROJECT_DETAIL',
               // id: action.idProject
          })
          yield put({
               type: 'GET_STATUS'
          })
          yield put({
               type: 'GET_DETAIL_ID',
               data: action.taskId
          })

     } catch (err) {
          yield console.log(err)
     }
}

export function* theoDoiupdateStatusSaga() {
     yield takeLatest('UPDATE_STATUS', updateStatusSaga)
}

function* finalHandleTask(action) {
     switch (action.actionType) {
          case 'CHANGE_TASK_MODAL': {
               let { name, value } = action;
               yield put({
                    type: 'CHANGE_TASK_MODAL',
                    name, value
               })
          } break;

          case 'DEL_USER_ASS': {
               let { id } = action;
               yield put({
                    type: 'DEL_USER_ASS',
                    id: id
               })
          } break;

          case 'CHANGE_ASS': {
               let { userSelect } = action;
               yield put({
                    type: 'CHANGE_ASS',
                    userSelect: userSelect
               })
          } break;

          default: return;

     }

     // save qua api
     // lay du lieu tu state.taskDetailModal
     let { taskDetailModal } = yield select(state => state.EditTaskCyberBugReducer)

     // bien doi phu hop voi api
     let listUserAsign = [...taskDetailModal.assigness?.map((us) => {
          return us.id
     })]
     // console.log('list id user', listUserAsign)
     taskDetailModal = { ...taskDetailModal, listUserAsign }
     // console.log('du lieu sau khi thay doi', taskDetailModal)
     let { data, status } = yield call(() => { return cyberbugsService.updateTaskService(taskDetailModal) })
     if (status === 200) {
          yield put({
               type: 'GET_PROJECT_BY_ID',
               data: action.idProject
               // type:'GET_PROJECT_DETAIL',
               // id: action.idProject
          })
          yield put({
               type: 'GET_STATUS'
          })
          yield put({
               type: 'GET_DETAIL_ID',
               data: action.taskId
          })
     } else {
          console.log('err')
     }
}

export function* theoDoifinalHandleTask() {
     yield takeLatest('PUT_CHANGE_ON_TASK_SAGA', finalHandleTask)
} 