import React, { useEffect, useState } from "react";
import TeacherSidebar from "../TeacherSidebar";
import { Row, Col, Button, Table } from "react-bootstrap";
import SaveAssignment from "./SaveAssignment";
import { assignmentList, publishAssignmentData } from '../../../ApiClient'
import CreateNewAssignment from "./CreateNewAssignment";
import { FaCheck } from 'react-icons/fa';


const userDetails = JSON.parse(localStorage.getItem('UserData'))

const TeacherAssignment = (props) => {
  const [showSaveAssignment, setShowSaveAssignment] = useState(false);
  const [assignmentListView, setAssignmentListView] = useState([]);
  const [createNewAssignment, setCreateNewAssignment] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    getAssignmentList()
  },[])

  const createNewAssignmentData = () => {
    setCreateNewAssignment(true);
  }

  const closeAndLoadAssignment = () => {
    setCreateNewAssignment(false);
    getAssignmentList()
  }

  const handleSaveAssignment = (indx) => {
    setEditIndex(indx)
    setShowSaveAssignment(true)
  }

  const closeAndLoadAssignmentAfterSave = () => {
    setShowSaveAssignment(false)
    getAssignmentList()
  }

  const getAssignmentList = () => {
    const userId = userDetails?.user_id
    assignmentList(userId)
    .then((res) => setAssignmentListView(res.data))
    .catch((err) => console.log("Assignment list err - ", err))
  }

  const publishAssignmentModule = (id) => {
    const assignmentId = id
    publishAssignmentData(assignmentId)
    .then((res) => {
      getAssignmentList()
      console.log(res.data)
    })
    .catch((err) => console.log("Assignment list err - ", err))
  }

  return (
    <>
      <Row>
        <Col md={3} style={{ marginTop: "91px", width: "20%" }}>
          <TeacherSidebar />
        </Col>
        <Col md={9} style={{ width: "80%" }}>
          <div className="reportSection">
            <Row
              style={{
                height: "74px",
                boxShadow: "0px 3px 6px #B4B3B329",
                position: "relative",
                left: "12px",
                width: "100%",
              }}
            >
              <Col md={9}>
                <h4>Assignment</h4>
              </Col>
              <Col
                md={3}
                style={{ paddingTop: "17px" }}
                onClick={
                  createNewAssignmentData
                }
              >
                <Button variant="outline-primary">+ Create New</Button>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
              <div className="routineSection">
                <div></div>
                <Table striped hover>
                  <thead>
                    <tr
                      style={{
                        background: "#7A9ABF 0% 0% no-repeat padding-box",
                        borderRadius: "4px 4px 0px 0px",
                        opacity: "1",
                      }}
                    >
                      <th>S. No.</th>
                      <th>Grade</th>
                      <th>Assignment Name</th>
                      <th>Chapter Name</th>
                      <th>Assignment Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {assignmentListView?.assignments?.length > 0 && (
                    assignmentListView?.assignments?.map(
                      (assignment, indx) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{indx+1}</td>
                              <td>{assignment?.grade}</td>
                              <td>{assignment?.assignment_name}</td>
                              <td>{assignment?.subject_name}</td>
                              <td>{assignment?.assignment_type_name}</td>
                              <td>{assignment?.assignment_status}</td>
                              {assignment?.to_save == true ? (
                                <td>
                                  <Button
                                    style={{ width: "99px", height: "34px" }}
                                    variant="outline-primary"
                                    onClick={()=>handleSaveAssignment(indx)}
                                  >
                                    Save
                                  </Button>
                                  {showSaveAssignment && editIndex === indx && <SaveAssignment show={showSaveAssignment} onHide={closeAndLoadAssignmentAfterSave} assignmentIdData={assignment?.assignment_id} assignmentGrade={assignment?.grade} assignmentSection={assignment?.section_name}/>}
                                </td>
                              ) : assignment?.to_save == false &&
                                assignment?.is_published == false ? (
                                <td>
                                  <Button
                                    style={{ width: "99px", height: "34px" }}
                                    variant="outline-primary"
                                    onClick={() => publishAssignmentModule(assignment?.assignment_id)}
                                  >
                                    Publish
                                  </Button>
                                </td>
                              ) : (
                                <td>
                                  <FaCheck /> Published
                                </td>
                              )}
                            </tr>
                          </tbody>
                        );
                      }
                    )
                  )}               
                </Table>
              </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {createNewAssignment && <CreateNewAssignment show={createNewAssignment} onHide={closeAndLoadAssignment} />}
    </>
  );
};

export default TeacherAssignment;
