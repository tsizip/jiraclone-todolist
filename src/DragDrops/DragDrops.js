import React, { useState } from 'react'

const defaultValue = [
     { id: 1, taskName: 'Task 1' },
     { id: 2, taskName: 'Task 2' },
     { id: 3, taskName: 'Task 3' },
     { id: 4, taskName: 'Task 4' },
     { id: 5, taskName: 'Task 5' },
]

export default function DragDrops() {
     const [taskList, setTaskList] = useState(defaultValue);


     // kích hoạt draggable="true" để nhận sự kiện kéo, còn thả thì ko cần

     // sự kiện khi bắt đầu kéo thẻ, gọi bằng onDragStart
     // target vào thẻ được click (ngay khi được click thì target đã được gọi) để kéo
     const handleDragStart = (e, task, index) => {
              console.log('tag',e.target);
              console.log('task',task);
              console.log('index',index);
     }

     // DragOver và DragEnter đều là kéo đối tượng lướt qua 1 đối tượng khác, gọi bằng onDragEnter/onDragOver
     // DragOver là gọi liên tục, DragEnter là gọi 1 lần
     // target ko phải là thẻ dc click, mà là thẻ mà thẻ dc click kéo trúng
     const handleDragOver = (e) => {
              console.log('targertOver',e.target)

     }

     // buông đối tượng ra thì nhảy vào sk này, gọi bằng onDragEnd
     // target là đối tượng được kéo thả
     const handleDragEnd = (e) => {
          //     console.log('dragEnd', e.target);

     }

     // sự kiện đặt trên thẻ được drop tới, và phải tắt sk DragOver bằng cách thêm func dưới:
     //   onDragOver={(e)=>{
     //          e.stopPropagation();
     //          e.preventDefault();
     //   }}
     
     // target lúc này là vùng được thả, gọi bằng onDrop
     const handleDrop = (e) => {
              console.log('drop', e.target);
     }
     return (
          <div className="container">
               <div className="text-center display-4" onDragOver={handleDragOver}>Task list</div>
               <div className="row">
                    <div className="col-2"></div>
                    <div className="bg-dark p-5 col-4">
                         {taskList.map((task, index) => {
                              return <div
                                   onDragStart={(e) => { handleDragStart(e, task, index) }}
                                   onDragEnter={handleDragOver}
                                   onDragEnd={(e) => { handleDragEnd(e) }}
                                   draggable="true"
                                   key={index}
                                   className="bg-success text-white m-1 p-3">
                                   {task.taskName}
                              </div>
                         })}
                    </div>
                    <div className="col-2 bg-primary" style={{ height: 500 }} onDragOver={(e) => {
                         e.stopPropagation();
                         e.preventDefault();
                    }} onDrop={(e) => { handleDrop(e) }}>
                         dsadsasda
                    </div>

               </div>

          </div>
     )
}
