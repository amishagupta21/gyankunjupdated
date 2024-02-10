import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, Card } from 'react-bootstrap'
import StudentSidebar from '../StudentSidebar'
import { studentAssignmentList } from '../../../ApiClient'
import AssignmentSheet from './StartAssignment'
import moment from 'moment'

const StudentAssigments = () => {

  const [showAssignmentSheet, setShowAssignmentSheet] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('UserData'))
  const [assignmentFullList, setAssignmentFullList] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [assignmentId, setAssignmentId] = useState(null);
  const [assignmentType, setAssignmentType] = useState(null);
  const [assignmentName, setAssignmentName] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});




  useEffect(() => {
    fetchStudentAssignments();
    console.log("LIST", assignmentFullList);
  }, [])

  const fetchStudentAssignments = () => {
    const student_id = userDetails.user_id;
    studentAssignmentList(student_id)
      .then((res) => {
        setAssignmentFullList(res.data);
        console.log("Assignment Data:", res.data);
      })
      .catch((err) => console.log("Assignment Tab err - ", err));
  };


  const startAssignment = (id) => {
    setEditIndex(id);
    setShowAssignmentSheet(true);
    const assignment = assignmentFullList?.student_assignments.find(assignment => assignment.assignment_id === id);
    if (assignment) {
      setAssignmentId(assignment.assignment_id);
      setAssignmentType(assignment.assignment_type_name);
      setAssignmentName(assignment.assignment_name);
      setSelectedAnswers(assignment.selected_answers || {}); 
    }
  };


  const closeAssignment = () => {
    setShowAssignmentSheet(false)
  }


  return (
    <>
      <Row>
        <Col md={3} style={{ marginTop: "91px", width: "20%" }}>
          <StudentSidebar />
        </Col>
        <Col md={9} style={{ marginTop: "91px", width: "79%" }}>
          <Row style={{ marginBottom: "20px" }}>

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
              <Row md={12} style={{ justifyContent: "space-evenly", paddingTop: "20px" }}>
                <Col md={12} className="AssignmentDetails">
                  <Table striped bordered hover>
                    <thead>
                      <tr style={{ background: "#7A9ABF", borderRadius: "4px", opacity: "1", color: "white" }}>
                        <th>Sl. No.</th>
                        <th>Subject</th>
                        <th>Assignment Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Assigned On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignmentFullList?.student_assignments?.map((assignment, indx) => {
                        return assignment?.assignment_status === "New" && (
                          <tr key={assignment.assignment_id} style={{ background: indx % 2 === 0 ? "#f2f2f2" : "white" }}>
                            <td>{indx + 1}</td>
                            <td>{assignment.subject_name}</td>
                            <td>{assignment.assignment_name}</td>
                            <td>{assignment.assignment_type_name}</td>
                            <td>{assignment.assignment_status}</td>
                            <td>{moment(assignment?.assigned_on).format("DD-MMM-YYYY")}</td>
                            <td>
                              <Button variant="primary" onClick={() => startAssignment(assignment.assignment_id)}>Open</Button>
                              {showAssignmentSheet && editIndex === assignment.assignment_id && (
                                <AssignmentSheet
                                  show={showAssignmentSheet}
                                  onHide={closeAssignment}
                                  assignmentId={assignment.assignment_id}
                                  assignmentType={assignment.assignment_type_name}
                                  assignmentName={assignment.assignment_name}
                                  setAssignmentFullList={setAssignmentFullList}
                                />
                              )}


                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>


            </div>
          </Row>

          <Card className="mb-4">
            <Card.Body>
              <h4>In Progress Assignments</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Subject</th>
                    <th>Assignment Name</th>
                    <th>Assigned On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentFullList?.student_assignments?.map((assignment, index) => (
                    (assignment?.assignment_status === "Inprogress" || assignment?.assignment_status === "In Progress") && (
                      <tr key={assignment.assignment_id}>
                        <td>{index + 1}</td>
                        <td>{assignment.subject_name}</td>
                        <td>{assignment.assignment_name}</td>
                        <td>{moment(assignment.assigned_on).format("DD-MMM-YYYY")}</td>
                        <td>
                          <Button variant="primary" onClick={() => startAssignment(assignment.assignment_id)}>Continue</Button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </Table>
            </Card.Body>

          </Card>

          {showAssignmentSheet && (
            <AssignmentSheet
              show={showAssignmentSheet}
              onHide={closeAssignment}
              assignmentId={assignmentId}
              assignmentType={assignmentType}
              assignmentName={assignmentName}
              setAssignmentFullList={setAssignmentFullList}
            />
          )}
          <Card className="mb-4">
            <Card.Body>
              <h4>Submitted Assignments</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Subject</th>
                    <th>Assignment Name</th>
                    <th>Status</th>
                    <th>Assigned On</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentFullList?.student_assignments?.map((assignment, index) => (
                    assignment?.assignment_status === "Submitted" && (
                      <tr key={assignment.assignment_id}>
                        <td>{index + 1}</td>
                        <td>{assignment.subject_name}</td>
                        <td>{assignment.assignment_name}</td>
                        <td>{assignment.assignment_status}</td>
                        <td>{moment(assignment.assigned_on).format("DD-MMM-YYYY")}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </>
  )
}

export default StudentAssigments;