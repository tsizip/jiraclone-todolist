import React, { Fragment, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Routes, Route, BrowserRouter, Navigate, useNavigate, Router } from "react-router-dom";
import Detail from "./components/Detail/Detail";

import NavBar from "./components/home/NavBar";
import Loading from "./components/loading/Loading";
import Login from "./components/Login/Login";
import About from "./pages/about/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Pnf from "./pages/Pnf";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import ToDoListReducer from "./pages/Todolist/ToDoListRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";

import { useDispatch, useSelector } from 'react-redux'
import DemoHOCModal from "./pages/demoHOCmodal/DemoHOCModal";
import Modal from "./HOC/modal/Modal";
import SlideShow from "./HOC/modal/SlideShow";
import { HomeTemplate } from "./templates/homeTemplate/HomeTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";

import { USER_SIGNIN_API } from "./redux/constants/LoginCyberBugConst";
import IndexCyberBugs from "./pages/CyberBugs/IndexCyberBugs";
import './index.css'
import CreateProjCyberBugs from "./pages/CyberBugs/CreateProject/CreateProjCyberBugs";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import ModalCyberBugs from "./components/CyberBugs/modalCyberbugs/ModalCyberBugs";
import Notification from "./components/Notification/Notification";
import DragDrops from "./DragDrops/DragDrops";
import DragAndDropLib from "./DragAndDropDemoLib/DragAndDropLib";



function App() {
  let isLogin = useSelector(state=>state.CyberBugReducer.isLogin);
  let pending = useSelector(state => state.LoadingReducer.isActive)
  let TestSlideShow = () => { return new SlideShow(Login) }

  let history = useNavigate();
  // let redirect = useNavigate()
  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch({
      type:'ADD_HIS',
      history: history
    })
  })
  return (
    <Fragment>

      <>
      <ModalCyberBugs/>
      {/* <Notification/> */}
     
        {/* <NavBar /> */}
        {/* <Modal /> */}
        {/* <Detail/> */}
        {pending ? <Loading /> : ''}
        <Routes  >
          <Route path="/about" element={<About />} />
          {/* ứng dụng HOC, chỉ trang home mới có navBar */}
          {/* <Route path="/home" element={<div><NavBar/><Home /></div>}/> */}


          {/* ứng dụng HOC viết thành template, rườm rà hơn */}
          <Route path="/home" element={
            <div>
              <NavBar />
              <LoginCyberBugs  />
            </div>
          } />


          {/* vừa cmt lại để test dragdrop */}
          {/* gõ path sai thì mặc định quay về Home */}
          <Route path="/" element={<div><LoginCyberBugs  /></div>} />  
          {/* tét dragdrop */}
          <Route path="/dragdrop" element={<div><NavBar/><DragDrops/></div>} />
          <Route path="/dragdroplib" element={<div><NavBar/><DragAndDropLib/></div>} />


          <Route path="*" element={<Pnf />} />
          <Route path="/login" element={<div><LoginCyberBugs /></div>} />
          {/* <Route path="/login" element={isLogin ? <Navigate to='/todolistsaga' replace /> : <div><NavBar /><LoginCyberBugs /></div>} /> */}
          {/* <Route path="/login" element={<TestSlideShow />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/todolistrfc" element={<TodolistRFC />} />
          <Route path="/todolistrcc" element={<Todolist />} />
          <Route path="/todolistredux" element={<ToDoListRedux />} />
          <Route path="/todolistsaga" element={<BaiTapToDoListSaga />} />
          <Route path="/demohocmodal" element={<DemoHOCModal />} />
          
          {/* <Route path="/loading" element={<Loading />} /> */}

          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile" element={localStorage.getItem('userLogin') ? <Profile /> : <Navigate to='/pnf' replace />} /> {/*nếu đã từng login có lưu tt trên localStore thì gõ vào thẳng Profile, còn không thì chuyển hướng sang page not found bằng thẻ Navigate*/}

          <Route exact path="/detail/:id" element={<Detail />} />
          <Route path="/pnf" element={<Pnf />} />


          {/* cyber bugs */}
          <Route path="/cyberbugs/:idProject" element={localStorage.getItem('USER_LOGIN') ? <IndexCyberBugs/> : <Navigate to='/pnf' replace />} />
          <Route path="/createproject" element={localStorage.getItem('USER_LOGIN') ? <CreateProjCyberBugs/> : <Navigate to='/pnf' replace />} />
          <Route path="/projectmanagement" element={localStorage.getItem('USER_LOGIN') ? <div><NavBar/><ProjectManagement/></div> : <Navigate to='/pnf' replace />} />
          <Route path="/modalcyberbugs" element={<ModalCyberBugs/>} />


        </Routes>
      </>
    </Fragment>
  );
}

export default App;
