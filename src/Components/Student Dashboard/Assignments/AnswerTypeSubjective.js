import React from 'react'
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import './studentAssignment.css'

const AnswerTypeSubjective = ({...props}) => {
    return (
      <>
        {/* <Row> */}
          {/* <Col md={4} className="questionSetSidebar">
            {" "}
            Sidebar
          </Col> */}
          {/* <Col md={8} className="assignmentDataInner"> */}
            <Row>
              <Col md={9} className="questionSetHeaderText">
                <p>Subjective Question</p>
              </Col>
            </Row>
            {props?.assignmentFullData?.assignment_data?.assignmentDataForStudent?.map((subjective, indx) => {
                return subjective?.type === 'subjective' && <Row>
                <Col md={10} className="questionSetHeader">
                  <p className="questionSetText">
                    {subjective?.question}
                  </p>
                </Col>
                <Col md={2}>
                  <p className="questionSetText">{subjective?.marks}</p>
                </Col>
              </Row>
            }) }
            <Row>
              <Col md={6}>
                <p>Enter your Answer</p>
                <textarea
                rows="4"
                cols="50"
                  type="text"
                  placeholder="Answer"
                  className="fillBlankAnswer"
                //   onChange={(e) => handleQuestionData(e)}
                ></textarea>
              </Col>
            </Row>
            <hr />
          {/* </Col> */}
        {/* </Row> */}
      </>
    );
}

export default AnswerTypeSubjective