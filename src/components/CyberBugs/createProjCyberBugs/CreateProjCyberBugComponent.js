import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CREATE_PROJECT_AUTHOR, GET_ALL_PROJECT_CATE } from '../../../redux/constants/LoginCyberBugConst';
import {createProjectAuthorAction, getAllProjectCategoryAction} from '../../../redux/actions/LoginCyberBugActions'
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { cyberbugsService } from '../../../services/CyberBugService';
import { getAllProjectManaAction } from '../../../redux/actions/ProjectCyberBugAction';

function CreateProjCyberBugComponent(props) {
     let data = useSelector(state=>state.ProjectCategoryReducer.projectCategory)
     let dispatch = useDispatch()
     useEffect(()=>{
          dispatch({
               type:GET_ALL_PROJECT_CATE
          })
     },[])
     
     const editorRef = useRef(null);
     const log = () => {
          if (editorRef.current) {
               // console.log(editorRef.current.getContent());
               // console.log('propsEditor', props)
               // phương thức setFieldValue() giúp set lại value của description = content nhập vào
               // phương thức setValues() set lại tất cả = content nhập vào
               setFieldValue('description',editorRef.current.getContent())
          }
     };
     // const handleSubmit = (e)=>{
     //      e.preventDefault();
     //      // dispatch(getAllProjectCategoryAction())
     //      // console.log('ok')
     // }

     const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          displayName,
          setFieldValue

     } = props;
     return (
          <div className='container mt-2 pb-5'>
               <h3>Create Project</h3>
               <form onSubmit={handleSubmit} onChange={handleChange} className=''>
                    <div className='form-group'>
                         <label>Name</label>
                         <input name='projectName' className='form-control'></input>
                    </div>

                    <div className='form-group'>
                         <label>Description</label>
                         {/* <input name='description' className='form-control'></input> */}
                         <Editor
                              name='description'
                              onEditorChange={log}
                              apiKey='your-api-key'
                              onInit={(evt, editor) => editorRef.current = editor}
                              // initialValue="<p>This is the initial content of the editor.</p>"
                              init={{
                                   height: 300,
                                   menubar: false,
                                   plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                   ],
                                   toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                              }}
                         />
                         {/* <button onClick={log}>Log editor content</button> */}
                    </div>

                    <div className='form-group'>
                         <select name='categoryId' onChange={handleChange} className='form-control'>
                              {/* <option>SOFTWARE</option>
                              <option>WEB</option>
                              <option>APP</option> */}
                              {data.map((value,index)=>{
                                   return <option key={index} value={value.id} >
                                        {value.projectCategoryName}
                                   </option>
                              })}
                         </select>
                    </div>

                    <button type='submit' onClick={handleSubmit} className='btn btn-outline-primary'>Create Project</button>


               </form>
          </div>
     )
}


const CreateProjectCategoryCyberBugsWithFomik = withFormik({
    
     mapPropsToValues: (props)=>({
          // console.log('props', props)
         
               projectName:'',
               description:'',
               categoryId: `${JSON.parse(localStorage.getItem('idFirst'))}`
          
     }),

     validationSchema: Yup.object().shape({
         
     }),
     // values = {email, password}
     handleSubmit:  (value, { setSubmitting, props }) => {
     //    console.log('propsvalue', props)
           props.dispatch(createProjectAuthorAction(value))
          // props.dispatch(getAllProjectManaAction())
          // alert('complete!')

     },

     displayName: 'Create Project CyberBugs',
})(CreateProjCyberBugComponent)

// const mapStateToProps = (state)=>{
//      return {
//           arrProjectCategory: state.ProjectCategoryReducer.projectCategory
//      }
// }

export default connect()(CreateProjectCategoryCyberBugsWithFomik)