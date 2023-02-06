const initialState = {
     isModalOpen: false,
     ComponentContentDrawer: '',
     name:'',
     // FunctionModal sẽ bị thay thế bởi handleSubmit được dispatch từ FormEditProject
     FunctionModal: ()=>{}
     
}

const ModalCyberBugReducer = (state = initialState, action) => {
     switch (action.type) {

          case 'SHOW_MODAL':
               console.log('ok show')
               return { ...state, isModalOpen: true }
          case 'CLOSE_MODAL':
               return { ...state, isModalOpen: false }
          case 'SHOW_MODAL_EDIT':
               console.log('show', state.ComponentContentDrawer)
               return { ...state, isModalOpen: true, ComponentContentDrawer: action.Component }

          case 'SUBMIT_EDIT':
               state.name = action.name
               state.FunctionModal = action.funcValue
               return { ...state }

          case 'SHOW_ADD_TASK':

               return { ...state, isModalOpen: true, ComponentContentDrawer: action.Component }

          case 'SUBMIT_ADD_TASK':
               state.name = action.name
               
               state.FunctionModal = action.funcValue
               return { ...state }
          default:
               return { ...state }
     }
}

export default ModalCyberBugReducer