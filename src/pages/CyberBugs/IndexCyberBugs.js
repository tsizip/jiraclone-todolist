import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import Main from '../../components/CyberBugs/Main'
import Content from '../../components/CyberBugs/main/Content'
import Header from '../../components/CyberBugs/main/Header'
import Info from '../../components/CyberBugs/main/Info'
import Menu from '../../components/CyberBugs/Menu'
import InfoModalCyberBugs from '../../components/CyberBugs/modalCyberbugs/InfoModalCyberBugs'
import SearchModalCyberBugs from '../../components/CyberBugs/modalCyberbugs/SearchModalCyberBugs'
import SideBar from '../../components/CyberBugs/SideBar'
import '../../index.css'
import { getAllProjectManaAction } from '../../redux/actions/ProjectCyberBugAction'

import parse from 'html-react-parser';

export default function IndexCyberBugs() {

     // let [state,setState] = useState(1)
     // console.log('state', state)
     let dispatch = useDispatch()
     let { idProject } = useParams();
     // // console.log(idProject)
     let dataDetail = useSelector(state=>state.ProjectManagementReducer.projectDetail)
     // console.log('data cua project', dataDetail)
     useEffect(() => {

          // dispatch(getAllProjectManaAction())
          dispatch({
               type:'GET_PROJECT_DETAIL',
               id: idProject
          })
          // // console.log('idProject')
          // console.log('dataDetail', dataDetail)
          // setState(state+=1)
          // console.log('setState', state)
     },[])


     return (

          <div className='jira'>
               <SideBar />
               <Menu />
               <div className='main'>
                    {/* <button onClick={()=>{
                         // console.log('first,',dataDetail)
                    }}>click</button> */}
                    <Header infoProject={dataDetail} />
                    <h3>{dataDetail.content?.projectName}</h3>
                    <p>
                         {parse(`${dataDetail.content?.description}`)}
                    </p>
                    <Info members={dataDetail} />
                    <Content projectDetail={dataDetail} idProject={idProject} />
               </div>

               {/* modal */}
               {/* <SearchModalCyberBugs /> */}
               {/* <InfoModalCyberBugs /> */}

          </div>

     )
}
