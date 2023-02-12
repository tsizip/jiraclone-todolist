import React, { useState } from 'react';
import {
     FileSearchOutlined,
     MenuFoldOutlined,
     MenuUnfoldOutlined,
     PlusSquareOutlined,
     UploadOutlined,
     UserOutlined,
     VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useDispatch } from 'react-redux';
import ModalCreateTaskCyberBugs from '../../pages/CyberBugs/Forms/ModalCreateTaskCyberBugs';
const { Header, Sider, Content } = Layout;

export default function SideBar() {
     let dispatch = useDispatch()
     const [collapsed, setCollapsed] = useState(true);
     const {
          token: { colorBgContainer },
     } = theme.useToken();
     return (
          <>


               <Sider trigger={null} collapsible collapsed={collapsed} >
                    <Header
                         style={{
                              padding: 5,
                              background: colorBgContainer,
                              textAlign: 'center',
                              backgroundColor: '#001529',
                              color: 'white',
                              fontSize: '25px'
                         }}
                    >
                         {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                              className: 'trigger',
                              onClick: () => setCollapsed(!collapsed),
                         })}
                    </Header>
                    <div className="logo" />
                    <Menu
                         style={{ height: '100%' }}
                         theme="dark"
                         mode="inline"
                         defaultSelectedKeys={['1']}
                         
                         items={[
                              // {
                              //      key: '1',
                              //      icon: <FileSearchOutlined />,
                              //      label: 'Search issue',
                                   
                              // },
                              {
                                   key: '1',
                                   icon: <PlusSquareOutlined />,
                                   label: 'Create issue',
                                   onClick:()=>{
                                        dispatch({
                                             type:'SHOW_ADD_TASK',
                                             Component: <ModalCreateTaskCyberBugs/>
                                        })
                                   }
                              },
                              // {
                              //      key: '3',
                              //      icon: <UploadOutlined />,
                              //      label: 'nav 3',
                              // },
                         ]}
                    />
               </Sider>
          </>
     )
}
