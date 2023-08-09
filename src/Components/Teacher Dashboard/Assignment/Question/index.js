import React from "react";
import { Row, Col } from 'react-bootstrap'
import "./index.css";

const Question = ({ data, index }) => {
  console.log("quesiton componnet", data);
  switch (data.type) {
    case "3":
      return (
        <>
          <Row>
            <Col md={12}><div className="question_basis" >{`Question ${index + 1} (Fill in the Blank)`}</div></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Question:</span></Col>
            <Col md={8}><span className="questiondetail" style={{ float: "left" }}>{data.question}</span></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Answer:</span></Col>
            <Col md={8}>
              {data.answer.map((i) => {
                return (
                  <><span style={{ float: "left" }}>{i}. </span></>
                )
              })}
            </Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Marks:</span></Col>
            <Col md={8}><span style={{float:"left"}}>{data.marks}</span></Col>
          </Row>
        </>
      )
    case "4":
      return (
        <>
          <Row>
            <Col md={12}><div className="question_basis">{`Question ${index + 1} (Write Answer)`}</div></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Question:</span></Col>
            <Col md={8}><span className="questiondetail" style={{ float: "left" }}>{data.question}</span></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Answer:</span></Col>
            <Col md={8}><span style={{ float: "left" }}>{data.answer}</span></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Marks:</span></Col>
            <Col md={8}><span style={{ float: "left" }}>{data.marks}</span></Col>
          </Row>
        </>
      )
    case "1":
      return (
        <>
          <Row>
            <Col md={12}><div className="question_basis">{`Question ${index + 1} (Single Select)`}</div></Col>
          </Row>

          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Question:</span></Col>
            <Col md={8}><span className="questiondetail" style={{ float: "left" }}>{data.question}</span></Col>
          </Row>
          <br />
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>All Options:</span></Col>
            <Col md={8}>
              {data.all_options?.map((option) => {

                return (
                  <>
                    <div key={option} style={{ float: "left" }}>
                      {option}
                    </div>
                    <br></br>
                  </>
               )
              })}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Answer:</span></Col>
            <Col md={8}><span style={{ float: "left" }}>{data.answer}</span></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Marks:</span></Col>
            <Col md={8}><span style={{ float: "left" }}>{data.marks}</span></Col>
          </Row>
          <br />
        </>
      )
    case "2":
      return (
        <>
          <Row>
            <Col md={12}><div className="question_basis">{`Question ${index + 1} multiple_choice(checkbox)`}</div></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Question:</span></Col>
            <Col md={8}><span className="questiondetail" style={{ float: "left" }}>{data.question}</span></Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>All Options:</span></Col>
            <Col md={8}>
              {data.all_options?.map((option) => {
                console.log("Options", option)
                return (
                  <>
                    <div key={option} style={{ float: "left" }}>
                      {option}
                    </div>
                    <br />
                  </>
                )
              })}
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Answer:</span></Col>
            <Col md={8}>
              {data.answer.map((i) => {
                return (
                  <><span style={{ float: "left" }}>{i}. </span></>
                )
              })}
            </Col>
          </Row>
          <Row>
            <Col md={4}><span className="questiondetail" style={{ float: "right" }}>Marks:</span></Col>
            <Col md={8}><span style={{ float: "left" }}>{data.marks}</span></Col>
          </Row>
        </>
      )
  }
}

export default Question;
