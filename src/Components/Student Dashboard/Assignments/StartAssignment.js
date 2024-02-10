import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col, Table } from "react-bootstrap";
import { loadAssignmentData } from '../../../ApiClient'
import { viewStudentAssignment } from '../../../ApiClient'
import './studentAssignment.css'

const AssignmentSheet = (props) => {

  const [fullscreen, setFullscreen] = useState(true);
  const [assignmentFullData, setassignmentFullData] = useState({});
  const [assignlist, setAssignList] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const [show, setShow] = useState({
    show: false,
    index: ""
  });
  const [timers, setTimers] = useState([]);
  const [assignmentDuration, setAssignmentDuration] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);

  useEffect(() => {
    fetchAssignmentData();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleBeforeUnload = async (event) => {
    console.log("Handling before unload event");
    if (props.assignmentType === "Test") {
      event.preventDefault();
      setShowSubmitWarning(true);
      await submitAssignment();
      event.returnValue = "";
    }
  };

  useEffect(() => {
    if (timeLeft === 14 && props.assignmentType === "Test") {
      setShowTimeWarning(true);
    }
  }, [timeLeft, props.assignmentType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = timeLeft - 1;
      if (newTimeLeft >= 0) {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const userDetails = JSON.parse(localStorage.getItem('UserData'));

  const fetchAssignmentData = () => {
    const AssignmentId = props.assignmentId;
    const userId = userDetails?.user_id;
    loadAssignmentData(AssignmentId, userId)
      .then((res) => {
        console.log("RES", res);
        setassignmentFullData(res.data.assignment_data);
        setAssignList(Object.values(res.data.assignment_data));
        setTimers(new Array(Object.values(res.data.assignment_data).length).fill({ startTime: null, endTime: null, elapsedTime: 0 }));
        setAssignmentDuration(res.data.assignment_duration);
      })
      .catch((err) => console.log("AssignmentData err - ", err));
  };

  useEffect(() => {
    if (assignmentDuration !== null) {
      setTimeLeft(assignmentDuration * 60);
    }
  }, [assignmentDuration]);
  const handleShowQuestion = (index) => {
    if (show.index !== "") {
      const newTimers = [...timers];
      newTimers[show.index].endTime = Date.now();
      newTimers[show.index].elapsedTime += newTimers[show.index].endTime - newTimers[show.index].startTime;
      setTimers(newTimers);
    }

    const questionId = `question_number_${index + 1}`;
    setUserAnswers(prevState => ({
      ...prevState,
      [questionId]: ""
    }));

    setShow({
      show: true,
      index: index
    });
    startTimer(index);
  };


  const startTimer = (index) => {
    const newTimers = [...timers];
    newTimers[index] = { startTime: Date.now(), endTime: null, elapsedTime: 0 };
    setTimers(newTimers);
  };

  const handleSubmitAssignment = () => {
    if (show.index !== "") {
      const newTimers = [...timers];
      newTimers[show.index].endTime = Date.now();
      newTimers[show.index].elapsedTime += newTimers[show.index].endTime - newTimers[show.index].startTime;
      setTimers(newTimers);
    }
  };

  const formatTime = (seconds) => {
    if (seconds <= 0) {
      return "Time's up!";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} seconds`;
  };



  const handleUserAnswerChange = (value, questionId) => {
    setUserAnswers(prevState => ({
      ...prevState,
      [questionId]: value
    }));
  };

  const submitAssignment = () => {
    const assignmentData = assignlist.map((question, index) => {
      const questionId = `question_number_${index + 1}`;
      const startTime = timers[index]?.startTime;
      const endTime = timers[index]?.endTime;
      const elapsedTime = endTime && startTime ? (endTime - startTime) / 1000 : 0;
      return {
        [questionId]: {
          type: question.type,
          question: question.question,
          selected_answer: userAnswers[questionId],
          all_options: question.all_options,
          marks: question.marks,
          time_taken: "1 min 30 seconds"
        }
      };
    });

    const requestBody = {
      student_id: userDetails.user_id,
      assignment_data: Object.assign({}, ...assignmentData),
      overall_time: timeLeft > 0 ? formatTime(timeLeft) : "Time's up!",
      assignment_id: props.assignmentId,
      submit_data: true
    };

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiI0ODJjOTgxNS1iOWQ0LTRlNGYtOGJiNi0zOTRjODUyZDM1NWUiLCJleHAiOjI2NTMxMzc2MDV9.JPYYukYqWOulGx_JBHehSzKMpFalemeBxJsL6jDkWjA'; // Replace 'your-access-token' with the actual access token

    fetch('http://13.200.112.20:5005/submit_assignment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': accessToken
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Assignment submitted successfully:', data);
      })
      .catch(error => {
        console.error('Error submitting assignment:', error);
      });
  };

  const saveProgress = () => {
    const assignmentData = assignlist.map((question, index) => {
      const questionId = `question_number_${index + 1}`;
      return {
        [questionId]: {
          type: question.type,
          question: question.question,
          selected_answer: userAnswers[questionId],
          all_options: question.all_options,
          marks: question.marks,
          time_taken: "1 min 30 seconds"//static time
        }
      };
    });

    const requestBody = {
      student_id: userDetails.user_id,
      assignment_data: Object.assign({}, ...assignmentData),
      overall_time: formatTime(30 * 1000),
      assignment_id: props.assignmentId,
      submit_data: false
    };

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiI0ODJjOTgxNS1iOWQ0LTRlNGYtOGJiNi0zOTRjODUyZDM1NWUiLCJleHAiOjI2NTMxMzc2MDV9.JPYYukYqWOulGx_JBHehSzKMpFalemeBxJsL6jDkWjA';  // Replace 'your-access-token' with the actual access token

    fetch('http://13.200.112.20:5005/submit_assignment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': accessToken
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        props.setAssignmentFullList(prevState => ({
          ...prevState,
          student_assignments: prevState.student_assignments.map(assignment => {
            if (assignment.assignment_id === props.assignmentId) {
              return {
                ...assignment,
                assignment_status: "Inprogress"
              };
            }
            return assignment;
          })
        }));
        return response.json();
      })

      .then(data => {
        console.log('Progress saved successfully:', data);
      })
      .catch(error => {
        console.error('Error saving progress:', error);
      });

  };


  useEffect(() => {
    if (timeLeft === 14 && props.assignmentType === "Test") {
      setShowTimeWarning(true);
      setTimeout(() => {
        setShowTimeWarning(false);
      }, 3000);
    }
  }, [timeLeft, props.assignmentType]);




  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        fullscreen={fullscreen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ backgroundColor: "#E1E9F3" }}
      >
        <Modal.Header closeButton style={{
          background: "#7A9ABF 0% 0% no-repeat padding-box",
          borderRadius: "4px 4px 0px 0px",
          opacity: "1",
        }}>
          <Col md={8} className="assignmentName">
            Name of the assignment: <b>{props?.assignmentName}</b>
          </Col>
          <Col md={4} className="assignmentName">
            {props.assignmentType !== "Test" && (
              <Button variant="primary" onClick={saveProgress}>Save Progress</Button>
            )}
          </Col>
          {showSubmitWarning && (
            <div className="submit-warning">
              <p>Your assignment will be auto-submitted in a few seconds.</p>
            </div>
          )}

        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <div className="assignmentNameHeader">
              {props.assignmentType === "Test" && (
                <Row>
                  <Col md={2} className="assignmentName">
                    <div className="duration-container">
                      {timeLeft > 0 ? (
                        <>
                          <div className="duration-text">Duration: {formatTime(timeLeft)}</div>
                        </>
                      ) : (
                        <div>Time's up!</div>
                      )}


                    </div>
                  </Col>
                  {timeLeft > 0 && (
                    <Col md={10} className="progress-ring">
                      <div className="progress-ring">
                        <svg className="progress-circle" width="60" height="60">
                          <circle
                            className="progress-circle"
                            stroke="#4CAF50"
                            strokeWidth="8"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                            style={{
                              strokeDasharray: 2 * Math.PI * 26,
                              strokeDashoffset: `calc(${2 * Math.PI * 26} - (${2 * Math.PI * 26} * ${timeLeft} / (${assignmentDuration * 60})))`
                            }}
                          />
                        </svg>
                      </div>
                    </Col>
                  )}
                </Row>
              )}
            </div>
          </Modal.Body>

          <Modal
            show={showTimeWarning}
            onHide={() => setShowTimeWarning(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Time Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Hurry up! Only 14 seconds remaining.
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={() => setShowTimeWarning(false)}>OK</Button> */}
            </Modal.Footer>
          </Modal>
          <div className="card-container">
            {assignlist?.map((question, index) => (
              <div key={index} className="questionCard" onClick={() => handleShowQuestion(index)}> {/* Added onClick handler */}
                <div className="questionSetText">
                  Q.{index + 1} {question?.question}
                </div>
                <div className="answerCard">
                  <div>
                    <strong>Type:</strong> {question.type}
                  </div>
                  {timers[index] && (
                    <div>
                      {timers[index].startTime && <p>Start Time: {new Date(timers[index].startTime).toLocaleTimeString()}</p>}
                      {timers[index].endTime && <p>End Time: {new Date(timers[index].endTime).toLocaleTimeString()}</p>}
                      {timers[index].startTime && timers[index].endTime && (
                        <p>Elapsed Time: {formatTime((timers[index].endTime - timers[index].startTime) / 1000)}</p>
                      )}
                    </div>

                  )}
                  {question.type === "Single Select" && (
                    <>
                      {question.type === "Single Select" && (
                        <>
                          <p><strong>Options:</strong></p>
                          <ul>
                            {question.all_options.map((option, idx) => (
                              <li key={idx}>
                                <label>
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    checked={userAnswers[`question_number_${index + 1}`] === option || question.selected_answer === option} 
                                    onChange={() => handleUserAnswerChange(option, `question_number_${index + 1}`)} 
                                  />
                                  {option}
                                  {question.selected_answer === option && ( 
                                    <span> - Selected</span>
                                  )}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                    </>
                  )}
                  {question.type === "Multi Select" && (
                    <>
                      <p><strong>Question:</strong> {question.question}</p>
                      <p><strong>Options:</strong></p>
                      <ul>
                        {question.all_options.map((option, idx) => (
                          <li key={idx}>
                            <label>
                              <input
                                type="checkbox"
                                name={`question-${index}`}
                                value={option}
                                checked={userAnswers[`question_number_${index + 1}`]?.includes(option) || (question.selected_answer && question.selected_answer.includes(option))} 
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const selectedOptions = userAnswers[`question_number_${index + 1}`] || [];
                                  const updatedOptions = isChecked
                                    ? [...selectedOptions, option]
                                    : selectedOptions.filter(selectedOption => selectedOption !== option);
                                  handleUserAnswerChange(updatedOptions, `question_number_${index + 1}`);
                                }}
                              />
                              {option}
                              {question.selected_answer && question.selected_answer.includes(option) && ( 
                                <span> - Selected</span>
                              )}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}


                  {question.type === "Fill the Blank" && (
                    <>
                      <p><strong>Question:</strong> {question.question}</p>
                      <p><strong>Answer:</strong></p>
                      <textarea
                        className="answerTextArea"
                        rows={4}
                        cols={50}
                        placeholder="Type your answer here..."
                        value={userAnswers[`question_number_${index + 1}`] || question.selected_answer} 
                        onChange={(e) => handleUserAnswerChange(e.target.value, `question_number_${index + 1}`)}
                      />
                    </>
                  )}

                  {question.type === "Write Answer" && (
                    <>
                      <p><strong>Question:</strong> {question.question}</p>
                      <p><strong>Answer:</strong></p>
                      <textarea
                        className="answerTextArea"
                        rows={4}
                        cols={50}
                        placeholder="Type your answer here..."
                        value={userAnswers[`question_number_${index + 1}`] || question.selected_answer} 
                        onChange={(e) => handleUserAnswerChange(e.target.value, `question_number_${index + 1}`)}
                      />
                    </>
                  )}

                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={submitAssignment}>Submit Assignment</Button>

        </Modal.Footer>
      </Modal>
    </>
  );

};

export default AssignmentSheet;
