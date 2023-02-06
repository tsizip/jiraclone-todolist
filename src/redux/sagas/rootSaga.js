import { all, call } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga';
import * as CyberBugSaga from './CyberBugSaga/CyberBugSaga'
import * as ProjectCyberBugSaga from './CyberBugSaga/ProjectCyberBugSaga'
import * as ProjectSaga from './CyberBugSaga/ProjectSaga'
import * as TaskSaga from './CyberBugSaga/TaskSaga'

export function* rootSaga(){
     yield all([
          // nghiệp vụ theo dõi các action saga todolist
          ToDoListSaga.theoDoiGetTaskApi(),
          ToDoListSaga.theoDoiXoaTaskApi(),
          ToDoListSaga.theoDoiAddTaskApi(),
          ToDoListSaga.theoDoiPutTaskApi(),
          ToDoListSaga.theoDoiRejectTaskApi(),
          CyberBugSaga.theoDoiSingin(),
          ProjectCyberBugSaga.theoDoiGetAllProject(),
          ProjectSaga.theoDoiCreateProjectAuthor(),
          ProjectCyberBugSaga.theoDoigetAllProjectManaSaga(),
          ProjectCyberBugSaga.theoDoiupdateProjectSaga(),
          ProjectCyberBugSaga.theoDoiDeleteProjectSagaAuth(),
          ProjectCyberBugSaga.theoDoiGetUserAuthorSaga(),
          ProjectCyberBugSaga.theoDoiAddUserAuthorSaga(),
          ProjectCyberBugSaga.theoDoiRemoveUserAuthorSaga(),
          ProjectCyberBugSaga.theoDoigetProjectDetailSaga(),
          ProjectCyberBugSaga.theoDoigetAllPriority(),
          ProjectCyberBugSaga.theoDoigetAllTaskType(),
          ProjectCyberBugSaga.theoDoigetAllUserTask(),
          ProjectCyberBugSaga.theoDoicreateTaskSaga(),
          ProjectCyberBugSaga.theoDoigetStatusSaga(),
          ProjectCyberBugSaga.theoDoigetUserSaga(),
          // ProjectCyberBugSaga.theoDoigetProjectById()

          TaskSaga.theoDoigetTaskDetailIdSaga(),
          TaskSaga.theoDoiupdateStatusSaga(),
          TaskSaga.theoDoifinalHandleTask()

     ])
}
