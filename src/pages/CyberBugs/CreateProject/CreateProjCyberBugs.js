import React from 'react'
import CreateProjCyberBugComponent from '../../../components/CyberBugs/createProjCyberBugs/CreateProjCyberBugComponent'
import Menu from '../../../components/CyberBugs/Menu'
import InfoModalCyberBugs from '../../../components/CyberBugs/modalCyberbugs/InfoModalCyberBugs'
import SearchModalCyberBugs from '../../../components/CyberBugs/modalCyberbugs/SearchModalCyberBugs'
import SideBar from '../../../components/CyberBugs/SideBar'

export default function CreateProjCyberBugs() {
     return (
          <div className='jira'>
               <SideBar />
               <Menu />
               <div className='main container'>
                    <CreateProjCyberBugComponent/>
               </div>

               {/* modal */}
               <SearchModalCyberBugs />
               <InfoModalCyberBugs />

          </div>
     )
}
