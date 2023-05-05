import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import "../Styles/LoginPage.css";
import loginImage from "../Images/loginImage.png";
import closeBtn from "../Images/closeBtn.png";
import * as myConstant from './fileConstant'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../ApiClient'
import LoginError from './LoginError'
import { trackPromise } from "react-promise-tracker";

const LoginPage = (props) => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState('')
  const [userName, setUserName] = useState('')
  const [passwordd, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const closeLoginModal = () => {
    props.onHide()
  }

  const loginMember = (e) => {
    let base64 = require("base-64");

    let url = "/login";
    let username = userName;
    let password = passwordd;

    let headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );

    let data = trackPromise(fetch(url, { method: "POST", headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("data - ", data);
        if (data.status === "success") {
          let user = localStorage.setItem("UserData", JSON.stringify(data));
          props.onHide();
          if(data.role === 'ADMIN' || data.role === 'PRINCIPAL') {
            navigate('/principalDashboard/Dashboard');
          }
          else if(data.role === 'TEACHER') {
            navigate({
              pathname: `${myConstant.teacherRoutesConfig.teacherdashboard}`,
              state: `${myConstant.teacherRoutesConfig.teacherdashboard}`,
            });
          }
          else if(data.role === 'STUDENT') {
            navigate({
              pathname: `${myConstant.studentRoutesConfig.studentdashboard}`,
              state: `${myConstant.studentRoutesConfig.studentdashboard}`,
            });
          }
          
        } else {
          setErrorMessage(true);
          setUserName("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      }));
  };



  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <div className="ModalContentMain">
          
          <Row>
            <Col md={3}>
              <div className="loginImage">
                <img
                  className="loginImageContent"
                  alt="login"
                  src={loginImage}
                />
              </div>
            </Col>
            <Col md={8}>
              <div className="loginForm">
                <h1 style={{textAlign: "center", font: "normal normal bold 26px/34px Roboto", letterSpacing: "0px", color: "#0B1785"}}>Digitalize your school in minutes</h1>
                <h1 style={{textAlign: "center", font: "normal normal bold 26px/34px Roboto", letterSpacing: "0px", color: "#5AB6DE"}}> with Gyankunj</h1>
                <div className="loginFormContent">
                  <Form>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                      <Form.Label style={{textAlign: "left", font: "normal normal normal 20px/26px Roboto", letterSpacing: "0px", color: "#2A2D2F", opacity: "1"}}>Enter your User ID</Form.Label>
                      <Form.Control type="text" placeholder="Enter User ID" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label style={{textAlign: "left", font: "normal normal normal 20px/26px Roboto", letterSpacing: "0px", color: "#2A2D2F", opacity: "1"}}>Enter your password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={passwordd} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                    <a href="#">Forgot password?</a>
                    </Form.Group>
                    <Button variant="primary" className="loginBtn" onClick={loginMember} disabled = {!(userName && passwordd)}>
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
            <Col md={1}>
            <img alt="close" src = {closeBtn} onClick={closeLoginModal} style={{position: "relative", top: "15px", cursor:"pointer"}}/>
            </Col>
          </Row>
        </div>
      </Modal>

      {errorMessage && <LoginError show = {errorMessage} onHide={() => {setErrorMessage(false)}} />}

    </>
  );
};

export default LoginPage;
