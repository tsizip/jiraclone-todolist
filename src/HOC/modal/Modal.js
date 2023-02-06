import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../../components/Login/Login'
import TodolistRFC from '../../pages/Todolist/TodolistRFC'
export default function Modal(props) {
     let Component = useSelector(state => state.ModalReducer.Component)
     return (
          <div>
               <div>
                    {/* Modal trigger button */}

                    {/* Modal Body */}
                    {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
                    <div className="modal fade" id="modalId" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                         <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                              <div className="modal-content">
                                   <div className="modal-header">
                                        <h5 className="modal-title" id="modalTitleId">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                   </div>
                                   <div className="modal-body">
                                        {Component}
                                        {/* <Login/> */}
                                   </div>
                                   <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save</button>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/* Optional: Place to the bottom of scripts */}
               </div>

          </div>
     )
}
