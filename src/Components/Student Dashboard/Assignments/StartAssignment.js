import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import {loadAssignmentData} from '../../../ApiClient'
import AnswerTypeFillTheBlank from "./AnswerTypeFillTheBlank";
import AnswerTypeMultiSelect from "./AnswerTypeMultiSelect";
import AnswerTypeSingleSelect from "./AnswerTypeSingleSelect";
import AnswerTypeSubjective from "./AnswerTypeSubjective";
import AnswerTypeUnJumble from "./AnswerTypeUnJumble";
import './studentAssignment.css'
import { trackPromise } from "react-promise-tracker";

const AssignmentSheet = (props) => {

    const [fullscreen, setFullscreen] = useState(true);
    const [assignmentFullData, setassignmentFullData] = useState([])
    const [dataFromChildComponent, setDataFromChildComponent] = useState([])

    useEffect(() => {
      fetchAssignmentData();
    },[])

    const userDetails = JSON.parse(localStorage.getItem('UserData'))

    const fetchAssignmentData = () => {
      const AssignmentId = props.assignmentId
      const userId = userDetails?.user_id
      trackPromise(loadAssignmentData(AssignmentId, userId)
      .then((res) => setassignmentFullData(res.data))
      .catch((err) => console.log("AssignmentData err - ", err)))
    }

    const getAnswerFromChild = (data) => {
      setDataFromChildComponent(data)
    }

    console.log("dataFromChildComponent - ", dataFromChildComponent)

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        fullscreen={fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{backgroundColor:"#E1E9F3"}}
      >
        <Modal.Header closeButton>
          <Modal.Title className="assignmentHeader">Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="assignmentNameHeader">
            <Row>
              <Col md={12} className="assignmentName">
                Name of the assignment: <b>{props?.assignmentName}</b>
              </Col>
            </Row>
            {props.assignmentType === "Test" && <Row>
              <Col md={12} className="assignmentName">
                Duration: 60 minutes
              </Col>
            </Row>}
          </div>
          <Row style={{marginBottom:"40px", paddingTop:"20px"}}>
            <Col md={12}>
              <span className="assignmentName">Description:</span> 
            </Col>
          </Row>
          <Row>
            <Col md={4} style={{height:"auto", width:"30%", border: "1px solid #EFF1F4",  marginBottom: "10px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #B4B3B329", borderRadius: "8px 8px 0px 0px" }}>
            <Row>
              <Col md={12} className="questionSetHeaderText">
              <p>Questions Set</p>
              </Col>
              {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map((eachQuestion, indx) => {
                return (
                  <Col md={10} className="questionSetHeader">
                  <p className="questionSetText">Q.{indx+1} {eachQuestion?.question}</p>
                </Col>
                )
              })}
            </Row>
            </Col>
            <Col md={8} style={{ marginBottom: "10px", marginLeft:"10px", border: "1px solid #EFF1F4", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #B4B3B329", borderRadius: "8px 8px 0px 0px" }}>
              {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map(
                (answerType, indx) => {
                  return (
                    answerType?.type === "fill_in_the_blanks" && (
                      <AnswerTypeFillTheBlank
                        assignmentFullData={assignmentFullData?.assignment_data?.assignmentDataForStudent?.filter((fillQuestionSet, indx) => {
                          return fillQuestionSet?.type === "fill_in_the_blanks"
                        })}
                        getAnswerFromChild={getAnswerFromChild}
                      />
                    )
                  );
                }
              )}

              {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map(
                (answerType, indx) => {
                  return (
                    answerType?.type === "multiple_choice(radio)" && (
                      <AnswerTypeSingleSelect
                        assignmentFullData={assignmentFullData}
                      />
                    )
                  );
                }
              )}
              

              {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map(
                (answerType, indx) => {
                  return (
                    answerType?.type === "multiple_choice(checkbox)" && (
                      <AnswerTypeMultiSelect
                        assignmentFullData={assignmentFullData}
                      />
                    )
                  );
                }
              )}
              

              {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map(
                (answerType, indx) => {
                  return (
                    answerType?.type === "subjective" && (
                      <AnswerTypeSubjective
                        assignmentFullData={assignmentFullData}
                      />
                    )
                  );
                }
              )}
              

              {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map(
                (answerType, indx) => {
                  return (
                    answerType?.type === "unjumble" && (
                      <AnswerTypeUnJumble
                        assignmentFullData={assignmentFullData}
                      />
                    )
                  );
                }
              )}
              
            </Col>
          </Row>

          {/* <AnswerTypeMultiSelect />
                <AnswerTypeSingleSelect />
                <AnswerTypeSubjective />
                <AnswerTypeUnJumble /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary">Submit Assignment</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignmentSheet;
