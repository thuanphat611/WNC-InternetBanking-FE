import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";

const NewEmployeeForm = (props) => {
  const [validated, setValidated] = useState(false);

  const [formVariables, setFormVariables] = useState({
    accountNumber: "",
    balance: 50000,
    username: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    role: "employee",
    status: true,
    password: "",
    message: "",
    error: "",
    isLoading: false,
  });

  const renderAlert = () => {
    if (formVariables.message)
      return (
        <AlertBox
          alertTypes={formVariables.error}
          alertMessage={formVariables.message}
        />
      );
  };

  const setFormError = (error, message) => {
    let alertTypes = error === null ? "success" : "danger";

    formVariables["error"] = alertTypes;
    setFormVariables({ ...formVariables });

    formVariables["message"] = message;
    setFormVariables({ ...formVariables });
  };

  const handleChange = (e) => {
    formVariables[e.target.name] = e.target.value;
    setFormVariables({ ...formVariables });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setFormVariables({ ...formVariables, isLoading: true });
      console.log({
        name: formVariables.name,
        password: formVariables.password,
        email: formVariables.email,
        phoneNumber: formVariables.phone,
        address: formVariables.address,
        role: "Employee",
      });
      axios
        .post("/api/protected/service-provider", {
          name: formVariables.name,
          password: formVariables.password,
          email: formVariables.email,
          phoneNumber: formVariables.phone,
          address: formVariables.address,
          role: "Employee",
        })
        .then((result) => {
          if (result.status === 201)
            setFormError(null, "New employee created!");
        })
        .catch((err) => {
          const { response } = err;
          console.log(err.response);
          if (response.status === 400) {
            setFormError(true, "Something's wrong!");
          } else setFormError(true, "Something's wrong!");
        });
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={6}>
          <Card className="text-center mt-3">
            <Card.Header className="text-center toolbar">
              <span>CREATE NEW EMPLOYEE</span>
            </Card.Header>
            <Card.Body>
              {renderAlert()}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Text className="text-muted font-weight-bold">
                    Name
                  </Form.Text>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    value={formVariables.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill the field.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted font-weight-bold">
                    Email
                  </Form.Text>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={formVariables.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill the field.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted font-weight-bold">
                    Phone number
                  </Form.Text>
                  <Form.Control
                    required
                    type="text"
                    name="phone"
                    value={formVariables.phone}
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill the field.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted font-weight-bold">
                    Address
                  </Form.Text>
                  <Form.Control
                    required
                    type="address"
                    name="address"
                    value={formVariables.address}
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill the field.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Text className="text-muted font-weight-bold">
                    Password
                  </Form.Text>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={formVariables.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill the field.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  {formVariables.isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Waiting...
                    </>
                  ) : (
                    <>Create</>
                  )}
                </Button>
              </Form>
            </Card.Body>
            {/* <Card.Footer className="text-muted text-center">
              HCMUS - PTUDWNC - 21KTPM1
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewEmployeeForm;
