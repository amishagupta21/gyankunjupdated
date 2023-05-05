import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col, Dropdown, Button, Table } from "react-bootstrap";
// import { FaAngleDown } from 'react-icons/fa';
import { useState } from "react";
import downArrow from "../../../Images/icon_chevron_see_all.svg";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { lessonPlanAllDetails, verifyLessonPlan } from "../../../ApiClient";
import SendBackPlan from './SendbackLessonPlan'

function LessonPlanPrinciView(props) {
  const [hideResponse, setHideResponse] = useState([]);
  const [sectionExpanded, setSectionExpanded] = useState(false);
  const [verifiedTrue, setverifiedTrue] = useState(false);
  const [lessonAllDetails, setLessonAllDetails] = useState([]);
  const [sendBackModal, showSendbackModal] = useState(false)
  const [index, setIndex] = useState(null)

  // const showLessonPlanDetails = (id) => {
  //     setExpandcard(!expandCard)
  // }

  const showLessonPlanAllDetails = (id) => {
    const lessonId = id;
    lessonPlanAllDetails(lessonId)
      .then((res) => setLessonAllDetails(res.data))
      .catch((err) => console.log("Lesson err - ", err));
  };

  const showResponseHandler = (id) => {
    showLessonPlanAllDetails(id);
    let openHandler = [...hideResponse];
    openHandler.push(id);
    setHideResponse([...openHandler]);
    setSectionExpanded(true);
  };

  const hideResponseHandler = (id) => {
    let openHandler = [...hideResponse];
    let findindex = openHandler.indexOf(id);
    setSectionExpanded(false);

    if (findindex > -1) {
      openHandler.splice(findindex, 1);
      setHideResponse([...openHandler]);
    }
  };



  const approveLessonPlan = (id) => {
    console.log("lessonDetail - ", id)
    const dataToVerify = {
       "lesson_id": id,
        "verified": true
    }
    verifyLessonPlan(dataToVerify)
    .then((res) => {
      console.log("Verified - ", res.data)
      
    handleVerifyTrue(id)
})
    .catch((err) => console.log("Not Verified"))
  }

  const handleVerifyTrue = (id) => {
    setIndex(id)
    setverifiedTrue(true);
  }

  console.log("index - ", index)

  return (
    <>
      <Card className="lessonPlanCardHeader">
        <Card.Body>
          <Row>
            <Col md={3} className="lessonHeading">
              <h6>GRADE</h6>
            </Col>
            <Col md={3} className="lessonHeading">
              <h6>SUBJECT NAME</h6>
            </Col>

            <Col md={5} className="lessonHeading" style={{ textAlign: "left" }}>
              <h6>LESSON NAME</h6>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {!props?.lessonPlanData ? (
        <h6 style={{ position: "relative", top: "20px" }}>
          Select Teacher to view Lesson Plan!!
        </h6>
      ) : props?.lessonPlanData?.message ? (
        <h6 style={{ position: "relative", top: "20px" }}>
          No Lesson Plans Available!!
        </h6>
      ) : (
        props?.lessonPlanData?.lesson_plan_data &&
        props?.lessonPlanData?.lesson_plan_data?.map((lessons, indx) => {
          console.log("lessons - ", lessons);

          return (
            <Card
              className={
                hideResponse?.includes(lessons?.lesson_id)
                  ? "lessonPlanCardExpanded"
                  : "lessonPlanCard"
              }
            >
              <Card.Body>
                <Row
                // style={{height :expandCard? '66px' : "", boxShadow: expandCard? '0px 3px 6px #B4B3B329' : ""}}
                >
                  <Col md={3} className="gradeName">
                    {lessons.grade ? <p>{lessons.grade}</p> : "-"}
                  </Col>
                  <Col md={3} className="subjectName">
                    <p>{lessons.subject_name}</p>
                  </Col>

                  <Col md={5} className="lessonName">
                    <p>{lessons.topic_name}</p>
                  </Col>
                  {/* <Col md={2}>
                    {verifiedTrue ? <Button id={indx} variant="outline-success">Approved</Button> : <Button variant="outline-success" onClick={() => approveLessonPlan(lessons)}>Approve</Button>}
                  </Col>
                  <Col md={2}>
                    {verifiedTrue ? <Button id={indx} variant="outline-danger">Send Back</Button> : <Button variant="outline-danger" onClick={() => showSendbackModal(true)}>Send back</Button>}
                  </Col> */}
                  <Col md={1}>
                      {hideResponse?.includes(lessons?.lesson_id) ? (
                        <FaAngleUp style={{height:"25px", width:"25px"}}
                          onClick={() =>
                            hideResponseHandler(lessons?.lesson_id)
                          }
                        />
                      ) : (
                        <FaAngleDown style={{height:"25px", width:"25px"}}
                          onClick={() =>
                            showResponseHandler(lessons?.lesson_id)
                          }
                        />
                      )}
                    
                  </Col>
                </Row>
                {
                  // expandCard &&
                  <div>
                    {hideResponse?.includes(lessons?.lesson_id) &&
                      lessonAllDetails?.lesson_plan_data?.map(
                        (lessonDetail, indx) => {
                          console.log("lessonDetail - ", lessonDetail)
                          return (
                            <fieldset>
                              <Row className="lessonData">
                                <Col md={3} style={{ textAlign: "left" }}>
                                  Topic Name:
                                </Col>
                                <Col md={9} style={{ textAlign: "left" }}>
                                  {lessonDetail.topic_name}
                                </Col>
                              </Row>
                              <Row className="lessonData">
                                <Col md={3} style={{ textAlign: "left" }}>
                                  Learning Objective:
                                </Col>
                                <Col md={9} style={{ textAlign: "left" }}>
                                  {lessonDetail.learning_objectives}
                                </Col>
                              </Row>
                              <Row className="lessonData">
                                <Col md={3} style={{ textAlign: "left" }}>
                                  Teaching Methods:
                                </Col>
                                <Col md={9} style={{ textAlign: "left" }}>
                                  {lessonDetail.teaching_methods}
                                </Col>
                              </Row>
                              <Row className="lessonData">
                                <Col md={3} style={{ textAlign: "left" }}>
                                  Learning Outcome:
                                </Col>
                                <Col md={9} style={{ textAlign: "left" }}>
                                  {lessonDetail.learning_outcome}
                                </Col>
                              </Row>
                              <Row className="lessonData">
                                <Col md={3} style={{ textAlign: "left" }}>
                                  Teaching Aids:
                                </Col>
                                <Col md={9} style={{ textAlign: "left" }}>
                                  {lessonDetail.teaching_aid_references}
                                </Col>
                              </Row>
                              <Row>
                                <Col md={8}></Col>
                                <Col md={2}>
                    { verifiedTrue && index ===  lessonDetail?.chapter_id ? <Button id={indx} variant="outline-success">Approved</Button> : <Button variant="outline-success" onClick={() => approveLessonPlan(lessonDetail?.chapter_id)}>Approve</Button>}
                  </Col>
                  <Col md={2}>
                    {verifiedTrue ? <Button id={indx} variant="outline-danger">Send Back</Button> : <Button variant="outline-danger" onClick={() => showSendbackModal(true)}>Send back</Button>}
                  </Col>
                              </Row>
                            </fieldset>
                          );
                        }
                      )}
                  </div>
                }
              </Card.Body>
            </Card>
          );
        })
      )}
      {sendBackModal && <SendBackPlan show={sendBackModal}
            onHide={() => showSendbackModal(false)} />}
    </>
  );
}

export default LessonPlanPrinciView;
