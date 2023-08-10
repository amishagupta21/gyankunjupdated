import React, { useEffect, useState } from 'react'
import {Row, Col, Table, Button} from 'react-bootstrap'
import StudentSidebar from '../StudentSidebar'
import {studentAssignmentList} from '../../../ApiClient'
import AssignmentSheet from './StartAssignment'
import moment from 'moment'

const StudentAssigments = () => {

  const [showAssignmentSheet, setShowAssignmentSheet] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('UserData'))
  const [assignmentFullList, setAssignmentFullList] = useState([])
  const [editIndex, setEditIndex] = useState(null)

    useEffect(() => {
        fetchStudentAssignments();
        console.log("LIST",assignmentFullList);
    }, [])

    const fetchStudentAssignments = () => {
        const student_id = userDetails.user_id
        console.log("ID",student_id);
        studentAssignmentList(student_id)
        .then((res) => setAssignmentFullList(res.data))
        .catch((err) => console.log("Assignment Tab err - ", err))
    }

    const startAssignment = (id) => {
      setEditIndex(id)
      setShowAssignmentSheet(true)
    }

    const closeAssignment = () => {
      setShowAssignmentSheet(false)
    }


    return (
        <>
        <Row>
          <Col md={3} style={{ marginTop: "91px", width:"20%"}}>
            <StudentSidebar />
          </Col>
          <Col md={9} style={{ marginTop: "91px", width:"79%"}}>
        <Row style={{marginBottom:"20px"}}>
              
                <div className="assignmentTabData">
                <Row
                style={{
                  height: "68px",
                  boxShadow: "0px 3px 6px #B4B3B329",
                  position: "relative",
                  left: "12px",
                  width: "100%",
                }}
              >
                <Col md={4}>
                  <h4>New Assignment</h4>
                </Col>
                {/* <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Section"
                      isSearchable={false}
                      options={sectionOptions}
                      onChange={(e) => handlesectionToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Class"
                      isSearchable={false}
                      options={classOptions}
                      onChange={(e) => handlegradeToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} style={{ marginTop: "17px" }}>
                  <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={dateToFetchLog}
                    onChange={(e) => setDateToFetchLog(e.target.value)}
                  />
                </Col>
                <Col md={1} style={{ paddingTop: "17px" }}>
                  <Button variant="outline-primary" onClick={getLogBook}>
                    Search
                  </Button>
                </Col> */}
              </Row>
              <Row md={12} style={{justifyContent:"space-evenly", paddingTop:"20px"}}>
                <Col md={12} className="AssignmentDetails">
                <Table striped hover>
                  <thead>
                    <tr
                      style={{
                        background: "#7A9ABF 0% 0% no-repeat padding-box",
                        borderRadius: "4px 4px 0px 0px",
                        opacity: "1",
                      }}
                    >
                      <th>Sl. No.</th>
                      <th>Subject</th>
                      <th>Details</th>
                      <th>Actions</th>
                      <th>Assigned on</th>
                    </tr>
                  </thead>
                  {assignmentFullList?.student_assignments?.map(
                    (assignment, indx) => {
                      return assignment?.assignment_status == "New" && (
                        <tbody>
                          <tr>
                            <td>{indx + 1}</td>
                            <td>Maths</td>
                            <td>{assignment?.assignment_name}</td>
                            <td><Button variant="outline-primary" onClick={() => startAssignment(assignment?.assignment_id)}>Start</Button></td>
                            {showAssignmentSheet && editIndex === assignment?.assignment_id && <AssignmentSheet show={showAssignmentSheet} onHide={closeAssignment} assignmentId={assignment?.assignment_id} assignmentType = {assignment?.assignment_type_name} assignmentName = {assignment?.assignment_name} />}
                            <td>{moment(assignment?.assigned_on).format(
                                  "DD-MMM-YYYY"
                                )}</td>
                          </tr>
                        </tbody>
                      )
                      // :
                      // (<p>No Assignments Available!!</p>)
                    }
                    
                  )}
               
                </Table>
                </Col>
              </Row>

                </div>
            </Row>

            <Row style={{marginBottom:"20px"}}>
              
                <div className="assignmentTabData">
                <Row
                style={{
                  height: "68px",
                  boxShadow: "0px 3px 6px #B4B3B329",
                  position: "relative",
                  left: "12px",
                  width: "100%",
                }}
              >
                <Col md={4}>
                  <h4>In Progress Assignment</h4>
                </Col>
              </Row>
              <Row md={12} style={{justifyContent:"space-evenly", paddingTop:"20px"}}>
                <Col md={12} className="AssignmentDetails">
                <Table striped hover>
                  <thead>
                    <tr
                      style={{
                        background: "#7A9ABF 0% 0% no-repeat padding-box",
                        borderRadius: "4px 4px 0px 0px",
                        opacity: "1",
                      }}
                    >
                      <th>Sl. No.</th>
                      <th>Subject</th>
                      <th>Details</th>
                      <th>Actions</th>
                      <th>Assigned on</th>
                    </tr>
                  </thead>
                  {assignmentFullList?.student_assignments?.map(
                    (assignment, indx) => {
                      // return assignment?.assignment_status == "Inprogress" ? 
                      return assignment?.assignment_status == "Inprogress" && (
                        <tbody>
                          <tr>
                            <td>{indx + 1}</td>
                            <td>Maths</td>
                            <td>{assignment?.assignment_name}</td>
                            <td><Button variant="outline-primary">Open</Button></td>
                            <td>{moment(assignment?.assigned_on).format(
                                  "DD-MMM-YYYY"
                                )}</td>
                          </tr>
                        </tbody>
                      )
                      // :
                      // (<p>No Assignments Available!!</p>)
                    }
                  )}
                </Table>
                </Col>
              </Row>

                </div>
            </Row>

            <Row style={{marginBottom:"20px"}}>
              
                <div className="assignmentTabData">
                <Row
                style={{
                  height: "68px",
                  boxShadow: "0px 3px 6px #B4B3B329",
                  position: "relative",
                  left: "12px",
                  width: "100%",
                }}
              >
                <Col md={4}>
                  <h4>Submitted Assignment</h4>
                </Col>
                {/* <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Section"
                      isSearchable={false}
                      options={sectionOptions}
                      onChange={(e) => handlesectionToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} className="teacherRoutingDD">
                  <span>
                    <Select
                      placeholder="Class"
                      isSearchable={false}
                      options={classOptions}
                      onChange={(e) => handlegradeToFetchLog(e)}
                    />
                  </span>
                </Col>
                <Col md={2} style={{ marginTop: "17px" }}>
                  <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={dateToFetchLog}
                    onChange={(e) => setDateToFetchLog(e.target.value)}
                  />
                </Col>
                <Col md={1} style={{ paddingTop: "17px" }}>
                  <Button variant="outline-primary" onClick={getLogBook}>
                    Search
                  </Button>
                </Col> */}
              </Row>
              <Row md={12} style={{justifyContent:"space-evenly", paddingTop:"20px"}}>
                <Col md={12} className="AssignmentDetails">
                <Table striped hover>
                  <thead>
                    <tr
                      style={{
                        background: "#7A9ABF 0% 0% no-repeat padding-box",
                        borderRadius: "4px 4px 0px 0px",
                        opacity: "1",
                      }}
                    >
                      <th>Sl. No.</th>
                      <th>Subject</th>
                      <th>Details</th>
                      <th>Actions</th>
                      <th>Assigned on</th>
                      <th></th>
                    </tr>
                  </thead>
                  {assignmentFullList?.student_assignments?.map(
                    (assignment, indx) => {
                      // return assignment?.assignment_status == "Submitted" ? (
                        return assignment?.assignment_status == "Submitted" && <tbody>
                          <tr>
                            <td>{indx + 1}</td>
                            <td>Maths</td>
                            <td>{assignment?.assignment_name}</td>
                            <td>{assignment?.assignment_status}</td>
                            <td>{moment(assignment?.assigned_on).format(
                                  "DD-MMM-YYYY"
                                )}</td>
                          </tr>
                        </tbody>
                      // )
                      // :
                      // (<p>No Assignments Available!!</p>)
                    }
                  )}
                </Table>
                </Col>
              </Row>

                </div>
            </Row>
            </Col>
            </Row>
            
        </>
    )
}

export default StudentAssigments;