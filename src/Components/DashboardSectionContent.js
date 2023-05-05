import React, {useState} from "react";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import axios from 'axios';
import "../Styles/DashboardSectionContent.css";
import DashboardBg1 from '../Images/DashboardBg1.png'
import parentImg from '../Images/parentImg.png'
import principleImg from '../Images/principleImg.png'
import studentImg from '../Images/studentImg.png'
import teacherImg from '../Images/teacherImg.png'
import whyGKBg from '../Images/whyGKBg.png'
import whtToChImg1 from '../Images/whtToChImg1.png'
import whtToChImg2 from '../Images/whtToChImg2.png'
import whtToChImg3 from '../Images/whtToChImg3.png'
import whtToChImg4 from '../Images/whtToChImg4.png'
import whtToChImg5 from '../Images/whtToChImg5.png'
import whtToChImg6 from '../Images/whtToChImg6.png'
import whtToChImg7 from '../Images/whtToChImg7.png'
import whtToChImg8 from '../Images/whtToChImg8.png'
import whtToChImg9 from '../Images/whtToChImg9.png'
import blurredBackdrop from '../Images/blurredBackdrop.png'
import campusImg from '../Images/campusImg.png'
import districtImg from '../Images/districtImg.png'
import studentCountImg from '../Images/studentCountImg.png'
import { useEffect } from "react";
import '../Styles/DashboardCarousel.css'
import DashboardImage1 from '../Images/DashboardImage1.png'


const DashboardSectionContent = () => {

  // useState(() => {
  //   clearStorage()
  // },[])

  // const clearStorage = () => {
  //   window.localStorage.clear();
  // }

    return (
      <>
      <div className="dashboardImg">
            <img alt="dashboard image" src={DashboardImage1} />
        </div>
        <div
          className="dashboardContentMain"
          style={{ background: `url(${DashboardBg1})` }}
        >
          <section>
            Gyaankunj is the first ever cloud-based School Management Software
            providing an amazing automated experience to educational
            institutions of all size with its highly scalable, secure and robust
            ERP solutions. Our School ERP Software is designed to simplify all
            your academic and back office chores with unmatched efficiencies and
            empowering you to keep up with the learning demands of the 21st
            century, that too, with the most user-friendly interface.
          </section>
          <section className="sectionMid">
            If you are looking for a Tailor-Fit Cloud ERP Software for your
            School/College with Better Administration, Better Reports & Better
            Communication. Then the answer is Gyankunj.
          </section>
          <h1>A Single Tool to Manage Entire Institute</h1>
          <p className="sectionEnd">
            Edmatix is the most comprehensive & powerful Student Information
            System Software that streamlines all aspects of school/college
            management right from enrollment to graduation in one single
            database, skipping every manual and obsolete process you've been
            struggling with. Check out all our cool features, that make life
            easier for you and your customers.
          </p>
        </div>
        <div className="dashboardContentMid">
          <Row>
            <Col md={6}>
              <div
                className="dashboardImageContent"
                style={{ background: `url(${principleImg})` }}
              >
                <h4>Schools</h4>
                <p>
                  Automate perations, boost efficiency and reduce overheads with
                  the most pwerful school management platform by your side
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="dashboardImageContent"
                style={{ background: `url(${teacherImg})` }}
              >
                <h4>Teachers</h4>
                <p>
                  Create an enriching learning environment through world- class
                  learning content along with digital tools that simplify every
                  classroom operation
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div
                className="dashboardImageContent"
                style={{ background: `url(${studentImg})` }}
              >
                <h4>Students</h4>
                <p>
                  Never miss a lesson with continuous learning at your
                  fingertips through classroom recordings, unlimited practice
                  questions and much more
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="dashboardImageContent"
                style={{ background: `url(${parentImg})` }}
              >
                <h4>Parents</h4>
                <p>
                  Monitor & track your children's progress with complete
                  transparency and stay on top of all the school updates with
                  ease
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="whyToChoose" style={{ background: `url(${whyGKBg})` }}>
          <h1
            style={{
              textAlign: "center",
              font: "normal normal bold 50px/92px Roboto",
              letterSpacing: "0px",
              color: "#0B1785",
            }}
          >
            Why Gyaankunj is an{" "}
          </h1>
          <h1
            style={{
              textAlign: "center",
              font: "normal normal bold 50px/24px Roboto",
              letterSpacing: "0px",
              color: "#5AB6DE",
            }}
          >
            excellent choice?
          </h1>
          <div className="whyToChooseInnerContent">
          <Row>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg1})` }}></div>
              <p>End to End solution</p>
            </Col>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg2})` }}></div>
              <p>Secure & Relatable</p>
            </Col>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg3})` }}></div>
              <p>Well informed</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg4})` }}></div>
              <p>Flexible & Customizable</p>
            </Col>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg5})` }}></div>
              <p>Many Users Can Employ</p>
            </Col>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg6})` }}></div>
              <p>Simple Pricing</p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg7})` }}></div>
              <p>Quick & Easy Scheduling</p>
            </Col>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg8})` }}></div>
              <p>Any Academy or System</p>
            </Col>
            <Col md={3}>
              <div className="whyToChooseImg" style={{ background: `url(${whtToChImg9})` }}></div>
              <p>Tracking & Reporting</p>
            </Col>
          </Row>
          </div>
        </div>
        <div className="dashboardEndContent" style={{ background: `url(${blurredBackdrop})` }}>
          <h1>Our presence across the country</h1>
          <div className="EndContentInner">
            <Row>
              <Col md={4} style={{height: "304px"}}>
              <img alt="campusImg" src = {campusImg} />
              <p>100+</p>
              <p>Campuses</p>
              </Col>
              <Col md={4} style={{height: "304px"}}>
              <img alt="districtImg" src = {districtImg} />
              <p>100+</p>
              <p>Districts</p>
              </Col>
              <Col md={4} style={{height: "304px"}}>
              <img alt="studentCountImg" src = {studentCountImg} />
              <p>100+</p>
              <p>Students</p>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
}

export default DashboardSectionContent;