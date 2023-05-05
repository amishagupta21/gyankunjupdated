import React from 'react'
import TeacherSidebar from '../TeacherSidebar'
import { Row, Col } from "react-bootstrap";

const ResourcesForTeacher = () => {
    return (
        <>

        <Row>
            <Col md={3}  style={{marginTop:"91px", width:"20%"}}>
                <TeacherSidebar />
            </Col>
            <Col md={9} style={{width:"80%"}}>
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
            <Col md={4}>
            <h4>Resources</h4>
            </Col>
        </Row>
          
        
      </div>
            </Col>
        </Row>
        
        </>
    )
}

export default ResourcesForTeacher