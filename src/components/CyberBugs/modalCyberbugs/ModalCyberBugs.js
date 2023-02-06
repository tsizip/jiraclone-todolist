import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
export default function ModalCyberBugs() {
     let { isModalOpen, ComponentContentDrawer, FunctionModal, name } = useSelector(state => state.ModalCyberBugReducer)
     let dispatch = useDispatch()
     // const [isModalOpen, setIsModalOpen] = useState(false);
     useEffect(()=>{
          // dispatch({
          //      // type:'EDIT_PROJECT'
          // })
     })
     const showModal = () => {
          // console.log('show')
          // let action = 
          dispatch({
               type: 'SHOW_MODAL',

          })
          // setIsModalOpen(true);
     };
     const handleOk = () => {
          // setIsModalOpen(false);
          // alert('jhjjj')
          FunctionModal();
          // console.log('done')
          dispatch({
               type: 'CLOSE_MODAL',
               
          })
          // dispatch({
          //      type:'SUBMIT_EDIT',

          // })
     };
     const handleCancel = () => {
          // setIsModalOpen(false);
          dispatch({
               type: 'CLOSE_MODAL'
          })
          // dispatch({
          //      type:'SUBMIT_EDIT'
          // })
     };

     return (

          <>
               {/* <Button type="primary" onClick={showModal}>
                    Open Modal
               </Button> */}
               <Modal title={name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                    {ComponentContentDrawer}
               </Modal>
          </>
     )
}
