import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import TeacherSidebar from "../TeacherSidebar";
import { getQuestions, SaveAssignmentData, publishAssignmentData } from '../../../ApiClient'
import BaseQuestion from './QuestionForm/base';
import Question from './Question';
import './output.css';
const Addquestions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userDetails = JSON.parse(localStorage.getItem("UserData"));
    const id = location.state;
    const [questionlist, setQuestinoList] = useState({})
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        console.log(id);
        getqueries(id)
    }, [])
    const getqueries = (id) => {
        getQuestions(id).then((res) => { setQuestinoList(res.data.assignment_details[0].assignment_data); })
    }

    useEffect(() => {
        setQuestions(Object.values(questionlist));
    }, [questionlist])
    useEffect(() => {
        console.log("questions", questions);
    }, [questions])
    const handle = (data) => {
        console.log("New Data", data)
        setQuestions(old => [...old, data]);
    }
    const handleBack = () => {
        navigate('/teacherDashboard/Assignment');
    }
    const handleSave = () => {
        var temp = Object.assign({}, questions);
        var result = {
            assignment_id: id,
            assignment_data: temp
        }
        SaveAssignmentData(result).then(res => {
            if (res.data.status === "success") {
                navigate('/teacherDashboard/Assignment')
            }
            else {
                console.log("ERR", res.data.status);
                navigate('/teacherDashboard/Assignment')
            }
        })
    }
    const handlePublish = () => {
        var temp = Object.assign({}, questions);
        var result = {
            assignment_id: id,
            assignment_data: temp
        }
        SaveAssignmentData(result).then(res => {
            if (res.data.status === "success") {
                publishAssignmentData(id).then(res => {
                    if (res.data.status === "success") {
                        navigate('/teacherDashboard/Assignment')
                    }
                    else {
                        console.log("ERR", res.data.status);
                        navigate('/teacherDashboard/Assignment')
                    }
                })
            }
            else {
                console.log("ERR", res.data.status);
                navigate('/teacherDashboard/Assignment')
            }
        })
            .catch(err => console.log(err));
    }
    return (
        <>
            <Row>
                <Col md={3} style={{ marginTop: "91px", width: "20%" }}>
                    <TeacherSidebar />
                </Col>
                <Col md={9}>
                    <div className='reportSection'>
                        <Row
                            style={{
                                height: "74px",
                                boxShadow: "0px 3px 6px #B4B3B329",
                                position: "relative",
                                left: "12px",
                                width: "100%",
                            }}>
                            <Col md={9}>
                                <h4>Add Questions</h4>
                            </Col>
                            <Col
                                md={3}
                                style={{ paddingTop: "17px" }}
                                onClick={
                                    () => {
                                        navigate('/teacherDashboard/Assignment');
                                    }
                                }
                            >
                                <Button variant="outline-primary">Go to Assignments</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7} style={{ marginTop: "45px" }}>
                                {questions?.map((data, index) => {
                                    return (
                                        <Question data={data} index={index} />
                                    )
                                })}
                                {questions.length > 0 ? (
                                    <Row>
                                        <Col md={4}>
                                            <Button variant="outline-primary" onClick={handleBack} style={{ marginLeft: "200px" }}>Back</Button>
                                        </Col>
                                        <Col md={4}>
                                            <Button variant="outline-primary" onClick={handleSave}>Save</Button>
                                        </Col>
                                        <Col md={4}>
                                            <Button variant="outline-primary" onClick={handlePublish} style={{ marginRight: "200px" }}>Publish</Button>
                                        </Col>
                                    </Row>
                                ) : (<></>)}

                            </Col>
                            <Col md={5} style={{ marginTop: "45px" }}>
                                <BaseQuestion id={id} handle={handle} />
                            </Col>
                        </Row>
                    </div>

                </Col>
            </Row>

        </>
    )
}

export default Addquestions;