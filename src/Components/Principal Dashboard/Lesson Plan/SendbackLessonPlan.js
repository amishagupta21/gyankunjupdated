import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
// import {saveAttendance } from '../../../ApiClient'

const SendBackPlan = (props) => {

  return (
    <>
      <Modal
        className="ModalBody"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Send Back this Lesson Plan?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Col md={12}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Leave a message for Teacher</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Add Message"
                    // value={noticeDescription}
                    // onChange={(e) => setNoticeDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary">Send Back</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendBackPlan;
