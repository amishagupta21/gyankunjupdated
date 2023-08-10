import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Table, Button, Form } from 'react-bootstrap';
import TeacherSidebar from "../../TeacherSidebar";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { BsPlusSquareDotted } from "react-icons/bs";
import { SaveAssignmentData } from "../../../../ApiClient";
import "./index.css";

const BaseQuestion = (props) => {
    const [cancel, setCancel] = useState(true);
    const [questionName, setQuestionName] = useState("");
    const [marks, setMarks] = useState("");
    const [type, setType] = useState("");
    const [validated, setValidated] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [other, setOther] = useState(true);
    const [fill, setfill] = useState(false);
    const [single, setSingle] = useState(false);
    const [multi, setMulti] = useState(false);
    const [multicount, setMultiCount] = useState([1, 2]);
    const [addsingle, setAddSingle] = useState(false);
    const [addmulti, setAddMulti] = useState(false);
    const [data, setData] = useState({
        question: "",
        marks: "",
        answer: "",
        options: [
            { id: uuid(), value: "", trigger: false },
        ]
    })
    useEffect(() => {
        console.log(data);
    }, [single, multi, data, fill])
    useEffect(() => {

    }, [marks, questionName, type])
    useEffect(() => {
        console.log("cancel")
        console.log(data);
    }, [cancel])
    const handleSubmit = (e) => {
        const form = document.getElementById("form");
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            if (other === true) {
                var temp = {
                    question: questionName,
                    type: type,
                    marks: marks,
                    all_options: [],
                    answer: data.answer,
                    test_answer : ""
                }
                console.log(temp);
                props.handle(temp);
            }
            else if (single === true) {
                var ttt = [];
                data.options.map(item => {
                    ttt.push(item.value);
                })
                var temp = {
                    question: questionName,
                    type: type,
                    marks: marks,
                    all_options: ttt,
                    answer: data.answer,
                    test_answer : ""
                }
                props.handle(temp);
                console.log(temp);
            }
            else if (multi === true) {
                var ans = [];
                var ttt = [];
                data.options.map(item => {
                    ttt.push(item.value);
                })
                var correct_options = data.options.filter((item) => item.trigger === true)
                correct_options.map(item => ans.push(item.value));
                var temp = {
                    question: questionName,
                    type: type,
                    marks: marks,
                    all_options: ttt,
                    answer: ans,
                    test_answer : []
                }
                props.handle(temp);
                console.log(temp);
            }
            else if (fill === true) {
                var ans = [];
                data.options.map((item) => ans.push(item.value))
                var temp = {
                    question: questionName,
                    type: type,
                    marks: marks,
                    all_options: data.options,
                    answer: ans
                }
                console.log(temp);
                props.handle(temp);
            }
        }
        setValidated(true);
        handleCancel();
    }
    const handleQuestionname = (e) => {
        setQuestionName(e.target.value);
    }
    const handleotherAnswer = (e) => {
        setData({
            ...data,
            answer: e.target.value
        })
    }
    const handleMarks = (e) => {
        setMarks(e.target.value)
    }
    const addOptions = () => {
        setData({
            ...data,
            options: [
                ...data?.options,
                {
                    id: uuid(),
                    value: "",
                    trigger: false
                },
            ],
        });
    };
    const deleteOption = (id) => {
        const tempArr = data?.options.filter((item) => item.id !== id);
        setData({
            ...data,
            options: tempArr,
        });
    };
    const handleCancel = () => {
        setMarks("");
        setQuestionName("");
        setType("");
        setData({
            question: "",
            type: "",
            marks: "",
            answer: "",
            options: [
                { id: uuid(), value: "", trigger: false }
            ]
        })
        setSingle(false);
        setMulti(false);
        setfill(false);
        setOther(true);
    }
    const handleTrigger = (id) => {
        setData((prevData) => {
            const updatedOptions = prevData.options.map((option) =>
                option.id === id ? { ...option, trigger: !option.trigger } : option
            );

            return {
                ...prevData,
                options: updatedOptions,
            };
        });
    };
    const handleAnswer = (e) => {
        setData({
            ...data,
            answer: e.target.value
        })
    }
    const handleType = (e) => {
        console.log("Type", e.target.value)
        switch (e.target.value) {
            case "1":
                setSingle(true);
                setMulti(false);
                setfill(false);
                setOther(false);
                setType("1")
                break;
            case "2":
                setSingle(false);
                setMulti(true);
                setfill(false)
                setOther(false);
                setType("2")
                break;
            case "3":
                setSingle(false);
                setMulti(false);
                setfill(true);
                setOther(false);
                setType("3")
                break;
            default:
                setSingle(false);
                setMulti(false);
                setfill(false)
                setOther(true);
                setType("4")
                break;
        }
    }
    const handleInputChange = (index, value) => {
        const tempArr = [...data?.options];
        tempArr[index].value = value;
        setData({
            ...data,
            options: tempArr,
        });
    };
    return (
        <div className="question" >
            <div className="newQuesion">
                New Question
            </div>
            <div className="content">
                <Form noValidate validated={validated} id="form">
                    <Row>
                        <Col md={5}>
                            <Form.Group className="mb-3" controlId="type">
                                <Form.Label>Type</Form.Label>
                                <Form.Select aria-label="Default select example" size="sm" className="inputtype" required onChange={e => handleType(e)} value={type}>
                                    <option value="">Select Type</option>
                                    <option value="1">Single Select</option>
                                    <option value="2">Multi Select</option>
                                    <option value="3">Fill the Blank</option>
                                    <option value="4">Write Answer</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            {other ? (<></>) : (
                                <BsPlusSquareDotted
                                    className="add_button"
                                    title="Plus"
                                    onClick={() => addOptions()}
                                />
                            )}
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="marks">
                                <Form.Label>Marks</Form.Label>
                                <Form.Control type="text" placeholder="Enter Marks..." size="sm" className="inputmarks" required onChange={(e) => handleMarks(e)} value={marks} />
                            </Form.Group>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="question">
                                <Form.Label>Question</Form.Label>
                                <Form.Control type="text" placeholder="Enter Question..." size="sm" className="input" required onChange={(e) => handleQuestionname(e)} value={questionName} />
                            </Form.Group>
                        </Col>
                    </Row>



                    {single ? (data?.options.map((item, i) => (
                        <Row>
                            <Col md={7}>
                                <Form.Group className="mb-3" controlId="marks">
                                    <Form.Control type="text" onChange={(e) => handleInputChange(i, e.target.value)} placeholder="Enter option..." size="sm" className="option" required value={item.value} />
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                {data?.options.length > 1 && (
                                    <Button size="sm" variant="outline-primary" className="delete_btn" onClick={() => deleteOption(item.id)}>Delete Option</Button>
                                )}
                            </Col>
                        </Row>
                    ))) : (<></>)}
                    {multi ? (data?.options.map((item, i) => (
                        <Row>
                            <Col md={7}>
                                <Form.Group className="mb-3" controlId="marks">
                                    <Form.Control type="text" onChange={(e) => handleInputChange(i, e.target.value)} placeholder="Enter option..." size="sm" className="option" required value={item.value} />
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Form.Check
                                    label={"true"}
                                    onChange={() => handleTrigger(item.id)}
                                />
                            </Col>
                            <Col md={4}>
                                {data?.options.length > 1 && (
                                    <Button size="sm" variant="outline-primary" className="delete_btn" onClick={() => deleteOption(item.id)} >Delete Option</Button>
                                )}
                            </Col>
                        </Row>
                    ))) : (<></>)}
                    {fill ? (data?.options.map((item, i) => (
                        <Row>
                            <Col md={7}>
                                <Form.Group className="mb-3" controlId="marks">
                                    <Form.Control type="text" onChange={(e) => handleInputChange(i, e.target.value)} placeholder="Enter option..." size="sm" className="option" required value={item.value} />
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                {data?.options.length > 1 && (
                                    <Button size="sm" variant="outline-primary" className="delete_btn" onClick={() => deleteOption(item.id)}>Delete Option</Button>
                                )}
                            </Col>
                        </Row>
                    ))) : (<></>)}
                    <Form.Group className="mb-3" controlId="answer">
                        {other ? (
                            <Row>
                                <Col md={12}>
                                    <Form.Label>Answer</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Answer" size="sm" className="input" required value={data.answer} onChange={e => handleotherAnswer(e)} />
                                </Col>
                            </Row>
                        ) : (<></>)}
                        {single ? (
                            <Row>
                                <Col md={12}>
                                    <Form.Select aria-label="Default select example" size="sm" className="correct_answer" required onChange={e => handleAnswer(e)}>
                                        <option value="">Select Correct Answer</option>
                                        {data?.options.map((o) => (
                                            <option key={o.id} value={o.value}>
                                                {o.value}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        ) : (<></>)}
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Button variant="outline-primary" className="button" onClick={handleCancel}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button onClick={handleSubmit} variant="outline-primary" className="button" >Add</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div >
    )
}

export default BaseQuestion;
