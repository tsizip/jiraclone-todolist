const initialState = {
     taskDetailModal: {
          "priorityTask": {
               "priorityId": 4,
               "priority": "Lowest"
          },
          "taskTypeDetail": {
               "id": 2,
               "taskType": "new task"
          },
          "assigness": [
               {
                    "id": 3828,
                    "avatar": "https://ui-avatars.com/api/?name=tri",
                    "name": "tri",
                    "alias": "tri"
               }
          ],
          "lstComment": [],
          "taskId": 8044,
          "taskName": "block 3",
          "alias": "block-3",
          "description": "<p>ASHDAJKSD</p>",
          "statusId": "1",
          "originalEstimate": 9,
          "timeTrackingSpent": 1,
          "timeTrackingRemaining": 5,
          "typeId": 2,
          "priorityId": 4,
          "projectId": 10365
     },
     test: ''
}

const EditTaskCyberBugReducer = (state = initialState, action) => {
     switch (action.type) {

          case 'TASK_DETAIL_REDUCER':
               // trong reducer, co thu tu console.log va setState, neu setState o return thi clg o tren se ko thay
               state.taskDetailModal = action.data
               // console.log('data reducer final', state.taskDetailModal)
               return { ...state }

          case 'CHANGE_TASK_MODAL':
               let { name, value } = action
               return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }
          case 'CHANGE_ASS':
               state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelect]
               console.log('ass', state.taskDetailModal.assigness)
               return {...state}

          case "DEL_USER_ASS":
               state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us=>us.id !== action.id)]
               console.log('reducer', state.taskDetailModal.assigness)
               return {...state}
          default:
               return { ...state }
     }
}

export default EditTaskCyberBugReducer