import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react';

export default function EditTaskModal(props) {

     let [visible, setVisible] = useState(false)
     let [change, setChange] = useState(true)
     let [valueEdit, setValueEdit] = useState('')
     const editorRef = useRef(null);

     let dispatch = useDispatch()
     const handleSubmit = () => {

     }
     let statusSaga = useSelector(state => state.TaskCyberBugReducer.statusSaga)
     let priority = useSelector(state => state.TaskCyberBugReducer.priority)
     // console.log('pri', priority)
     // console.log('status', statusSaga)
     let dataTaskDetailModal = useSelector(state => state.EditTaskCyberBugReducer.taskDetailModal)
     console.log('dataTask Detail Modal', dataTaskDetailModal)
     let projectDetail = useSelector(state => state.ProjectManagementReducer.projectDetail)
     console.log('project Detail', projectDetail)

     let taskType = useSelector(state => state.TaskCyberBugReducer.taskType)
     console.log('taskType', taskType)
     // console.log('ben nay', projectDetail)
     useEffect(() => {

          dispatch({
               type: 'SUBMIT_EDIT',
               funcValue: handleSubmit,
               name: 'Edit Task'

          })

          dispatch({
               type: 'GET_STATUS'
          })
          dispatch({
               type: 'GET_ALL_PRIORITY'
          })
          dispatch({
               type: 'GET_ALL_TASK_TYPE'
          })
          dispatch({
               type: 'GET_PROJECT_DETAIL',
               id: dataTaskDetailModal.projectId
          })

     }, [change])

     const handleChange = (e) => {
          let { name, value } = e.target
          console.log('name', name)

          dispatch({
               type: 'PUT_CHANGE_ON_TASK_SAGA',
               actionType: 'CHANGE_TASK_MODAL',
               name, value
          })
          // dispatch({
          //      type: 'CHANGE_TASK_MODAL',
          //      name, value
          // })
     }

     const renderTimeTracking = () => {

          let { timeTrackingSpent, timeTrackingRemaining } = dataTaskDetailModal
          let percent = (Number(timeTrackingSpent) / Number(timeTrackingRemaining)) * 100

          return <div>
               <div style={{ display: 'flex' }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: '100%' }}>
                         <div className="progress">
                              <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <p className="logged">{timeTrackingSpent}h spent</p>
                              <p className="estimate-time">{timeTrackingRemaining}h remaining</p>
                         </div>
                    </div>
               </div>
               <div className='row'>
                    <div className='col-6'>
                         <input type={'number'} name='timeTrackingSpent' className='form-control' onChange={handleChange}></input>
                    </div>
                    <div className='col-6'>
                         <input type={'number'} name='timeTrackingRemaining' className='form-control' onChange={handleChange}></input>
                    </div>
               </div>
          </div>
     }



     return (
          <div className="modal-dialog modal-info m-0">
               <div className="modal-content p-0" style={{ border: 'unset' }}>
                    <div className="modal-header">
                         <div className="task-title">
                              <i className="fa fa-bookmark" />
                              <select name='typeId' value={dataTaskDetailModal.typeId} className='form-control' onChange={handleChange}>
                                   {taskType.content?.map((tp, index) => {
                                        return <option value={tp.id} key={index}>{tp.taskType}</option>
                                   })}
                              </select>
                              <span>TASK-{dataTaskDetailModal.taskId}</span>
                         </div>
                         <div style={{ display: 'flex' }} className="task-click">
                              <div>
                                   <i className="fab fa-telegram-plane" />
                                   <span style={{ paddingRight: 20 }}>Give feedback</span>
                              </div>
                              <div>
                                   <i className="fa fa-link" />
                                   <span style={{ paddingRight: 20 }}>Copy link</span>
                              </div>
                              <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">×</span>
                              </button>
                         </div>
                    </div>
                    <div className="modal-body">
                         <div className="container-fluid">
                              <div className="row">
                                   <div className="col-8">
                                        <p className="issue">{dataTaskDetailModal.taskName}</p>
                                        <div className="description">
                                             <p>Description</p>

                                             {visible ? <div>
                                                  <Editor
                                                       name='description'
                                                       apiKey='your-api-key'
                                                       onInit={(evt, editor) => editorRef.current = editor}
                                                       initialValue={dataTaskDetailModal.description}
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
                                                       onEditorChange={(content, editor) => {
                                                            // setFieldValue('description', content)
                                                            setValueEdit(content)

                                                       }}
                                                  />
                                                  <button className='btn btn-success ' onClick={() => {
                                                       dispatch({
                                                            type: 'PUT_CHANGE_ON_TASK_SAGA',
                                                            actionType: 'CHANGE_TASK_MODAL',
                                                            name: 'description',
                                                            value: valueEdit
                                                       })
                                                       // dispatch({
                                                       //      type: 'CHANGE_TASK_MODAL',
                                                       //      name: 'description',
                                                       //      value: valueEdit
                                                       // })
                                                       setVisible(false)
                                                  }}>Save</button>
                                                  <button className='btn btn-danger' onClick={() => { setVisible(false) }}>Close</button>
                                             </div> : <p style={{ cursor: 'pointer' }} onClick={() => { setVisible(!visible) }}>
                                                  {parse(`${dataTaskDetailModal.description}`)}
                                             </p>}
                                        </div>

                                        <div className="comment">
                                             <h6>Comment</h6>
                                             <div className="block-comment" style={{ display: 'flex' }}>
                                                  <div className="avatar">
                                                       {dataTaskDetailModal.assigness?.map((ass, index) => {
                                                            return <img key={index} src={ass.avatar} alt='ok' />
                                                       })}
                                                  </div>
                                                  <div className="input-comment">
                                                       <input type="text" placeholder="Add a comment ..." />
                                                       <p>
                                                            <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                            <span>press
                                                                 <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                                 to comment</span>
                                                       </p>
                                                  </div>
                                             </div>
                                             {/* <div className="lastest-comment">
                                                  <div className="comment-item">
                                                       <div className="display-comment" style={{ display: 'flex' }}>
                                                            <div className="avatar">
                                                                 <img src="./assets/img/download (1).jfif" alt='123' />
                                                            </div>
                                                            <div>
                                                                 <p style={{ marginBottom: 5 }}>
                                                                      Lord Gaben <span>a month ago</span>
                                                                 </p>
                                                                 <p style={{ marginBottom: 5 }}>
                                                                      Lorem ipsum dolor sit amet, consectetur
                                                                      adipisicing elit. Repellendus tempora ex
                                                                      voluptatum saepe ab officiis alias totam ad
                                                                      accusamus molestiae?
                                                                 </p>
                                                                 <div>
                                                                      <span style={{ color: '#929398' }}>Edit</span>
                                                                      •
                                                                      <span style={{ color: '#929398' }}>Delete</span>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div> */}
                                        </div>
                                   </div>
                                   <div className="col-4">
                                        <div className="status">
                                             <h6>STATUS</h6>
                                             <select name='statusId' value={dataTaskDetailModal.statusId} className="custom-select" onChange={(e) => {

                                                  handleChange(e)

                                                  // dispatch({
                                                  //      type:"UPDATE_STATUS",
                                                  //      data:{
                                                  //           "taskId": dataTaskDetailModal.taskId,
                                                  //           "statusId": e.target.value
                                                  //      },
                                                  //      taskId: dataTaskDetailModal.taskId
                                                  // })
                                                  // dispatch({
                                                  //      type:'GET_PROJECT_DETAIL',
                                                  //      id: props.idProject
                                                  // })


                                             }} >
                                                  {/* <option selected hidden  >Please choose</option> */}
                                                  {statusSaga.content?.map((status, index) => {
                                                       return <option value={status.statusId} key={index} >{status.statusName}</option>
                                                  })}
                                             </select>
                                        </div>
                                        <div className="assignees">
                                             <h6>ASSIGNEES</h6>
                                             <div style={{ display: 'flex' }}>
                                                  {dataTaskDetailModal.assigness?.map((ass, index) => {
                                                       // console.log('num', dataTaskDetailModal.assigness.length)
                                                       return <>
                                                            <div key={index} style={{ display: 'flex' }} className="item" onClick={() => {
                                                                 setChange(!change)
                                                                 dispatch({
                                                                      type: 'PUT_CHANGE_ON_TASK_SAGA',
                                                                      actionType: 'DEL_USER_ASS',
                                                                      id: ass.id
                                                                 })
                                                                 // dispatch({
                                                                 //      type: 'DEL_USER_ASS',
                                                                 //      id: ass.id
                                                                 // })
                                                                 // alert('click')
                                                                 // dispatch({
                                                                 //      type:'CHANGE_ASS',
                                                                 //      userSelect: userSelect
                                                                 // })
                                                            }}>
                                                                 <div className="avatar">
                                                                      <img src={ass.avatar} alt='123' />
                                                                 </div>
                                                                 <p className="name">
                                                                      {ass.name}
                                                                      <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                                 </p>


                                                            </div>

                                                       </>
                                                  })}


                                             </div>
                                             <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  {/* <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span> */}
                                                  <select value={'0'} style={{ width: 'auto' }} className='form-control' name='lstUser' onChange={(e) => {
                                                       let value = e.target.value
                                                       console.log('value click', value)
                                                       // if(value == '0'){
                                                       //      return
                                                       // }
                                                       setChange(!change)
                                                       let userSelect = projectDetail.content?.members.find(us => us.userId == value)
                                                       userSelect = { ...userSelect, id: userSelect.userId }

                                                       console.log('value user select', userSelect)
                                                       dispatch({
                                                            type:'PUT_CHANGE_ON_TASK_SAGA',
                                                            actionType:'CHANGE_ASS',
                                                            userSelect: userSelect
                                                       })
                                                       // dispatch({
                                                       //      type: 'CHANGE_ASS',
                                                       //      userSelect: userSelect
                                                       // })

                                                  }} >
                                                       <option value='0' selected>Add more</option>
                                                       {
                                                            projectDetail.content?.members.filter(mem => {
                                                                 let index = dataTaskDetailModal.assigness?.findIndex(n => n.id === mem.userId)

                                                                 if (index !== -1) {
                                                                      return false
                                                                 }
                                                                 return true
                                                            }).map((mem, index) => {
                                                                 // console.log('so luong', mem.length)
                                                                 return <option key={index} value={mem.userId} >{mem.name}</option>
                                                            })
                                                       }
                                                  </select>
                                             </div>
                                        </div>

                                        <div className="priority" style={{ marginBottom: 20 }}>
                                             <h6>PRIORITY</h6>
                                             <select name='priorityId' className='form-control' value={dataTaskDetailModal.priorityId} onChange={(e) => {
                                                  handleChange(e)
                                             }}>
                                                  {priority.content?.map((pri, index) => {
                                                       return <option key={index} value={pri.priorityId}>{pri.priority}</option>
                                                  }
                                                  )}
                                             </select>
                                        </div>
                                        <div className="estimate">
                                             <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                             <input name='originalEstimate' type="text" value={dataTaskDetailModal.originalEstimate
                                             } className="estimate-hours" onChange={handleChange} />
                                        </div>
                                        <div className="time-tracking">
                                             <h6>TIME TRACKING</h6>
                                             {renderTimeTracking()}
                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}





