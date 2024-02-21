import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { evaluteAssignment } from '../../../ApiClient';
import './EvaluteAssignmentReport.css';
import { Badge, Button } from 'react-bootstrap';
import TeacherSidebar from '../TeacherSidebar';
import { Col, Row, Table, Form } from 'react-bootstrap';

const EvaluteAssignmentReport = () => {
    const { assignmentId, studentId } = useParams();
    const [evaluationData, setEvaluationData] = useState(null);
    const [obtainedMarks, setObtainedMarks] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [marksForWriteAnswer, setMarksForWriteAnswer] = useState({});


    useEffect(() => {
        evaluteAssignment(assignmentId, studentId)
            .then(response => {
                console.log('API Response:', JSON.stringify(response.data));
                setEvaluationData(response.data);
            })
            .catch(error => {
                console.error('Error evaluating assignment:', error);
            });
    }, [assignmentId, studentId]);
    const handleMarksForWriteAnswerChange = (questionNumber, event) => {
        const marks = parseFloat(event.target.value) || 0;
        setMarksForWriteAnswer((prevMarks) => ({
            ...prevMarks,
            [questionNumber]: marks,
        }));
    };

    const handleEvaluateAssignment = () => {
        const totalPossibleMarks = Object.values(evaluationData.student_response)
            .reduce((total, question) => total + question.marks, 0);

        const calculatedPercentage = (obtainedMarks / totalPossibleMarks) * 100;

        setPercentage(calculatedPercentage);
    };

    const handleObtainedMarksChange = (event) => {
        const marks = parseFloat(event.target.value) || 0;
        setObtainedMarks(marks);
    };

    if (evaluationData === null) {
        return <div>Loading...</div>;
    }

    return (
        <Row className="w-100">
            <Col md={3} className="mt-5">
                <TeacherSidebar />
            </Col>
            <Col md={6} style={{ marginLeft: '100px' }}>
                <div className="evaluation-report" style={{ marginTop: '100px' }}>
                    <div className="section">
                        <h2>Submitted Assignment</h2>
                        {Object.keys(evaluationData.student_response).map((questionNumber) => (
                            <div key={questionNumber} className="question">
                                <div className="left-section" style={{ textAlign: 'left' }}>
                                    <p>Question: {evaluationData.student_response[questionNumber].question}</p>
                                    {evaluationData.student_response[questionNumber].type !== 'Single Select' &&
    evaluationData.student_response[questionNumber].type !== 'Multi Select' && (
        <div>
            <p>
                <strong>Answer:</strong> {evaluationData.student_response[questionNumber].selected_answer}
            </p>
        </div>
)}
                                    <p>
                                        {evaluationData.student_response[questionNumber].type === 'Single Select' ? (
                                            evaluationData.student_response[questionNumber].all_options.map((option, index) => (
                                                <div key={index} className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id={`option_${index}`}
                                                        checked={
                                                            evaluationData.student_response[questionNumber].answer &&
                                                            evaluationData.student_response[questionNumber].answer === option
                                                        }
                                                        readOnly
                                                    />
                                                    <label className="form-check-label" htmlFor={`option_${index}`}>
                                                        {option}
                                                    </label>
                                                </div>
                                            ))
                                        ) : evaluationData.student_response[questionNumber].type === 'Multi Select' ? (


                                            evaluationData.student_response[questionNumber].all_options.map((option, index) => (
                                                <div key={index} className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={`option_${index}`}
                                                        checked={
                                                            evaluationData.student_response[questionNumber].selected_answer &&
                                                            evaluationData.student_response[questionNumber].selected_answer.includes(`${index}-${option}`)
                                                        }
                                                        readOnly
                                                    />
                                                    <label className="form-check-label" htmlFor={`option_${index}`}>
                                                        {option}
                                                    </label>
                                                </div>
                                            ))


                                        ) : (
                                            null
                                        )}
                                    </p>
                                    {evaluationData.student_response[questionNumber].type === 'Write Answer' && (
                                        <div className="write-answer-marks">
                                            <Form.Group controlId={`marksForWriteAnswer_${questionNumber}`}>
                                                <Form.Label>Marks for Write Answer</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter marks"
                                                    value={marksForWriteAnswer[questionNumber] || ''}
                                                    onChange={(event) => handleMarksForWriteAnswerChange(questionNumber, event)}
                                                    style={{ width: '30%' }}
                                                />
                                            </Form.Group>

                                            
                                        </div>
                                    )}


                                </div>
                                <div className="right-section">
                                    <p>
                                        {/* <span>Time Taken: {evaluationData.student_response[questionNumber].time_taken}</span> */}
                                        <span>Marks: {evaluationData.student_response[questionNumber].marks}</span>
                                    </p>
                                    <p>Type: {evaluationData.student_response[questionNumber].type}</p>
                                    <p>
                                        {evaluationData.student_response[questionNumber].is_correct ? (
                                            <span>Correct: ✔</span>
                                        ) : (
                                            <span>Incorrect: ✘</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>






                </div>
                <Form>
                    <Form.Group controlId="obtainedMarks">
                        <Form.Label>Obtained Marks</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter obtained marks"
                            value={obtainedMarks}
                            onChange={handleObtainedMarksChange}
                            style={{ width: '50%', marginLeft: '170px' }}
                        />
                    </Form.Group>
                    {percentage !== null && (
                        <div className="result-section">
                            <h3>Obtained Marks: {obtainedMarks}</h3>
                            <h3>Total Marks: {percentage}%</h3>
                        </div>
                    )}
                    <Button className="mt-3" onClick={handleEvaluateAssignment}>
                        Evaluate Assignment
                    </Button>
                </Form>


            </Col>
        </Row>
    );
};

export default EvaluteAssignmentReport;
