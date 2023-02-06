import React, { useEffect, useState } from 'react'
import { Button, Input, Menu, version, label, Layout, Slider } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import Search from 'antd/es/transfer/search';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { singinCyberBugsAction } from '../../../redux/actions/LoginCyberBugActions';
import Sider from 'antd/es/layout/Sider';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/constants/LoginCyberBugConst';
import { useNavigate } from 'react-router-dom';


function LoginCyberBugs(props) {
     let navi = useNavigate();
     let [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
     
     useEffect(() => {
          window.onresize = () => {
               setSize({
                    width: window.innerWidth,
                    height: window.innerHeight
               })
          }
          return () => {

          }
     }, [])

     const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          displayName,


     } = props;
     // console.log('props', props)
     return (

          <Layout>
               <Sider width={Math.round(width / 2)} style={{ backgroundImage: `url(https://picsum.photos/${width}/${height})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: Math.round(height) }} ></Sider>
               <Layout>
                    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }} >
                         <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
                              <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>LOGIN CYBERBUGS</h3>
                              <h5 className="text-center" style={{ fontWeight: 300, fontSize: 25 }}>Antd ver {version}</h5>

                              <div className="d-flex mt-3" >
                                   <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                              </div>
                              <label>{errors.email && touched.email ? <div>{errors.email}</div> : null}</label>
                              <div className="d-flex mt-3">
                                   <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                              </div>
                              <label>{errors.password && touched.password ? <div>{errors.password}</div> : null}</label>

                              <Button htmlType='submit' size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Login</Button>


                              <div className="social mt-3 d-flex">
                                   <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={"large"}>
                                        <span className="font-weight-bold" style={{ color: '#fff' }} >F</span>
                                   </Button>
                                   <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}>

                                   </Button>

                                   {/* <Menu
                              defaultOpenKeys={['test2']}
                              mode='inline'
                              items={[
                                   { label: 'test', key: 'test' },
                                   { label: (<Input.Search placeholder='Search here...' />), key: 'search' },
                                   {
                                        label: 'test2', key: 'test2', children: [
                                             { label: 'test', key: 'test', icon: <MoneyCollectOutlined /> },
                                             { label: 'test3', key: 'test3' },

                                        ],
                                   },
                                   { label: 'test3', key: 'test3', danger: true },
                              ]}
                         /> */}
                                   {/* <Input  style={{ width: '100%', minWidth: 300 }} type="text" name="use" placeholder='test Input' /> */}
                              </div>
                         </div>

                    </form>
               </Layout>
          </Layout>
     )
}

const LoginCyberBugsWithFormik = withFormik({
     mapPropsToValues: () => ({
          email: '',
          password: ''
     }),

     validationSchema: Yup.object().shape({
          password: Yup.string()
               .min(2, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
     }),
     // values = {email, password}
     handleSubmit: ({ email, password }, { setSubmitting, props }) => {
          // console.log('naviProps', props)
          

          props.dispatch(singinCyberBugsAction(email, password))
          
          // props.dispatch(singinCyberBugsAction(email, password))
     },

     displayName: 'Login CyberBugs',
})(LoginCyberBugs)

export default connect()(LoginCyberBugsWithFormik)