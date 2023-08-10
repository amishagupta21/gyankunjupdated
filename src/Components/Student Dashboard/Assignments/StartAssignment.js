import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, Table } from "react-bootstrap";
import { loadAssignmentData } from '../../../ApiClient'
import AnswerTypeFillTheBlank from "./AnswerTypeFillTheBlank";
import AnswerTypeMultiSelect from "./AnswerTypeMultiSelect";
import AnswerTypeSingleSelect from "./AnswerTypeSingleSelect";
import AnswerTypeSubjective from "./AnswerTypeSubjective";
import AnswerTypeUnJumble from "./AnswerTypeUnJumble";
import './studentAssignment.css'
import { trackPromise } from "react-promise-tracker";

const AssignmentSheet = (props) => {

  const [fullscreen, setFullscreen] = useState(true);
  const [assignmentFullData, setassignmentFullData] = useState({})
  const [dataFromChildComponent, setDataFromChildComponent] = useState([])
  const [assignlist, setAssignList] = useState([]);
  const [show, setShow] = useState({
    show: false,
    index: ""
  });
  useEffect(() => {
    fetchAssignmentData();
  }, [])
  useEffect(() => {
    let arr = [];
    Object.keys(assignmentFullData).map(key => arr.push(assignmentFullData[key]));
    setAssignList(arr)
  }, [assignmentFullData])
  useEffect(() => {
    console.log("Full data", assignmentFullData);
    console.log("list", assignlist)
  }, [assignlist])
  useEffect(() => {
    console.log("each", assignlist[show.index])
  }, [show])

  const userDetails = JSON.parse(localStorage.getItem('UserData'))

  const fetchAssignmentData = () => {
    const AssignmentId = props.assignmentId
    const userId = userDetails?.user_id
    loadAssignmentData(AssignmentId, userId)
      .then((res) => {
        console.log("RES", res)
        setassignmentFullData(res.data.assignment_data)
      })
      .catch((err) => console.log("AssignmentData err - ", err))
  }


  const handle = (data,idx) => {
    setAssignList(prev => {
      const newArr = [...prev];
      newArr[idx] = data;
      return newArr
    })
    console.log("Update",assignlist);
  }

  const handleShowQuestion = (index) => {
    setShow({
      show: true,
      index: index
    })
  }

  //console.log("dataFromChildComponent - ", dataFromChildComponent)


  return (
    <>
      <Modal
        className="ModalBody" 
        {...props}
        fullscreen={fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ backgroundColor: "#E1E9F3" }}
      >
        <Modal.Header closeButton style={{
          background: "#7A9ABF 0% 0% no-repeat padding-box",
          borderRadius: "4px 4px 0px 0px",
          opacity: "1",
        }}>
          <Modal.Title className="assignmentHeader" >Assignment</Modal.Title>
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
          <Row>
            <Col md={4} style={{ height: "auto", width: "30%", border: "1px solid #EFF1F4", marginBottom: "10px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #B4B3B329", borderRadius: "8px 8px 0px 0px" }}>
              <Row>
                <Table striped hover>
                  <thead>
                    <tr style={{
                      background: "#7A9ABF 0% 0% no-repeat padding-box",
                      borderRadius: "4px 4px 0px 0px",
                      opacity: "1",
                    }}>
                      <th className="questionSetHeaderText">Questions Set</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignlist?.map((eachQuestion, indx) => {
                      return (
                        <>
                          <tr>
                            <td className="questionSetText" onClick={() => handleShowQuestion(indx)}>Q.{indx + 1} {eachQuestion?.question}</td>
                          </tr>
                        </>

                        // <Col md={10} className="questionSetHeader">
                        //   <p className="questionSetText" onClick={() => handleShowQuestion(indx)}>Q.{indx + 1} {eachQuestion?.question}</p>
                        // </Col>
                      )
                    })}
                  </tbody>
                </Table>
              </Row>
            </Col>
            <Col md={8} style={{ marginBottom: "10px", marginLeft: "10px", border: "1px solid #EFF1F4", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #B4B3B329", borderRadius: "8px 8px 0px 0px" }}>
              {show?.show ? (
                <>
                  {assignlist[show.index].type === "4" ? (
                    <>
                      <AnswerTypeSubjective question={assignlist[show.index]} handle={handle} idx = {show.index}/>
                    </>
                  ) : (<></>)}
                  {assignlist[show.index].type === "1" ? (
                    <>
                    </>
                  ) : (<></>)}
                  {assignlist[show.index].type === "2" ? (
                    <>
                      <AnswerTypeMultiSelect question={assignlist[show.index]} handle={handle} idx = {show.index} />
                    </>
                  ) : (<></>)}
                  {assignlist[show.index].type === "3" ? (
                    <>
                    </>
                  ) : (<></>)}
                </>
              ) : (<></>)}
            </Col>

            {/* {assignmentFullData?.assignment_data?.assignmentDataForStudent?.map(
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
              )}               */}
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
