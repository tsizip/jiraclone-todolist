import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../index.css'
// import '../../App.css'
import {ProjectOutlined} from '@ant-design/icons'

export default function Menu() {

     const styleNavLink = {
          listStyle: 'none',
          textDecoration: 'none',
          color: 'black',
     }
     let activeClassName = 'active font-weight-bold ml-2'
     let cln = ({ isActive }) => {
          return isActive ? activeClassName : 'ml-2'
     }
     return (
          <div className="menu" style={{height:'100%'}}>
               <div className="account">
                    <div className="avatar">
                         <img src="http://visuresolutions.com/wp-content/uploads/2022/07/Logo-Jira.png" alt='123' />
                    </div>
                    <div className="account-info">
                         <p>Jira clone</p>
                         <p>Report bugs</p>
                    </div>
               </div>
               <div className="control">
                   

                    <div>
                         <i className="fa fa-cog " />
                         <NavLink style={styleNavLink} to={'/createproject'} className={cln}>Create Project</NavLink>
                    </div>

                    <div>
                         {/* <i className="fa fa-cog " /> */}
                         <i className="fa fa-project-diagram"></i>
                         {/* <ProjectOutlined /> */}
                         <NavLink style={styleNavLink} to={'/projectmanagement'} className={cln}>Project Mana</NavLink>
                    </div>

               </div>
               <div className="feature">
                    <div style={{cursor:'no-drop'}}>
                         <i className="fa fa-truck " />
                         <span>Releases</span>
                    </div>
                    <div style={{cursor:'no-drop'}}>
                         <i className="fa fa-equals " />
                         <span>Issues and filters</span>
                    </div>
                    <div style={{cursor:'no-drop'}}>
                         <i className="fa fa-paste " />
                         <span>Pages</span>
                    </div>
                    <div style={{cursor:'no-drop'}}>
                         <i className="fa fa-location-arrow " />
                         <span>Reports</span>
                    </div>
                    <div style={{cursor:'no-drop'}}>
                         <i className="fa fa-box " />
                         <span>Components</span>
                    </div>
               </div>
          </div>

     )
}
