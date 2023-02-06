import { Avatar } from 'antd'
import React from 'react'
import Content from './Content'

export default function Info(props) {
     // console.log('props members', props.members)
     let dataMem = props.members
     // console.log('info', members)
     const renderMember = ()=>{
          return dataMem.content?.members.map((member, index)=>{
               return <Avatar key={index} src={member.avatar}>
                    {member.name}
               </Avatar>
          })
     }

     return (
          <div className="info" style={{ display: 'flex' }}>
               <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
               </div>
               <div className="avatar-group" style={{ display: 'flex' }}>
                    {/* <div className="avatar">
                         <img src="../../../assets/img/download (1).jfif" alt />
                    </div>
                    <div className="avatar">
                         <img src="../../../assets/img/download (2).jfif" alt />
                    </div>
                    <div className="avatar">
                         <img src="../../../assets/img/download (3).jfif" alt />
                    </div> */}
                    {renderMember()}
               </div>
               <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
               <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
          </div>


     )
}
