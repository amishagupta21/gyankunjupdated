import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from 'react-select'

const AddResources = (props) => {

  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('')
  const [teacherName, setTeacherName] = useState()
  const [period, setPeriod] = useState('')
  const [section, setSection] = useState('')

  // const handleGrade = (e) => {
  //   console.log("e - ", e)
  // }

  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const gradeOptions = [
    { value: '1', label: '1' }
  ]

  const subjectOptions = [
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'English', label: 'English' }
  ]

  const teacherOptions = [
    { value: 'Julie', label: 'Julie' },
    { value: 'S.K. Tripathy', label: 'S.K. Tripathy' },
    { value: 'Khan Sir', label: 'Khan Sir' }
  ]

  const periodOptions = [
    { value: '1st', label: '1st' },
    { value: '2nd', label: '2nd' },
    { value: '4th', label: '4th' },
    { value: '5th', label: '5th' },
    { value: '6th', label: '6th' },
    { value: '7th', label: '7th' },
    { value: '8th', label: '8th' },
    { value: '9th', label: '9th' },
    { value: '10th', label: '10th' }
  ]

  // const timingOptions = [
  //   { value: '8:00 - 8:30', label: '8:00 - 8:30' },
  //   { value: '8:30 - 9:00', label: '8:30 - 9:00' },
  // ]

  const sectionOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' }
  ]

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Resources</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row style={{marginBottom: "42px"}}>
              <Col md={5}>
                <span>Add Grade</span>
                <Select options={gradeOptions} value={grade} onChange={(e) => setGrade(e.target.value)} />
              </Col>
              <Col md={2}>
              </Col>
              <Col md={5}>
                <span>Add Subject</span>
                <Select options={subjectOptions} />
              </Col>
            </Row>
            <Row style={{marginBottom: "42px"}}>
              <Col md={5}>
                <span>Teacher Name</span>
                <Select options={teacherOptions} />
              </Col>
              <Col md={2}>
              </Col>
              <Col md={5}>
                <span>Add Book</span>
                <Select options={periodOptions} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" style={{alignItems:"center"}}>Reset</Button>
          <Button variant="outline-primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddResources;
