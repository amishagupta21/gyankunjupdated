import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import TeacherSidebar from "../TeacherSidebar";
import CustomToast from './Toast';
import {
    getLessonPlanMetadata,
    getGradeDetails,
    createAssignment
} from "../../../ApiClient";

const CreateAssignment = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        name: "",
        message: ""
    })
    const userDetails = JSON.parse(localStorage.getItem("UserData"));
    const [assignmentName, setAssignmentName] = useState("");
    const [assignmentGrade, setAssignmentGrade] = useState("");
    const [gradeDetailList, setGradeDetailList] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [section, setSection] = useState(""); //id,not value
    const [subjectList, setSubjectList] = useState([]);
    const [subject, setSubject] = useState({});
    const [type, setType] = useState("");
    const [duration, setDuration] = useState("0");
    const [chapter, setChapter] = useState("");
    const assignmentTypes = [
        { value: "1", label: "Class Work" },
        { value: "2", label: "Home Work" },
        { value: "3", label: "Test" },
    ];

    useEffect(() => {
        GradeDetails();
    }, [])
    useEffect(() => {

    },[data])
    useEffect(() => {
    }, [gradeDetailList, assignmentGrade, sectionList, section, subjectList, subject, type, duration, chapter])
    const GradeDetails = () => {
        getGradeDetails().then((res) => { setGradeDetailList(res?.data?.grade_details?.grade_details) });
    }
    const handleAssignmentName = (e) => {
        setAssignmentName(e.target.value);
    }
    const handleAssignmentGrade = (e) => {
        var sections;
        for (let i = 0; i < gradeDetailList.length; i++) {
            if (gradeDetailList[i].grade_id == e.target.value) {
                sections = gradeDetailList[i].section_list;
                break;
            }
        }
        setSectionList(sections);
        setAssignmentGrade(e.target.value);
    }
    const handleSection = async (e) => {
        const selectionId = e.target.value
        var subjects = await getLessonPlanMetadata(assignmentGrade, selectionId);
        setSubjectList(subjects?.data?.metadata);
        setSection(selectionId);
    }
    const handleSubject = (e) => {
        for (let i = 0; i < subjectList.length; i++) {
            if (subjectList[i].subject_name == e.target.value) {
                setSubject(subjectList[i])
                return;
            }
        }
        setSubject({});
        return;
    }
    const handleChapter = (e) => {
        setChapter(e.target.value)
    }
    const handleType = (e) => {
        setType(e.target.value)
    }
    const handledurationb = (e) => {
        setDuration(e.target.value);
    }
    const handleCancel = () => {

    }
    const handleCreate = async () => {
        const data = {
            teacher_id: userDetails?.user_id,
            assignment_name: assignmentName,
            chapter_id: chapter,
            assignment_type_id: type,
            assignment_duration: duration
        }
        const res = await createAssignment(data);
        navigate("/teacherDashboard/Assignment");
    }
    const handlequestion = () => {
        if (type == "3" && duration == "0") {
            setData({
                name: "Create Assignment Error",
                message: "You must input duration of Test"
            })
            setShow(true);
        }
        else {
            const data = {
                teacher_id: userDetails?.user_id,
                assignment_name: assignmentName,
                chapter_id: chapter,
                assignment_type_id: type,
                assignment_duration: parseInt(duration)
            }
            const res = createAssignment(data)
                .then((res) => navigate("/teacherDashboard/Addquestions", { state: res.data.assignment_id }))
                .catch((res) => navigate("/teacherDashboard/Assignment"));
        }
    }

    useEffect(() => {
        console.log(sectionList)
        setSection("");
        setSubjectList([]);
    }, [sectionList])
    useEffect(() => {
        setSubject({});
        setChapter("")
    }, [subjectList]);
    useEffect(() => {
        console.log("hi")
        setChapter("")
    }, [subject])


    return (
        <>
            <Row>
                <Col md={3} style={{ marginTop: "91px", width: "20%" }}>
                    <TeacherSidebar />
                </Col>
                <Col md={9} style={{ width: "80%" }}>
                    <div className="reportSection" >
                        
                        <Row
                            style={{
                                height: "74px",
                                boxShadow: "0px 3px 6px #B4B3B329",
                                position: "relative",
                                left: "12px",
                                width: "100%",
                            }}
                        >
                            <Col md={9}>
                                <h4>Create Assignment</h4>
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
                                <Button variant="outline-primary">Go to Assignments fff</Button>
                            </Col>
                        </Row>
                        <Form>
                            <Table style={{ marginTop: "30px" }}>
                                <tr>
                                    <td>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label className='basic-label' style={{ fontSize: "22px" }}>Assignment Name</Form.Label>
                                            <Form.Control
                                                type="name"
                                                placeholder="Assignment Name"
                                                onChange={(e) => handleAssignmentName(e)}
                                                style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                            />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: "22px" }}>Select grade</Form.Label>
                                            <Form.Select
                                                className="lessonPlanSubject"
                                                name="grade"
                                                id="grade"
                                                onChange={(e) => handleAssignmentGrade(e)}
                                                style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                            >
                                                <option value="">--Grade--</option>
                                                {gradeDetailList?.map((grade) => {
                                                    return (
                                                        <option value={grade.grade_id} key={grade.grade_id}>{grade.grade_id}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <Form.Group className="mb-3" controlId="fromSelectionId">
                                            <Form.Label style={{ fontSize: "22px" }} >Select Section</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="lessonPlanSubject"
                                                style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                                value={section}
                                                disabled={assignmentGrade?false:true}
                                                onChange={e => handleSection(e)}
                                            >
                                                <option value="">--Section--</option>
                                                {sectionList?.map((section) => {
                                                    return (
                                                        <option value={section.section_id} key={section.section_id}>{section.section_name}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="fromSelectionId">
                                            <Form.Label style={{ fontSize: "22px" }}>Select Subject</Form.Label>
                                            <Form.Control
                                                className="lessonPlanSubject"
                                                as="select"
                                                name="subject"
                                                style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                                // value={subject?.subject_name}
                                                onClick={e => handleSubject(e)}
                                            >
                                                <option value="">--Subject--</option>
                                                {subjectList?.map((subject) => {
                                                    return (
                                                        <option key={subject.subject_id} value={subject.subject_name}>{subject.subject_name}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ fontSize: "22px" }}>Chapter Number</Form.Label>
                                            <Form.Control
                                                style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                                className="lessonPlanSubject"
                                                as="select"
                                                name="chapter"
                                                value={chapter}
                                                onChange={(e) => handleChapter(e)}
                                            >
                                                <option value="">--Chapter--</option>
                                                {subject ? (<option key={subject.chapter_id} value={subject.chapter_id}>{subject.chapter_number}</option>)
                                                    : (<></>)
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label style={{ fontSize: "22px" }}>Assignment Type</Form.Label>
                                            <Form.Select
                                                style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                                name="type"
                                                id="type"
                                                onChange={e => handleType(e)}
                                            >
                                                <option value="">--Type--</option>
                                                {assignmentTypes.map((type) => {
                                                    return (
                                                        <option key={type.value} value={type.value}>{type.label}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                    </td>
                                </tr>
                                {
                                    (type === "3") ? (
                                        <tr>
                                            <td>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label style={{ fontSize: "22px" }}>Duration</Form.Label>
                                                    <Form.Control
                                                        style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                                                        type="duration"
                                                        placeholder="Enter Duration"
                                                        onChange={(e) => handledurationb(e)}
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>

                                            </td>

                                        </tr>
                                    ) : (
                                        <></>
                                    )
                                }
                            </Table>
                            <Table>
                                <tr>
                                    <td>
                                    </td>
                                    <td style={{ width: "50%" }}>
                                        <Button variant="outline-primary" onClick={() => handleCreate()} style={{ marginRight: "20px", marginLeft: "70px" }} disabled={!(assignmentTypes && section && chapter && subject && type && assignmentName && assignmentGrade && duration)}>Save & Draft</Button>
                                        <Button variant="outline-primary" onClick={() => handlequestion()} disabled={!(assignmentTypes && section && chapter && subject && type && assignmentName && assignmentGrade && duration)}>
                                            Save & Add question
                                        </Button>
                                    </td>
                                </tr>
                            </Table>
                        </Form>
                    </div>
                </Col>
            </Row>
            <CustomToast show={show} setShow={setShow} data={data} />
        </>
    );
}

export default CreateAssignment;

