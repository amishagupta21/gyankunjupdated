import './App.css';
import HeaderComp from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardSectionContent from './Components/DashboardSectionContent'
import MasterRoutine from './Components/Principal Dashboard/MasterRoutine/MasterRoutine';
import Footer from './Components/Footer'
import PrincipalDashboard from './Components/Principal Dashboard/PrincipalDashboard';
import LessonPlan from './Components/Principal Dashboard/Lesson Plan/LessonPlan';
import AttendanceOverview from './Components/Principal Dashboard/Attendance/AttendanceOverview';
import ReportSection from './Components/Principal Dashboard/Reports/Reports';
import Resources from './Components/Principal Dashboard/Resources/ResourcesList';
import Announcements from './Components/Principal Dashboard/Announcement/Announcement';
import Notifications from './Components/Principal Dashboard/Notifications/Notifications';
import TeacherDashboard from './Components/Teacher Dashboard/TeacherDashboard'
import TDashboard from './Components/Teacher Dashboard/Dashboard/Dashboard';
import MySubjects from './Components/Teacher Dashboard/My Subject/MySubjects';
import TLessonPlan from './Components/Teacher Dashboard/LessonPlan/LessonPlan';
import { Router, Route, Routes, Switch } from "react-router-dom";
import LogBook from './Components/Teacher Dashboard/LogBook/LogBook';
import { ProtectedWrapper } from './ProtectedRoute'
import PDashboard from './Components/Principal Dashboard/Dashboard';
import PrincipalSidebar from './Components/Principal Dashboard/PrincipalSidebar';

import { Row, Col, Modal } from "react-bootstrap";
import TeacherReport from './Components/Teacher Dashboard/Teacher Report/TeacherReport';
import CreateAssignment from './Components/Teacher Dashboard/Assignment/CreateAssignment';
import TeacherAttendance from './Components/Teacher Dashboard/TeacherAttendance/TeacherAttendance';
import TeacherAssignment from './Components/Teacher Dashboard/Assignment/TeacherAssignment';
import ResourcesForTeacher from './Components/Teacher Dashboard/ResourcesForTeacher/ResourcesForTeacher';
import NoticeForTeacher from './Components/Teacher Dashboard/NoticeForTeacher/NoticeForTeacher';
import NotificationsForTeacher from './Components/Teacher Dashboard/NotificationsForTeacher/NotificationsForTeacher';
import StudentAssigments from './Components/Student Dashboard/Assignments/Assignments';

import StudentDashboard from './Components/Student Dashboard/StudentDashboard';
import StudentReportSection from './Components/Student Dashboard/Report/Reports';
import ResourcesForStudents from './Components/Student Dashboard/Resources/StudentResources';
import NoticeForStudents from './Components/Student Dashboard/NoticeForStudents/NoticeForStudents';
import NotificationsForStudent from './Components/Student Dashboard/Notification/StudentNotification';
import Addquestions from './Components/Teacher Dashboard/Assignment/Addquestions';


function App() {
  return (


      <div className="App">
        <HeaderComp />

        <Routes>

          <Route path="/principalDashboard/Dashboard" element={<ProtectedWrapper Component={PDashboard} />} />
          <Route path="/principalDashboard/masterRoutine" element={<ProtectedWrapper Component={MasterRoutine} />} />
          <Route path="/principalDashboard/LessonPlan" element={<ProtectedWrapper Component={LessonPlan} />} />
          <Route path="/principalDashboard/AttendanceOverview" element={<ProtectedWrapper Component={AttendanceOverview} />} />
          <Route path="/principalDashboard/Reports" element={<ProtectedWrapper Component={ReportSection} />} />
          <Route path="/principalDashboard/Resources" element={<ProtectedWrapper Component={Resources} />} />
          <Route path="/principalDashboard/Announcements" element={<ProtectedWrapper Component={Announcements} />} />
          <Route path="/principalDashboard/Notifications" element={<ProtectedWrapper Component={Notifications} />} />

          <Route path="/teacherDashboard/Dashboard" element={<ProtectedWrapper Component={TDashboard} />} />
          <Route path="/teacherDashboard/CreateAssignment" element={<ProtectedWrapper Component={CreateAssignment} />} />
          <Route path="/teacherDashboard/Addquestions" element={<ProtectedWrapper Component={Addquestions} />} />
          <Route path="/teacherDashboard/Subjects" element={<ProtectedWrapper Component={MySubjects} />} />
          <Route path="/teacherDashboard/LogBook" element={<ProtectedWrapper Component={LogBook} />} />
          <Route path="/teacherDashboard/LessonPlan" element={<ProtectedWrapper Component={TLessonPlan} />} />
          <Route path="/teacherDashboard/Reports" element={<ProtectedWrapper Component={TeacherReport} />} />
          <Route path="/teacherDashboard/Attendance" element={<ProtectedWrapper Component={TeacherAttendance} />} />
          <Route path="/teacherDashboard/Assignment" element={<ProtectedWrapper Component={TeacherAssignment} />} />
          <Route path="/teacherDashboard/Resources" element={<ProtectedWrapper Component={ResourcesForTeacher} />} />
          <Route path="/teacherDashboard/Announcements" element={<ProtectedWrapper Component={NoticeForTeacher} />} />
          <Route path="/teacherDashboard/Notifications" element={<ProtectedWrapper Component={NotificationsForTeacher} />} />

          <Route path="/studentDashboard/Dashboard" element={<ProtectedWrapper Component={StudentDashboard} />} />
          <Route path="/studentDashboard/Reports" element={<ProtectedWrapper Component={StudentReportSection} />} />
          <Route path="/studentDashboard/Assignment" element={<ProtectedWrapper Component={StudentAssigments} />} />
          <Route path="/studentDashboard/Resources" element={<ProtectedWrapper Component={ResourcesForStudents} />} />
          <Route path="/studentDashboard/Notice" element={<ProtectedWrapper Component={NoticeForStudents} />} />
          <Route path="/studentDashboard/Notifications" element={<ProtectedWrapper Component={NotificationsForStudent} />} />
          <Route exact path="/" Component={DashboardSectionContent} />
        </Routes>


      </div>
  );
}

export default App;
