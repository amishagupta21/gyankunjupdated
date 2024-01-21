
import React, { useState } from "react";
import { Row, Col, Button, Form, Badge } from "react-bootstrap";
import "./index.css";

const Question = ({ data, index, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const [validationError, setValidationError] = useState(null);
  

  const handleSaveEdit = () => {

    setValidationError(null);

    handleEdit(index, editedData);
    setIsEditing(false);
  };
  const handleDeleteOption = (opIndex) => {
    const updatedOptions = [...editedData.all_options];
    updatedOptions.splice(opIndex, 1);
  
    const updatedAnswer = Array.isArray(editedData.answer)
      ? editedData.answer.filter((option) => option !== editedData.all_options[opIndex])
      : [];
  
    setEditedData({
      ...editedData,
      all_options: updatedOptions,
      answer: updatedAnswer,
    });
  };
  
  const renderOptions = () => {
    return (
      <Row>
        <Col md={2}>
          <Form.Label className="questiondetail">All Options:</Form.Label>
        </Col>
        <Col md={8}>
          {editedData.all_options?.map((option, opIndex) => (
            <Row key={opIndex} className="mb-2 align-items-center">
              <Col md={6}>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...editedData.all_options];
                    updatedOptions[opIndex] = e.target.value;
                    setEditedData({ ...editedData, all_options: updatedOptions });
                  }}
                  className="mb-2"
                />
              </Col>
              <Col md={2}>
              <Col md={2}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteOption(opIndex)}
            >
              Delete
            </Button>
          </Col>
              </Col>
              <Col md={4}>
                {editedData.type === "Single Select" ? (
                  <Form.Check
                    type="radio"
                    label="Correct"
                    checked={editedData.answer.includes(option)}
                    onChange={() => {
                      setEditedData({ ...editedData, answer: [option] });
                    }}
                  />
                ) : (
                  <Form.Check
                    type="checkbox"
                    label="Correct"
                    checked={editedData.answer.includes(option)}
                    onChange={() => {
                      const updatedAnswers = [...editedData.answer];
                      const index = updatedAnswers.indexOf(option);

                      if (index !== -1) {
                        updatedAnswers.splice(index, 1);
                      } else {
                        updatedAnswers.push(option);
                      }

                      setEditedData({ ...editedData, answer: updatedAnswers });
                    }}
                  />
                )}
              </Col>
            </Row>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const updatedOptions = [...(editedData.all_options || []), ""];
              setEditedData({ ...editedData, all_options: updatedOptions });
            }}
          >
            Add Option
          </Button>
        </Col>
      </Row>
    );
  };



  return (
    <div className="mb-5 border p-3">
      {isEditing ? (
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Edit Question:</Form.Label>
            <Form.Control
              type="text"
              value={editedData.question}
              onChange={(e) => setEditedData({ ...editedData, question: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check Answer:</Form.Label>
            <Form.Control
              type="text"
              value={Array.isArray(editedData.answer) ? editedData.answer.join(", ") : editedData.answer}
              onChange={(e) => setEditedData({ ...editedData, answer: e.target.value })}
              readOnly
            />
          </Form.Group>

          {editedData.type === "Single Select" && renderOptions()}
          {editedData.type === "Multi Select" && renderOptions()}

          <Form.Group className="mb-3">
            <Form.Label>Edit Marks:</Form.Label>
            <Form.Control
              type="text"
              value={editedData.marks}
              onChange={(e) => setEditedData({ ...editedData, marks: e.target.value })}
            />
          </Form.Group>

          {validationError && <div className="text-danger mb-2">{validationError}</div>}

          <Button variant="success" onClick={handleSaveEdit} className="me-2">
            Save
          </Button>

          <Button variant="danger" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <Row className="mb-3">
            <Col md={2}>
              <span className="questiondetail">Question:</span>
            </Col>
            <Col md={6}>
              <span className="questiondetail">{data.question}</span>
            </Col>
            <Col md={2} className="d-flex justify-content-end align-items-center">
              {!isEditing && (
                <>
                  <span className="questiondetail">Marks:</span>
                  <span className="badge text-bg-success ms-2">{data.marks}</span>
                </>
              )}
            </Col>
            <Col md={2} className="d-flex justify-content-end align-items-center">
              {!isEditing && (
                <Button variant="outline-primary" onClick={() => setIsEditing(true)} className="me-3">
                  Edit
                </Button>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2}>
              <span className="questiondetail">Answer:</span>
            </Col>
            <Col md={10}>
              {Array.isArray(data.answer)
                ? data.answer.map((i) => <span key={i} className="me-2">{i}.</span>)
                : data.answer}
            </Col>
          </Row>
          {["Single Select", "Multi Select"].includes(data.type) && (
            <Row className="mb-3">
              <Col md={2}>
                <span className="questiondetail">All Options:</span>
              </Col>
              <Col md={10}>
                {console.log("data.all_options", data.all_options)}
                {data.all_options?.map((option, opIndex) => (
                  <Badge key={opIndex} pill variant="primary" className="custom-badge">
                    {option}
                  </Badge>
                ))}
              </Col>
            </Row>
          )}

        </div>
      )}
    </div>
  );
};

export default Question;