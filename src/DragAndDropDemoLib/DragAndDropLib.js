import _, { drop } from 'lodash'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function DragAndDropLib(props) {

     let [state, setState] = useState({
          toDo: {
               id: 'toDo',
               items: [
                    { id: 1, taskName: 'Task 1' },
                    { id: 2, taskName: 'Task 2' },
                    { id: 3, taskName: 'Task 3' }
               ]
          },
          inProgress: {
               id: 'inProgress',
               items: [
                    { id: 4, taskName: 'Task 4' },
                    { id: 5, taskName: 'Task 5' },
                    { id: 6, taskName: 'Task 6' }
               ]
          },
          done: {
               id: 'done',
               items: [
                    { id: 7, taskName: 'Task 7' },
                    { id: 8, taskName: 'Task 8' },
                    { id: 9, taskName: 'Task 9' }
               ]
          }
     })

     const handleDragEnd = (result)=>{
          // console.log(result)
          let {destination, source} = result
          // console.log('destination', destination)
          // console.log('source', source)

          if(!destination){
               return;
          }
          if(destination.droppableId === source.droppableId && destination.index === source.index){
               console.log('ko co thay doi')
               return;
          }

          // tạo ra 1 cái được kéo
          let item = {...state[source.droppableId].items[source.index]}
          // console.log('state',item )
         
          // cắt mất item tương ứng trong vùng bị kéo
          let newArrDrag = state[source.droppableId].items?.filter(value=>value.id !== item?.id)
          state[source.droppableId].items = newArrDrag

          // thêm vào 1 item tương ứng trong vùng dc thả
          state[destination.droppableId].items.splice(destination.index, 0, item)
        
          // console.log(state)

          return state


     }

     return (
          <div className='container'>
               <h3>Drag And Drop Demo</h3>

               <DragDropContext onDragEnd={handleDragEnd}>
                    <div className='row justify-content-around'>
                         {_.map(state, (statusTask, index) => {
                              // console.log('sttTak', statusTask)
                              return <Droppable key={index} droppableId={statusTask.id.toString()} >
                                   {(provided) => {
                                        return <div
                                             key={index}
                                             className='col-4 text-white'
                                             ref={provided.innerRef}
                                             {...provided.droppableProps}
                                        >
                                             <div className='bg-dark p-4'>
                                                  <p className='text-white'>{statusTask.id}</p>
                                                  {statusTask.items.map((item, index) => {
                                                       return <Draggable key={item.id} index={index} draggableId={item.id.toString()} >
                                                            {(provided) => {
                                                                 return <div
                                                                      ref={provided.innerRef}
                                                                      {...provided.draggableProps}
                                                                      {...provided.dragHandleProps}
                                                                      className='mt-2 p-3 bg-white text-dark text-center'
                                                                 >
                                                                      {item.taskName}
                                                                 </div>
                                                            }}
                                                       </Draggable>
                                                  })}
                                             </div>
                                        </div>
                                   }}
                              </Droppable>
                         })}
                    </div>
               </DragDropContext>

          </div>
     )
}
