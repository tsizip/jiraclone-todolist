import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { createProjectAuthorAction } from '../../../redux/actions/LoginCyberBugActions';
import { GET_ALL_PROJECT_CATE } from '../../../redux/constants/LoginCyberBugConst';

function FormEditProject(props) {
     let dispatch = useDispatch()
     let categoryId = useSelector(state => state.ProjectCategoryReducer.projectCategory)
     const editorRef = useRef(null);
     const log = () => {
          if (editorRef.current) {
               // console.log(editorRef.current.getContent());
               // console.log('propsEditor', props)
               // phương thức setFieldValue() giúp set lại value của description = content nhập vào
               // phương thức setValues() set lại tất cả = content nhập vào
               setFieldValue('description2', editorRef.current.getContent())
          }
     };
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

     
     // console.log('values', values)

     // const handleSubmitForm = () => {
     //      // e.preventDefault();
     //      alert('ok donennn')

     // }
     const num = 0
     useEffect(() => {
          dispatch({
               type:GET_ALL_PROJECT_CATE
          })
          dispatch({
               type: 'SUBMIT_EDIT',
               funcValue: handleSubmit,
               name: 'Edit project'

          })
     },[])
     return (
          <form className='container-fluid' onSubmit={handleSubmit}>
            
               <div className='row'>
                    <div className='col-12'>
                         <div className='form-group'>
                              <span className='font-weight-normal'>Project Id</span>
                              <input value={values.id} disabled name='id' className='form-control'></input>
                         </div>

                         <div className='form-group'>
                              <span className='font-weight-normal'>Project Name</span>
                              <input value={values.projectName} onChange={handleChange} name='projectName' className='form-control'></input>
                         </div>

                         <div className='form-group'>
                              <span className='font-weight-normal'>Project Category</span>
                              <select value={values.categoryId} name='categoryId' className='form-control'>
                                   {categoryId?.map((valuee,index)=>{
                                        return <option value={valuee.id} key={index}>
                                             {valuee.projectCategoryName}
                                        </option>
                                   })}
                              </select>
                         </div>

                         <div className='form-group'>
                              <span className='font-weight-normal'>Description</span>
                              <Editor
                                   // value={values.description}
                                   name='description2'
                                   onEditorChange={log}
                                   apiKey='your-api-key'
                                   onInit={(evt, editor) => editorRef.current = editor}
                                   initialValue={values.description}
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
                         </div>

                    </div>
               </div>
          </form>
     )
}



const EditProjectWithFormik = withFormik({

     mapPropsToValues: (props) => {
          // console.log('propsFormik', props)
          let { projectEdit } = props
          return {
               id: projectEdit?.id,
               projectName: projectEdit?.projectName,
               description: projectEdit?.description,
               categoryId: projectEdit?.categoryId

          }
     },

     validationSchema: Yup.object().shape({

     }),
     // values = {email, password}
     handleSubmit: (value, { setSubmitting, props }) => {
          // console.log('value', value)
          console.log('da submit!')
          value.description = value.description2
          let value2 = {
               id: value.id,
               projectName: value.projectName,
               description: value.description,
               categoryId: value.categoryId
          }
          props.dispatch({
               type:'UPDATE_PROJECT_AUTH',
               projectUpdate: value2
          })
     },
     enableReinitialize:true,

     displayName: 'Edit Form Project CyberBugs',


})(FormEditProject)

const mapStateToProps = (state) => {
     return {
          projectEdit: state.ProjectAllReducer.projectEdit
     }
}

export default connect(mapStateToProps)(EditProjectWithFormik)