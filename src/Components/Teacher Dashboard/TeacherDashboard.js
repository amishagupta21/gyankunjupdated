import React from 'react';
import './TeacherDashboard.css'
import TDashboard from '../Teacher Dashboard/Dashboard/Dashboard'
import MySubjects from './My Subject/MySubjects'
import { Row, Col, Modal } from "react-bootstrap";
import { Router, Route, Routes } from "react-router-dom";
import TeacherSidebar from './TeacherSidebar'
import LogBook from './LogBook/LogBook'

const TeacherDashboard = () => {
    return (
      <>
        <Row className="dflex">
          <Col md={3} className="dashboardMain" style={{width:"20%"}}>
            <TeacherSidebar />
          </Col>
          <Col md={9} style={{width:"80%"}}>
            {/* <TDashboard />
            <MySubjects /> */}
          <Routes>
            <Route path="/teacherDashboard/Dashboard" Component={TDashboard} />
            <Route path="/teacherDashboard/Subjects"   Component={MySubjects} />
            <Route
              path="/teacherDashboard/LogBook"
              Component={LogBook}
            />
             {/* <Route
              path="/principalDashboard/AttendanceOverview"
              Component={AttendanceOverview}
            />
            <Route
              path="/principalDashboard/Reports"
              Component={ReportSection}
            />
            <Route
              path="/principalDashboard/Resources"
              Component={Resources}
            />
            <Route
              path="/principalDashboard/Announcements"
              Component={Announcements}
            />
            <Route
              path="/principalDashboard/Notifications"
              Component={Notifications}
            /> */}
          </Routes>
          </Col>
        </Row>
      </>
    );
}

export default TeacherDashboard;