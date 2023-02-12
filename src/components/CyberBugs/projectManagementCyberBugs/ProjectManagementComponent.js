import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Popconfirm, notification, Button, Avatar, Popover, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectManaAction } from '../../../redux/actions/ProjectCyberBugAction';
// import {} from ''
import { FormOutlined, DeleteOutlined, SmileOutlined } from '@ant-design/icons'
import parse from 'html-react-parser'
import FormEditProject from '../../../pages/CyberBugs/Forms/FormEditProject';
import { delay } from 'redux-saga/effects';
import { NavLink } from 'react-router-dom';



export default function ProjectManagementComponent(props) {

     let searchUser = useSelector(state => state.UserLoginCyberBugReudcer.searchUser)
     let userSearch = searchUser?.content
     
     let [value, setValue] = useState('')

     let searchRef = useRef(null)

     let data = useSelector(state => state.ProjectManagementReducer.allProject.content)
     
     let dispatch = useDispatch()
     useEffect(() => {

          dispatch(getAllProjectManaAction())
          // dispatch()
     }, [])
     const columns = [
          {
               title: 'ID',
               dataIndex: 'id',
               sorter: (a, b) => a.categoryId - b.categoryId,
               // colSpan: 5
          },
          {

               title: 'ProjectName',
               dataIndex: 'projectName',
               filters: [
                    {
                         text: 'hhe',
                         value: 'hhe',
                    },


               ],
               filterMode: 'tree',
               filterSearch: true,
               onFilter: (value, record) => record.projectName.startsWith(value),
               width: '20%',
               sorter: (a, b) => a.projectName.length - b.projectName.length,
               sortDirections: ['descend'],
               render:(text,record, index)=>{
                    return <NavLink key={index} to={`/cyberbugs/${record.id}`} >{text}</NavLink>
               }
          },

          {
               title: 'Description',
               dataIndex: 'description',
               filters: [
                    {
                         text: 'test',
                         value: 'test',
                    },
                    {
                         text: '123',
                         value: '123',
                    },
                    {
                         text: 'abc',
                         value: 'abc',
                    },
               ],
               render: (text, record, index) => {
                    let contentJSX = parse(text);

                    return <div key={index}>
                         {contentJSX}
                    </div>
               },
               onFilter: (value, record) => record.description.startsWith(value),
               filterSearch: true,
               width: '25%',
          },
          {
               title: 'Creator',
               // dataIndex: 'creator',
               key: 'x',
               filters: [
                    {
                         text: 'Admin Cyberlearn - 01',
                         value: 'Admin Cyberlearn - 01',
                    },
                    {
                         text: 'admin',
                         value: 'admin',
                    },

               ],
               filterMode: 'tree',
               filterSearch: true,
               onFilter: (value, record) => {
                    // console.log('valueFT',value)
                    // console.log('recordFT',record)
                    return (record.creator.name.startsWith(value))
                    //  (record.creator.name.startsWith(value))
               },

               width: '15%',
               render: (text, record, index) => {
                    //     console.log(text)
                    return <Tag key={index} color='green'>{text.creator.name}</Tag>
               },

          },
          {
               title: 'Members',
               // dataIndex:'members',
               key: 'members',
               render: (text, record, index) => {
                    // console.log('record', record)
                    return <div key={index}>
                         {record.members?.slice(0, 2).map((member, index) => {

                              return <Popover key={index} placement='top' title='member' content={() => {
                                   return <table key={index} className='table'>
                                        <thead>
                                             <tr>
                                                  <th>Id</th>
                                                  <th>Avatar</th>
                                                  <th>Name</th>
                                                  <th></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {record.members?.map((item, index) => {
                                                  return <tr key={index}>
                                                       <td>{item.userId}</td>
                                                       <td><img src={item.avatar} width='30' height='30' style={{ borderRadius: '50%' }} alt='img' /></td>
                                                       <td>{item.name}</td>
                                                       <td><button className='btn btn-danger' style={{ borderRadius: '50%' }} onClick={() => {
                                                            dispatch({
                                                                 type: 'REMOVE_USER_PROJECT',
                                                                 data: {
                                                                      projectId: record.id,
                                                                      userId: item.userId
                                                                 }
                                                            })
                                                       }} >X</button></td>
                                                  </tr>
                                             })}
                                        </tbody>

                                   </table>
                              }}>
                                   <Avatar key={index} src={member.avatar}></Avatar>
                              </Popover>


                         })}
                         {record.members?.length > 2 ? <Avatar>...</Avatar> : ''}
                         {<Popover placement="right" title={'Add member'} content={() => {
                              return <AutoComplete
                              key={1}
                                   style={{
                                        width: '100%',
                                   }}
                                   placeholder="input here"

                                   options={userSearch?.map((value, index) => {
                                        return {
                                             label: value?.name,
                                             value: value?.userId.toString()
                                        }
                                   })}
                                   value={value}

                                   onChange={(text) => {
                                        setValue(text)
                                   }}

                                   onSelect={(valueS, option) => {
                                        // console.log('value', value)
                                        // console.log('option', option)
                                        // set gia tri cua thanh tim kiem 
                                        setValue(option.label)
                                        // call api gui id tuong ung voi gia tri la value
                                        dispatch({
                                             type: 'ADD_USER_AUTHOR',
                                             data: {
                                                  "projectId": record.id,
                                                  "userId": valueS
                                             }
                                        })




                                   }}
                                   onSearch={(value) => {
                                        console.log('value', value)
                                        if (searchRef.current) {
                                             clearTimeout(searchRef.current)
                                        }

                                        // console.log('ref', searchRef.current)
                                        searchRef.current = setTimeout(() => {
                                             dispatch({
                                                  type: 'GET_USER',
                                                  keyWord: value
                                             })
                                        }, 500)

                                   }}
                              />
                         }} trigger="click">
                              <Avatar key={2} type='button'>+</Avatar>
                         </Popover>}
                    </div>
               },
               width: '15%'
          },
          {
               title: 'Action',
               dataIndex: '',
               key: 'x',
               render: (text, record, index) => {
                    return <div key={index}>
                         <button className="btn mr-2 btn-primary" onClick={() => {
                             
                              dispatch({
                                   type: 'SHOW_MODAL_EDIT',
                                   Component: <FormEditProject />
                              })

                              dispatch({
                                   type: 'EDIT_PROJECT',
                                   projectEdit: record
                              })
                         }}>
                              <FormOutlined style={{ fontSize: 17 }} />
                         </button>
                         <Popconfirm
                              key={3}
                              title="Delete the project"
                              description="Are you sure to delete this task?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => {
                                   dispatch({
                                        type: 'DELETE_PROJECT_AUTHOR',
                                        project: record,
                                        typeNoti: 'success'
                                   })
                              }}
                         >
                              <button className="btn btn-danger">
                                   <DeleteOutlined style={{ fontSize: 17 }} />
                              </button>
                         </Popconfirm>



                    </div>
               },

          },



     ];

     const onChange = (pagination, filters, sorter, extra) => {
          // console.log('params', pagination, filters, sorter, extra);

     };
     return (
          <div>
               {/* <h3>Project Management</h3> */}
               <Table key={1} columns={columns} dataSource={data} onChange={onChange}  size="small" />
          </div>
     )
}
