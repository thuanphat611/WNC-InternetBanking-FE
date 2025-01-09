import React, { useState } from "react";
import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";

const NewCustomerForm = (props) => {
  const { reducerAuthorization } = props;
  const { accessToken } = reducerAuthorization.authentication;
  const [validated, setValidated] = useState(false);

  const [formVariables, setFormVariables] = useState({
    name: "",
    phone: "",
    email: "",
    role: "customer",
    address: "",
    password: "",
    message: "",
    error: "",
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
      console.log(formVariables);
      axios
        .post("/api/auth/register", {
          name: formVariables.name,
          phoneNumber: formVariables.phone,
          email: formVariables.email,
          address: formVariables.address,
          password: formVariables.password,
        })
        .then((result) => {
          if (result.status === 201) setFormError(null, result.data.message[0]);
        })
        .catch((err) => {
          err.response && err.response.data && err.response.data.message
            ? setFormError(true, err.response.data.message)
            : setFormError(true, "Something's wrong!");
        });
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={5}>
          <Card className="text-center" className="mt-3">
            <Card.Header className="text-center toolbar">
              <span>CREATE NEW CUSTOMER ACCOUNT</span>
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
                    name="address"
                    value={formVariables.adress}
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
                <Col className="d-flex justify-content-center align-items-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    CREATE ACCOUNT
                    {/* {isLoading ? <Spinner animation="border" size="sm" /> : null} */}
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCustomerForm;
