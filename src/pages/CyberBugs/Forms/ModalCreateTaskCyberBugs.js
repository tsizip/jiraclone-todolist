import React, { useEffect, useRef, useState } from 'react';
import { withFormik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { GET_ALL_PROJECT_MANA_ACTION } from '../../../redux/constants/LoginCyberBugConst';
function ModalCreateTaskCyberBugs(props) {
     const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
     } = props;
     // console.log('propsFormik values', values)

     const [timeSlider, setTimeSlider] = useState({
          timeSpent: 0,
          timeRemaining: 0
     })
     let projectData = useSelector(state => state.ProjectManagementReducer.allProject)
     // console.log('projectData', projectData.content)

     // projectData.content?.map((project,index)=>{
     //      if(project.id === 10323){
     //           console.log('project can handle', project)
     //           // return;
     //      }
     // })

     // LAY GIA TRI PROJECT
     const renderProject = () => {
         
          return projectData.content.map((project, index) => {
               // console.log('projec kkk', project)
               return <option value={project.id} key={index}>{project.projectName}</option>
          })
     }
     // lay gia tri priority
     let priorityData = useSelector(state => state.TaskCyberBugReducer.priority)

     const renderPriority = () => {
          return priorityData.content?.map((pri, index) => {
               // console.log('prio',pri)
               return <option value={pri.priorityId} key={index}>{pri.priority}</option>
          })
     }
     // lay gia tri task type
     let taskTypeData = useSelector(state => state.TaskCyberBugReducer.taskType)
     // console.log('taskType', taskTypeData)
     const renderTaskType = () => {
          return taskTypeData.content?.map((task, index) => {
               // console.log('task kkk', task)
               return <option value={task.id}>{task.taskType}</option>
          })
     }

     // lay gia tri Assign
     let { arrUser } = useSelector(state => state.TaskCyberBugReducer)
     console.log('ass', arrUser)
     // console.log('ass bien doi',)



     const dispatch = useDispatch()

     useEffect(() => {
          dispatch({
               type: 'SUBMIT_ADD_TASK',
               funcValue: handleSubmit,
               name: 'Add task project'
          })

          dispatch({
               type: GET_ALL_PROJECT_MANA_ACTION
          })

          dispatch({
               type: 'GET_ALL_PRIORITY'
          })

          dispatch({
               type: 'GET_ALL_TASK_TYPE'
          })

          dispatch({
               type: 'GET_ALL_USER_TASK',
               keyWord: null
          })

          dispatch({
               type: 'GET_STATUS'
          })
     }, [])

     // tiny mce
     const editorRef = useRef(null);
     const log = () => {
          if (editorRef.current) {
               // console.log(editorRef.current.getContent());
          }
     };

     // console.log('assign Name', assignData.map((value) => {
     //      return value.name
     // }))
     // select ant.d


     let options = ''
     // console.log('options', options)
     // options.push(dataSearch)
     // let options = dataSearch
     // console.log('dataSearch', dataSearch)


     const [size, setSize] = useState('middle');
     const handleSizeChange = (e) => {
          setSize(e.target.value);
     };


     let { statusSaga } = useSelector(state => state.TaskCyberBugReducer)
     // console.log('status saga', statusSaga)


     return (
          <form onSubmit={handleSubmit} className='container-fluid'>

               <div className='form-group'>
                    <span>Project Name / Project Id</span>
                    <select className='form-control' value={values.projectId} onChange={(e)=>{
                         
                         dispatch({
                              type:'GET_NUM_USER',
                              data: e.target.value
                         })
                         setFieldValue('projectId', e.target.value)
                    }} name='projectId' >
                         <option value="" selected disabled hidden>Please choose</option>
                         {renderProject()}
                    </select>
               </div>

               <div className='form-group'>
                    <span>TaskName</span>
                    <input onChange={handleChange} type={'text'} className='form-control' name='taskName' />
               </div>

               <div className='form-group'>
                    <span>Status</span>
                    <select onChange={handleChange} value={values.statusId} className='form-control' name='statusId' >
                         <option value="" selected disabled hidden>Please choose</option>
                         {statusSaga.content?.map((status, index) => {
                              // console.log('status',status)
                              return <option value={status.statusId} key={index}>{status.statusName}</option>
                         })}
                    </select>
               </div>

               <div className='form-group row'>
                    <div className='col-6'>
                         <span>Priority</span>
                         <select className='form-control' value={values.priorityId} onChange={handleChange} name='priorityId'>
                              <option value="" selected disabled hidden>Please choose</option>
                              {renderPriority()}
                         </select>
                    </div>
                    <div className='col-6'>
                         <span>Task type</span>
                         <select className='form-control' value={values.typeId} onChange={handleChange} name='typeId'>
                              <option value="" selected disabled hidden>Please choose</option>
                              {renderTaskType()}
                         </select>
                    </div>

               </div>

               <div className='form-group row'>
                    <div className='col-6'>
                         <span>Assignees</span>
                         <Select

                              mode="multiple"
                              size={size}
                              placeholder="Please select"
                              // defaultValue={['a10', 'c12']}
                              onChange={(values) => {
                                   setFieldValue('listUserAsign', values)
                              }}
                              style={{ width: '100%' }}
                              onSearch={value => {
                                   // console.log('value search', value)
                                   // dispatch({
                                   //      type: 'GET_ALL_USER_TASK',
                                   //      keyWord: value
                                   // })
                              }}
                              options={arrUser.content?.map(value => {
                                   return {
                                        value: value?.userId.toString(),
                                        label: value?.name
                                   }
                              })}
                              optionFilterProp='label'
                         />

                         <div className='row pt-1'>
                              <div className='col-12'>
                                   <span>Original estimate</span>
                                   <input onChange={handleChange} type={'number'} min='0' className='form-control' name='originalEstimate' />
                              </div>
                         </div>
                    </div>

                    <div className='col-6'>
                         <span>Time tracking</span>
                         <Slider tooltip={{ open: true }} value={[timeSlider.timeSpent]} max={Number(timeSlider.timeRemaining)} />

                         <div className='row'>
                              <div className='col-6'>
                                   <span>Time spent</span>
                                   <input type={'number'} min='0' onChange={(e) => {
                                        setTimeSlider({
                                             ...timeSlider,
                                             timeSpent: e.target.value,
                                        })
                                        setFieldValue('timeTrackingSpent', e.target.value)

                                   }}
                                        className='form-control' name='timeTrackingSpent' />
                              </div>
                              <div className='col-6'>
                                   <span>Time remaining</span>
                                   <input type={'number'} min='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                        setTimeSlider({
                                             ...timeSlider,
                                             timeRemaining: e.target.value,
                                        })
                                        // console.log(timeSlider)
                                        setFieldValue('timeTrackingRemaining', e.target.value)
                                   }} />
                              </div>
                         </div>
                    </div>
               </div>

               <div className='form-group'>
                    <span>Description</span>

                    <Editor
                         name='description'
                         apiKey='your-api-key'
                         onInit={(evt, editor) => editorRef.current = editor}
                         // initialValue="<p>This is the initial content of the editor.</p>"
                         init={{
                              height: 200,
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
                         onEditorChange={(content, editor) => {
                              setFieldValue('description', content)
                         }}
                    />
                    <button onClick={log}>Log editor content</button>
               </div>
          </form>
     );
}


const MyEnhancedForm = withFormik({
     mapPropsToValues: (props) => {
          // console.log('props X', props)
          return {
               "listUserAsign": [],
               "taskName": '',
               "description": "",
               "statusId": '',
               "originalEstimate": '',
               "timeTrackingSpent": '',
               "timeTrackingRemaining": '',
               "projectId": '',
               "typeId": '',
               "priorityId": 1
          }
     },

     // Custom sync validation


     handleSubmit: (values, { setSubmitting, props }) => {
          // console.log('da submit hee')
          // let value = {
          //      text:values.name
          // }
          // console.log('values', values)
          // console.log('values submit', values)
          // console.log('props', props)
          props.dispatch({
               type: 'CREATE_TASK',
               data: values
          })
     },
     enableReinitialize: true,

     displayName: 'BasicForm',
})(ModalCreateTaskCyberBugs);

// TRƯỜNG HỢP BINDING LẦN ĐẦU CỦA CÁC THẺ SELECT, INPUT NHẬN GIÁ TRỊ RỖNG
// có thể kết hợp mapStateToProps để lấy giá trị từ reducer về gán vào làm giá trị mặc định khi submit mà ko cần onChange cho thẻ
// nếu sử dụng thì ở mapPropsToValue có thể lấy giá trị bằng props.testState
// nếu ko muốn sd mapStateToProps thì sử dụng trước mỗi chỗ render option của thẻ select: <option value="" selected disabled hidden>Please choose</option>

// const mapStateToProps = (state) => {
//      // return {
//      //      testState: state.(reducer).giá trị state tương ứng
//      // }
// }
// connect(mapStateToProps)

export default connect()(MyEnhancedForm)