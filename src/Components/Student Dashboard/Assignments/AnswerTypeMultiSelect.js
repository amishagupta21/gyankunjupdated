import React from 'react'
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import './studentAssignment.css'

const AnswerTypeMultiSelect = ({...props}) => {
    return (
      <>
            <Row>
              <Col md={9} className="questionSetHeaderText">
                <p>Choose Multiple Answers</p>
              </Col>
            </Row>

            {props?.assignmentFullData?.assignment_data?.assignmentDataForStudent?.map((singleChoice, indx) => {
              return singleChoice?.type === "multiple_choice(checkbox)" &&  (<div><Row>
                <Col md={10} className="questionSetHeader">
                  <p className="questionSetText">{singleChoice?.question}</p>
                </Col>
                <Col md={2}>
                  <p className="questionSetText">20 marks</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form>
                    {singleChoice?.all_options?.map((option) => {
                      return <div className="mb-3">
                      <Form.Check
                        type="checkbox"
                        value={option}
                        label={option}
                      />
                    </div>
                    }) }
                  </Form>
                </Col>
              </Row>
              <hr /></div>)
            })
           }
      </>
    );
}

export default AnswerTypeMultiSelect