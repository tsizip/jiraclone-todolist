import {applyMiddleware, combineReducers, legacy_createStore as createStore, legacy_createStore} from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer'
import reduxThunk from 'redux-thunk'
import ModalReducer from './reducers/ModalReducer'
import CyberBugReducer from './reducers/CyberBugReducer'
// middleware redux-saga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga, theoDoiAddTaskApi, theoDoiGetTaskApi } from './sagas/rootSaga';
import UserLoginCyberBugReudcer from './reducers/UserLoginCyberBugsReducer'
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer'
import ProjectManagementReducer from './reducers/ProjectManagementReducer'
import ModalCyberBugReducer from './reducers/ModalCyberBugReducer'
import ProjectAllReducer from './reducers/ProjectAllReducer'
import NotificationReducer from './reducers/NotificationReducer'
import TaskCyberBugReducer from './reducers/TaskCyberBugReducer'
import EditTaskCyberBugReducer from './reducers/EditTaskCyberBugReducer'


const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
     // reducer khai báo tại đây
     ToDoListReducer, LoadingReducer, ModalReducer, CyberBugReducer, UserLoginCyberBugReudcer, ProjectCategoryReducer, ProjectManagementReducer, ModalCyberBugReducer,
     ProjectAllReducer, TaskCyberBugReducer, EditTaskCyberBugReducer
     
})

const store = legacy_createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga))


// gọi saga
middleWareSaga.run(rootSaga)
// middleWareSaga.run(theoDoiAddTaskApi)

export default store