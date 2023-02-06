const initialState = {
     projectEdit: {
          "id": 0,
          "projectName": "string",
          "creator": 0,
          "description": '<h1>tset</h1>',
          "categoryId": "string"
     }
}

const ProjectAllReducer = (state = initialState, action) => {
     switch (action.type) {

          case 'EDIT_PROJECT':
               state.projectEdit = action.projectEdit
               console.log('projectEdit',action.projectEdit )
               return { ...state }
          
          default:
               return {...state}
     }
}

export default ProjectAllReducer
