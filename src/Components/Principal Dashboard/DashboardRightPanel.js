import React, { useState } from 'react'
import { Row, Col, Card } from "react-bootstrap";
import DashboardRP from '../../Images/DashboardRP.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Doughnut } from 'react-chartjs-2';

const DashboardRightPanel = () => {
    const [value, onChange] = useState(new Date());
    return (
      <>
        {/* <div className="dashboardRightPanelTop">
          <Row
            style={{
              boxShadow: "rgb(180 179 179 / 16%) 0px 3px 6px",
              height: "75px",
              paddingTop: "13px",
              margin: "0px",
            }}
          >
            <Col md={6}>
              <h4
                style={{
                  textAlign: "left",
                  font: "normal normal bold 22px/34px Roboto",
                  letterSpacing: " 0px",
                  color: "#2A2D2F",
                  opacity: "1",
                }}
              >
                Quick Stats
              </h4>
            </Col>
            <Col md={6}>
              <a href="#">View Data</a>
            </Col>
          </Row>
          <Row
            style={{
              boxShadow: "rgb(180 179 179 / 16%) 0px 3px 6px",
              height: "175px",
              paddingTop: "13px",
              margin: "0px",
            }}
          >
            <Col md={6}>
            <h6 style={{ color: "#0040B5", fontWeight: "bold" }}>Teacher</h6>
            </Col>
            <Col md={6}>
            <h6
                style={{
                  backgroundColor: "#DEFABD",
                  color: "#608E29",
                  fontWeight: "bold",
                }}
              >
                Student
              </h6>
            </Col>
          </Row>
        </div> */}
        <div className="dashboardRightPanelTop">
          <Row
            style={{
              boxShadow: "rgb(180 179 179 / 16%) 0px 3px 6px",
              height: "75px",
              paddingTop: "13px",
              margin: "0px",
            }}
          >
            <Col md={6}>
              <h4
                style={{
                  textAlign: "left",
                  font: "normal normal bold 22px/34px Roboto",
                  letterSpacing: " 0px",
                  color: "#2A2D2F",
                  opacity: "1",
                }}
              >
                Teacher's Engagement
              </h4>
            </Col>
            <Col md={6}>
              <a href="#">View Data</a>
            </Col>
          </Row>
          <Row
            style={{
              boxShadow: "rgb(180 179 179 / 16%) 0px 3px 6px",
              height: "175px",
              paddingTop: "13px",
              margin: "0px",
            }}
          >
            <Col>
              <Card className='dashboardRightPanelCard'>
                <Row>
                    <Col md={5} style={{paddingTop:"6px"}}>Julie</Col>
                    <Col md={4} style={{paddingTop:"6px"}}>Class 3-Hindi</Col>
                    <Col md={3} style={{paddingTop:"6px"}}><div className='dashboardStatus'>Active</div></Col>
                </Row>
              </Card>
              <Card className='dashboardRightPanelCard'>
              <Row>
                    <Col md={5} style={{paddingTop:"6px"}}>Julie</Col>
                    <Col md={4} style={{paddingTop:"6px"}}>Class 3-Hindi</Col>
                    <Col md={3} style={{paddingTop:"6px"}}><div className='dashboardStatus'>Active</div></Col>
                </Row>
              </Card>
              <Card className='dashboardRightPanelCard'>
              <Row>
                    <Col md={5} style={{paddingTop:"6px"}}>Julie</Col>
                    <Col md={4} style={{paddingTop:"6px"}}>Class 3-Hindi</Col>
                    <Col md={3} style={{paddingTop:"6px"}}><div className='dashboardStatus'>Active</div></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{borderRadius:"2%"}}>
        <Calendar onChange={onChange} value={value} />
        </div>
      </>
    );
}

export default DashboardRightPanel;