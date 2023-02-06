import React from 'react'
import Menu from '../../../components/CyberBugs/Menu'
import InfoModalCyberBugs from '../../../components/CyberBugs/modalCyberbugs/InfoModalCyberBugs'
import SearchModalCyberBugs from '../../../components/CyberBugs/modalCyberbugs/SearchModalCyberBugs'
import ProjectManagementComponent from '../../../components/CyberBugs/projectManagementCyberBugs/ProjectManagementComponent'
import SideBar from '../../../components/CyberBugs/SideBar'

export default function ProjectManagement() {
     
     return (
          <div className='jira'>
               <SideBar />
               <Menu />
               <div className='main container  pb-5'>
                    <ProjectManagementComponent />
               </div>

               {/* modal */}
               <SearchModalCyberBugs />
               <InfoModalCyberBugs />

          </div>
     )
}
