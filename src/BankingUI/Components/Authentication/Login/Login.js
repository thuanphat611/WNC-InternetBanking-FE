import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import AlertBox from "../../Others/AlertBox/AlertBox";
import { axiosInstance } from "../../../App/App";

const LogIn = (props) => {
  console.log(process.env.REACT_APP_BASE_URL);

  const { setUserAccessToken } = props;
  const { isAuthenticated } = props;
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [formVariables, setFormVariables] = useState({
    username: "",
    password: "",
    message: "",
    error: null,
    isLoading: false,
  });
  // const { username, password } = messageForm;
  const [validated, setValidated] = useState(false);
  const reCaptchaRef = React.createRef();

  const from = props.location.state || { from: { pathname: "/" } };

  useEffect(() => {
    setRedirectToReferrer(isAuthenticated ? true : false);
  }, [isAuthenticated]);

  const setFormError = (error, message) => {
    let alertTypes = error === null ? "success" : "danger";

    formVariables["error"] = alertTypes;
    setFormVariables({ ...formVariables });

    formVariables["message"] = message;
    setFormVariables({ ...formVariables });
  };

  const renderAlert = () => {
    if (formVariables.message)
      return (
        <AlertBox
          alertTypes={formVariables.error}
          alertMessage={formVariables.message}
        />
      );
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    const reCaptchaValue = reCaptchaRef.current.getValue();
    // const reCaptchaValue = true;
    event.preventDefault();
    if (form.checkValidity() === false || !reCaptchaValue) {
      if (!reCaptchaValue) setFormError(true, "Captcha is invalid, try again!");
      event.stopPropagation();
    } else {
      setFormVariables({ ...formVariables, isLoading: true });
      await axiosInstance
        .post("/api/auth/login", {
          email: formVariables.username,
          password: formVariables.password,
        })
        .then((result) => {
          if (result.status === 200) {
            console.log(result);
            localStorage.setItem("token", result.data.data.accessToken);
            localStorage.setItem("refreshToken", result.data.data.refreshToken);
          }

          // ONLY IN LOGIN! EXIT OF REFRESH-TOKEN LOOP
          if (result.from === "LOGIN") {
            setFormError(true, result.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setFormError(
            true,
            error.response
              ? error.response.data.message
              : "Something's wrong. Try again later!"
          );
        });
      setFormVariables({ ...formVariables, isLoading: false });
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        setUserAccessToken(accessToken);
      }
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    formVariables[e.target.name] = e.target.value;
    setFormVariables({ ...formVariables });
  };

  return redirectToReferrer ? (
    <Redirect to={from} />
  ) : (
    <Row
      className="justify-content-md-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Col xs={8} md={4}>
        <Card border="primary" className="mt-3">
          <Card.Header>
            <Card.Title className="text-center text-dark">LOG IN</Card.Title>
          </Card.Header>
          <Card.Body>
            {renderAlert()}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="font-weight-bold">Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  placeholder="Enter your email"
                  value={formVariables.username}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="font-weight-bold">Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formVariables.password}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="d-flex justify-content-between">
                <Col xs="auto" className="d-flex justify-content-end">
                  <Form.Text className="mt-2">
                    <Link to="/reset-password">Forgot your password?</Link>
                  </Form.Text>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mt-3">
                <Col xs="auto">
                  <ReCAPTCHA
                    ref={reCaptchaRef}
                    sitekey="6LeTv_QUAAAAAF65I5hEKOF7PuE1JUxYcQ4JMBrb"
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit" className="mt-3">
                  {formVariables.isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Waiting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LogIn;
