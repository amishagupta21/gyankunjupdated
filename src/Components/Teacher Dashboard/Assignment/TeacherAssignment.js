import React, { useEffect, useState } from "react";
import TeacherSidebar from "../TeacherSidebar";
import { Row, Col, Button, Table, Form, Badge, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";
import { MdPublish } from "react-icons/md";
import { BsFillPeopleFill, BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import SaveAssignment from "./SaveAssignment";
import { assignmentList, publishAssignmentData, getQuestions, deleteAssignment } from '../../../ApiClient'
import CreateNewAssignment from "./CreateNewAssignment";
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import CustomToast from "./Toast";





const TeacherAssignment = () => {
  const userDetails = JSON.parse(localStorage.getItem('UserData'))
  const id = userDetails.user_id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [assignments, setAssignments] = useState({
    loading: true,
    data: [],
  });
  const [deleteflag, setDeleteflag] = useState(true);
  const [publishflag, setPublishflag] = useState(true);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    subjects: [],
    types: [],
    statuses: [],
    grades: [],
  });

  const [filters, setFilters] = useState({
    subject: "",
    type: "",
    status: "",
    grade: ""
  });
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: "",
    message: ""
  })

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // const ObjectLength = (object) => {
  //   var length = 0;
  //   for (var key in object) {
  //     if (object.hasOwnProperty(key)) {
  //       ++length;
  //     }
  //   }
  //   return length;
  // }
  const Is_questions = async (id) => {
    const result = await getQuestions(id);
    if (result.data.status === "success") {
      if (result.data.assignment_details[0].assignment_data !== "") {
        return true;
      }
      else return false;
    }
    else return false;
  }
  const publishAssignment = async (id) => {
    if (await Is_questions(id) === true) {
      const result = await publishAssignmentData(id);

      setData({
        name: "Publish",
        message: "Your operation has success!"
      })
      setShow(true)
      setPublishflag(!publishflag);
    }
    else {
      setData({
        name: "Publish",
        message: "Sorry,There is no questions in this Assignment"
      })
      setShow(true)
      setPublishflag(!publishflag);
    }
  }
  const deleteAssign = async (id) => {
    const result = await deleteAssignment(id);
    if (result.data.status === "success") {
      setData({
        name: "Delete",
        message: "Your operation has success!"
      })
      setShow(true)
      setDeleteflag(!deleteflag);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = (await assignmentList(id)).data?.assignments;

        const tempAssignments = res || [];

        setAssignments({
          loading: false,
          data: [tempAssignments],
        });
        setFilteredAssignments([tempAssignments]);

        let subjects = tempAssignments?.map(({ subject_name }) => subject_name);

        let uniqueSubjects = [...new Set(subjects)];

        let types = tempAssignments?.map(
          ({ assignment_type_name }) => assignment_type_name
        );
        let uniqueTypes = [...new Set(types)];

        let grades = tempAssignments?.map(({ grade }) => grade);
        let uniqueGrades = [...new Set(grades)];

        setFilterOptions({
          subjects: uniqueSubjects,
          types: uniqueTypes,
          statuses: ["published", "draft"],
          grades: uniqueGrades,
        });
      } catch (err) {
        console.log("ERR", err);
      }
    })();
    console.log("filter", filteredAssignments)
    console.log(data);
  }, [deleteflag, publishflag]);

  useEffect(() => {
    if (assignments.data.length > 0) {
      console.log("hey", filters)
      console.log(assignments.data[0]);
      const tempArr = assignments.data[0].filter((item) => {
        let pass = {
          subject: true,
          type: true,
          status: true,
          grade: true,
        };

        if (filters.subject) {
          if (item?.subject_name == filters.subject) {
            pass.subject = true;
          } else {
            pass.subject = false;
          }
        }

        if (filters.type) {
          if (item?.assignment_type_name == filters.type) {
            pass.type = true;
          } else {
            pass.type = false;
          }
        }

        if (filters.grade) {
          if (item?.grade == filters.grade) {
            pass.grade = true;
          } else {
            pass.grade = false;
          }
        }

        if (filters.status) {
          if (filters.status == "published" && item?.is_published) {
            pass.status = true;
          }
          else if (filters.status == "draft" && !item.is_published) {
            pass.status = true;
          }
          else {
            pass.status = false;
          }
        }

        return pass.subject && pass.type && pass.status && pass.grade;
      });
      const Arr = [tempArr];
      console.log(Arr);
      setFilteredAssignments(Arr)
    }
  }, [filters]);

  console.log("Assignments", assignments.data);
  console.log("filters", filteredAssignments);
  return (
    <>

      <Row>
        <Col md={3} style={{ marginTop: "91px", width: "20%" }}>
          <TeacherSidebar />
        </Col>
        <Col md={9} style={{ width: "80%" }}>
          <div className="reportSection">
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
                <h4>Assignment</h4>
              </Col>
              <Col
                md={3}
                style={{ paddingTop: "17px" }}
                onClick={
                  () => {
                    navigate('/teacherDashboard/CreateAssignment');
                  }
                }
              >
                <Button variant="outline-primary">+ Create New</Button>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Table striped hover>
                  <thead>
                    <tr
                      style={{
                        background: "#7A9ABF 0% 0% no-repeat padding-box",
                        borderRadius: "4px 4px 0px 0px",
                        opacity: "1",
                      }}
                    >
                      <th><Row style={{ marginBottom: "5px" }}>
                        <Col md="12">Assignment Name</Col>
                      </Row></th>
                      <th>
                        <Row>
                          <Col md="6">
                            Grade
                          </Col>
                          <Col md="6">
                            <Form.Select aria-label="Default select example" size="sm" name="grade" onChange={handleFilterChange}>
                              <option value="">All</option>
                              {filterOptions.grades.map((grade) => (
                                <option key={grade} value={grade}>
                                  {grade}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </th>
                      <th><Row style={{ marginBottom: "5px" }}>
                        <Col md="9">Section</Col>
                      </Row></th>
                      <th>
                        <Row>
                          <Col md="6">
                            Subject
                          </Col>
                          <Col md="6">
                            <Form.Select aria-label="Default select example" size="sm" onChange={handleFilterChange} name="subject">
                              <option value="">All</option>
                              {filterOptions.subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                  {subject}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </th>
                      <th><Row style={{ marginBottom: "5px" }}>
                        <Col md="9">Chapter</Col>
                      </Row></th>
                      <th>
                        <Row>
                          <Col md="6">
                            Type
                          </Col>
                          <Col md="6">

                            <Form.Select aria-label="Default select example" size="sm" onChange={handleFilterChange} name="type">
                              <option value="">All</option>
                              {filterOptions.types.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </th>
                      <th><Row style={{ marginBottom: "5px" }}>
                        <Col md="9">Duration/mins</Col>
                      </Row></th>
                      <th>
                        <Row>
                          <Col md="6">Status</Col>
                          <Col md="6">
                            <Form.Select aria-label="Default select example" size="sm" onChange={handleFilterChange} name="status">
                              <option value="">All</option>
                              {filterOptions.statuses.map((statue) => (
                                <option key={statue} value={statue}>
                                  {statue}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </th>
                      <th><Row style={{ marginBottom: "5px" }}>
                        <Col md="9">Actions</Col>
                      </Row></th>
                    </tr>
                  </thead>
                  {filteredAssignments[0]?.map(
                    (item) => {
                      return (
                        <tbody>
                          <tr>
                            <td>{item?.assignment_name}</td>
                            <td>{item?.grade}</td>
                            <td>{item?.section_name}</td>
                            <td>{item?.subject_name}</td>
                            <td>{item?.chapter_number}</td>
                            <td>{item?.assignment_type_name}</td>
                            <td>{item?.assignment_duration}</td>
                            <td>
                              {item?.is_published ? (<h5><Badge bg="primary">Publish</Badge></h5>) : (<h5><Badge bg="secondary">draft</Badge></h5>)}
                            </td>
                            <td className="flex gap-6">
                              {!item?.is_published && (
                                <Row>
                                  <Col md={4}>
                                    <BiSolidEdit
                                      className="cursor-pointer h-6 w-6 text-[#676d71]"
                                      title="Edit"
                                      onClick={() => {
                                        navigate('/teacherDashboard/Addquestions', { state: item?.assignment_id })
                                      }}
                                    />
                                  </Col>
                                  <Col md={4}>
                                    <MdPublish
                                      className="cursor-pointer h-6 w-6 text-[#676d71]"
                                      title="Publish"
                                      onClick={() => {
                                        publishAssignment(item?.assignment_id)
                                      }}
                                    />
                                  </Col>

                                  <Col md={4}>
                                    <AiFillDelete
                                      className="cursor-pointer h-6 w-6 text-[#676d71]"
                                      title="Delete"
                                      onClick={() => {
                                        deleteAssign(item?.assignment_id);
                                      }}
                                    />
                                  </Col>
                                </Row>
                              )}
                              {item?.is_published && (
                                <Row>
                                  <Col md="6">
                                    <BsEyeFill
                                      className="cursor-pointer h-6 w-6 text-[#676d71]"
                                      title="View"
                                    />
                                  </Col>
                                  <Col md="6">
                                    <BsFillPeopleFill
                                      className="cursor-pointer h-6 w-6 text-[#676d71]"
                                      title="See Submissions"
                                    />
                                  </Col>
                                </Row>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    }
                  )}
                </Table>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <CustomToast show={show} setShow={setShow} data={data} />
    </>
  );
};

export default TeacherAssignment;
