import React from "react";
import { Row, Col } from "react-bootstrap";
import "./index.css";

const Question = ({ data, index }) => {
 
  // eslint-disable-next-line default-case
  switch (data.type) {
    case "3":
      return (
        <div className="mb-5">
          <Row>
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
              <b>Question: {index + 1}</b>
              </span>
            </Col>
            <Col md={10}>
              <span className="questiondetail" style={{ float: "left" }}>
                {data.question}
              </span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={2} >
              <span className="questiondetail" style={{ float: "right" }}>
                Answer:
              </span>
            </Col>
            <Col md={10}>
              {data.answer.map((i) => {
                return (
                  <>
                    <span style={{ float: "left" }}>{i}. </span>
                  </>
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col md={2} className="mt-3">
              <span className="questiondetail" style={{ float: "right" }}>
                Marks: &nbsp;<span class="badge text-bg-success">{data.marks}</span>
              </span>
            </Col>
          </Row>
        </div>
      );
    case "4":
      return (
        <div className="mb-5">
        
          <Row>
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                <b>Question:{index+1}</b>
              </span>
            </Col>
            <Col md={10}>
              <span className="questiondetail" style={{ float: "left" }}>
                {data.question}
              </span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                Answer:
              </span>
            </Col>
            <Col md={10}>
              <span style={{ float: "left" }}>{data.answer}</span>
            </Col>
          </Row>
          <Row>
            <Col md={2} className="mt-3">
              <span className="questiondetail" style={{ float: "right" }}>
                Marks: &nbsp;<span class="badge text-bg-success">{data.marks}</span>
              </span>
            </Col>
          </Row>
        </div>
      );
    case "1":
      return (
        <div className="mb-5">
          <Row>
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                <b>Question: {index + 1}</b>
              </span>
            </Col>
            <Col md={10}>
              <span className="questiondetail" style={{ float: "left" }}>
                {data.question}
              </span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                All Options:
              </span>
            </Col>
            <Col md={10}>
              {data.all_options?.map((option,opIndex) => {
                return (
                  <>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name={data.question}
                        id={option}
                      />
                      <label
                        class=" form-check-label w-100 "
                        style={{ textAlign: "left" }}
                        for={data.question}
                      >
                        {option}
                      </label>
                    </div>
                    {opIndex !==data.all_options-1?<br></br>:null}
                  </>
                );
              })}
            </Col>
          </Row>
          <br />
          <Row className="mb-5 w-100">
          
          <Col md={2} className="text-end">Answer:</Col>
            <Col md={10} className="text-start">
            {data.answer}
            </Col>
          </Row>
          <Row>
            <Col md={2} className="mt-3">
              <span className="questiondetail" style={{ float: "right" }}>
                Marks: &nbsp;<span class="badge text-bg-success">{data.marks}</span>
              </span>
            </Col>
          </Row>
          <br />
        </div>
      );
    case "2":
      return (
        <div className="mb-5">
          <Row className="mt-5">
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                <b>Question:{index+1}</b>
              </span>
            </Col>
            <Col md={10}>
              <span className="questiondetail" style={{ float: "left" }}>
                {data.question}
              </span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                All Options:
              </span>
            </Col>
            <Col md={10}>
              {data.all_options?.map((option,opIndex) => {
                console.log("Options", option);
                return (
                  <>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name={data.question}
                      id={option}
                    />
                    <label
                      class=" form-check-label w-100 "
                      style={{ textAlign: "left" }}
                      for={data.question}
                    >
                      {option}
                    </label>
                  </div>
                  {opIndex !==data.all_options-1?<br></br>:null}
                </>
                );
              })}
            </Col>
          </Row>
          <br />
          <Row >
            <Col md={2}>
              <span className="questiondetail" style={{ float: "right" }}>
                Answer
              </span>
            </Col>
            <Col md={10}>
              {data.answer.map((i) => {
                return (
                  <>
                    <span style={{ float: "left" }}>{i}. </span>
                  </>
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col md={2} className="mt-3">
              <span className="questiondetail" style={{ float: "right" }}>
                Marks: &nbsp;<span class="badge text-bg-success">{data.marks}</span>
              </span>
            </Col>
          </Row>
        </div>
      );
    case "default":
      return ;
  }
};

export default Question;
