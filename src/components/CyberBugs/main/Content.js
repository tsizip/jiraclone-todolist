import useSelection from 'antd/es/table/hooks/useSelection'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditTaskModal from '../../../pages/CyberBugs/Forms/EditTaskModal'
import { GET_ALL_PROJECT_MANA_ACTION } from '../../../redux/constants/LoginCyberBugConst'
import InfoModalCyberBugs from '../modalCyberbugs/InfoModalCyberBugs'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


export default function Content(props) {
     // console.log('idProject',props.idProject)
     let dispatch = useDispatch()

     let dataContent = props.projectDetail
     // console.log('dataContent', dataContent)

     let { projectDetail } = useSelector(state => state.ProjectManagementReducer)
     // console.log('projectDetail', projectDetail)

     useEffect(() => {
          dispatch({
               type: 'GET_PROJECT_BY_ID',
               data: props.idProject
          })
     }, [])

     const handleDragEnd = (result) => {
          // console.log('result', result)
          let {destination, source} = result
          // console.log('destination', destination)
          // console.log('source', source)
          let {projectId, taskId} = JSON.parse(result.draggableId)
          console.log('data', projectId, taskId)

          if(!destination){
               return;
          }
          if(destination.droppableId === source.droppableId && destination.index === source.index){
               console.log('ko co thay doi')
               return;
          }
          dispatch({
               type:'UPDATE_STATUS',
               data: {
                    'taskId': taskId,
                    'statusId': destination.droppableId,
                    'projectId': projectId
               }
          })
     }
     const renderListTask = () => {
          return <DragDropContext onDragEnd={handleDragEnd}>
               {
                    dataContent.content?.lstTask.map((task, indexCard) => {
                         // console.log('task content', task)
                         return <Droppable key={task.statusId.toString()} droppableId={task.statusId.toString()}  >
                              {(provided) => {
                                   return <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        key={indexCard}
                                        className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
                                        <div className="card-header">
                                             {task.statusName}
                                        </div>
                                        <ul
                                             // ref={provided.innerRef}
                                             // {...provided.draggableProps}
                                             // {...provided.dragHandleProps}
                                             className="list-group list-group-flush">
                                             {task.lstTaskDeTail.map((task, indexli) => {
                                                  console.log('task ?', task)
                                                  // data-toggle="modal" data-target="#infoModal"
                                                  return <Draggable key={task.taskId.toString()} index={indexli} draggableId={JSON.stringify({projectId:task.projectId, taskId: task.taskId})} >
                                                       {(provided) => {
                                                            return <li
                                                                 ref={provided.innerRef}
                                                                 {...provided.draggableProps}
                                                                 {...provided.dragHandleProps}
                                                                 key={indexli} onClick={() => {
                                                                      // console.log('key', task  )
                                                                      dispatch({
                                                                           type: 'SHOW_MODAL_EDIT',
                                                                           Component: <EditTaskModal idProject={props.idProject} />


                                                                      })

                                                                      dispatch({
                                                                           type: 'GET_DETAIL_ID',
                                                                           // data: test2[indexCard].lstTaskDeTail.map((final,index)=>{
                                                                           //      return final.taskId
                                                                           // })
                                                                           data: task.taskId
                                                                      })
                                                                 }} className="list-group-item test" >
                                                                 <p>
                                                                      {task.taskName}
                                                                 </p>
                                                                 <div className="block" style={{ display: 'flex' }}>
                                                                      <div className="block-left">
                                                                           <i className="fa fa-bookmark" />
                                                                           <i className="fa fa-arrow-up" />
                                                                      </div>
                                                                      <div className="block-right">
                                                                           <div className="avatar-group" style={{ display: 'flex' }}>
                                                                                {task.assigness.map((user, index) => {
                                                                                     return <div key={index} className="avatar">
                                                                                          <img src={user.avatar} alt='demo' />
                                                                                     </div>
                                                                                })}

                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            </li>
                                                       }}
                                                  </Draggable>

                                             })}


                                        </ul>
                                        {provided.placeholder}
                                   </div>
                              }}
                         </Droppable>

                    })
               }
          </DragDropContext>

     }
     return (
          <div className="content" style={{ display: 'flex' }}>
               {renderListTask()}
          </div>

     )
}



{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
     BACKLOG 3
</div>
<ul className="list-group list-group-flush">
     <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
          <p>
               Each issue has a single reporter but can have multiple
               assignees
          </p>
          <div className="block" style={{ display: 'flex' }}>
               <div className="block-left">
                    <i className="fa fa-bookmark" />
                    <i className="fa fa-arrow-up" />
               </div>
               <div className="block-right">
                    <div className="avatar-group" style={{ display: 'flex' }}>
                         <div className="avatar">
                              <img src="../../../assets/img/download (1).jfif" alt='demo' />
                         </div>
                         <div className="avatar">
                              <img src="../../../assets/img/download (2).jfif" alt='demo' />
                         </div>
                    </div>
               </div>
          </div>
     </li>
     <li className="list-group-item">
          <p>
               Each issue has a single reporter but can have multiple
               assignees
          </p>
          <div className="block" style={{ display: 'flex' }}>
               <div className="block-left">
                    <i className="fa fa-check-square" />
                    <i className="fa fa-arrow-up" />
               </div>
               <div className="block-right">
                    <div className="avatar-group" style={{ display: 'flex' }}>
                         <div className="avatar">
                              <img src="../../../assets/img/download (1).jfif" alt='demo' />
                         </div>
                         <div className="avatar">
                              <img src="../../../assets/img/download (2).jfif" alt='demo' />
                         </div>
                    </div>
               </div>
          </div>
     </li>
     <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */}
{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
     SELECTED FOR DEVELOPMENT 2
</div>
<ul className="list-group list-group-flush">
     <li className="list-group-item">Cras justo odio</li>
     <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div> */}
{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
     IN PROGRESS 2
</div>
<ul className="list-group list-group-flush">
     <li className="list-group-item">Cras justo odio</li>
     <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div> */}
{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
     DONE 3
</div>
<ul className="list-group list-group-flush">
     <li className="list-group-item">Cras justo odio</li>
     <li className="list-group-item">Dapibus ac facilisis in</li>
     <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */}