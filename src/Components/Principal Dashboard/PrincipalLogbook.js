import React from 'react'
import { Row, Col, ButtonGroup, ToggleButton, Dropdown, Table, ProgressBar, Button, Form } from "react-bootstrap";

const PrincipalLogBook = () => {
    return (
        <>
        <Row>
          <Col md={3}>
            <span style={{font: "normal normal bold 19px/34px Roboto"}}>Class Teacher's Name:</span> <span>Anjana</span>
          </Col>
          <Col md={1}>
            
          </Col>
          <Col md={4}>
          <span style={{font: "normal normal bold 19px/34px Roboto"}}>Day:</span> <span>Monday</span>
          </Col>
          <Col md={1}>
            
          </Col>
          <Col md={3}>
          <span style={{font: "normal normal bold 19px/34px Roboto"}}>Date:</span> <span>1-1-2022</span>
          </Col>
        </Row>
        <div className="routineSection">
            <div>
            </div>
            <Table striped hover>
              <thead>
                <tr style={{background: "#7A9ABF 0% 0% no-repeat padding-box", borderRadius: "4px 4px 0px 0px", opacity: "1"}}>
                  <th>Period</th>
                  <th>Students Present</th>
                  <th>Subject</th>
                  <th>Content Taught</th>
                  <th>Homework</th>
                </tr>
              </thead>
              {/* {logBookDetails?.log_book_data?.log_record.map((logData, indx) => {
                return  */}
                <tbody>
                <tr>
                {/* <td>{logData?.period}</td>
                  <td>{logData?.students_present}</td>
                  <td>{logData?.subject}</td>
                  <td>{logData?.content_taught}</td>
                  <td>{logData?.home_work}</td>                    */}
                  <td>1</td>
                  <td>20</td>
                  <td>Maths</td>
                  <td>Geometry</td>
                  <td>Calculas</td>  
                </tr>
              </tbody>
              {/* })} */}
            </Table>
            <Row style={{padding: "10px"}}>
              <Col md={3}>
                <h6 style={{textAlign : "left"}}>Name of Absentees : </h6>
              </Col>
              <Col md={9} style={{textAlign : "left"}}>
                <span>20</span>
              </Col>
            </Row>
            <Row style={{padding: "10px"}}>
              <Col md={3}>
                <h6 style={{textAlign : "left"}}>Number of Dress Defaulters : </h6>
              </Col>
              <Col md={9} style={{textAlign : "left"}}>
              <span>20</span>
              </Col>
            </Row>
          </div>
        
        </>
    )
} 

export default PrincipalLogBook