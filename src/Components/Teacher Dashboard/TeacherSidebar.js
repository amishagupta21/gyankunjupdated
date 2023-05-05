import {
    Menu,
    MenuItem,
    SidebarContent,
    ProSidebar,
  } from "react-pro-sidebar";
  import './TeacherSidebar.css'
  import SidebarBackground from '../../Images/SidebarBackground_1.png'
  import dashboardImg from "../../Images/dashboardImg.svg";
import masterRoutine from "../../Images/MasterRoutine.png";
import LessonPlan from "../../Images/LessonPlan.png";
import Attendance from "../../Images/Attendance.png";
import Reports from "../../Images/Reports.png";
import Resources from "../../Images/Resources.png";
import Announcements from "../../Images/Announcements.png";
import Notifications from "../../Images/Notifications.png";
  import { Row, Col } from "react-bootstrap";
  import { Link } from 'react-router-dom';
  import * as myConstant from '../fileConstant'
  
  const TeacherSidebar = () => {
    return (
      <div className="sidebarStyling" 
      style={{ background: `url(${SidebarBackground})`, height: "991px" }}
      >
        
          <ProSidebar>
            <SidebarContent>
            <Menu
              className="sidebarMenu"
              
            >
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={dashboardImg} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.dashboard}>Dashboard</Link></MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={masterRoutine} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"> <Link to={myConstant.teacherRoutesConfig.mySubjects}> My Subjects </Link> </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={Attendance} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.logBook}> Log Book</Link> </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={LessonPlan} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.lessonPlan}> Lesson Plan </Link></MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={Attendance} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.attendance}> Attendance</Link> </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={Reports} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.assignments}> Assignments</Link> </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={Resources} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.TeacherResources}> Resources </Link></MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={dashboardImg} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.TeacherReport}> Report </Link> </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={Announcements} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.AnnouncementsForTeacher}> Notice </Link> </MenuItem>
                </Col>
              </Row>
              <Row className="sidebarMenuInner">
                <Col md={2}>
                  <img alt="close" src={Notifications} />
                </Col>
                <Col md={10} style={{textAlign:"left"}}>
                  <MenuItem className="menuItemStyle"><Link to={myConstant.teacherRoutesConfig.NotificationsForTeacher}> Notifications </Link> </MenuItem>
                </Col>
              </Row>
            </Menu>
            </SidebarContent>
          </ProSidebar>
          
      </div>
    );
  };
  
  export default TeacherSidebar;
  