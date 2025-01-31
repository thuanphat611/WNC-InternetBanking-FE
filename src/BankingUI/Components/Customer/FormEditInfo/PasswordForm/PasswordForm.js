import React, { useState } from "react";

import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const PasswordForm = ({
  passwordForm,
  setPasswordForm,
  accessToken,
  setFormError,
}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (
      form.checkValidity() === false ||
      passwordForm.newPassword !== passwordForm.retypeNewPassword
    ) {
      event.stopPropagation();
    } else {
      console.log(passwordForm);
      // updateUserInfo(passwordForm, accessToken);6
      const request = await axios
        .patch(`/api/users/change-password`, {
          password: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        })
        .then((result) => {
          setFormError(null, "Password is changed successfully!");
          return result;
        })
        .catch((err) => {
          setFormError(true, "Cannot change your password, please try again!");
          setPasswordForm({
            ...passwordForm,
            currentPassword: "",
            newPassword: "",
            retypeNewPassword: "",
          });
          return err;
        });
      console.log(request);
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    passwordForm[e.target.name] = e.target.value;
    setPasswordForm({ ...passwordForm });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        {/* <Form.Label className="font-weight-bold">ID and UserName</Form.Label> */}
        <Row>
          <Col>
            <Form.Text className="text-muted font-weight-bold">
              Account Number
            </Form.Text>
            <Form.Control
              required
              type="text"
              value={passwordForm.accountNumber}
              disabled
            />
          </Col>
        </Row>
        <Form.Text className="text-muted">
          You cannot change this value. You will use this username to login.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Text className="text-muted font-weight-bold">
          Current password
        </Form.Text>
        <Form.Control
          required
          type="password"
          name="currentPassword"
          value={passwordForm.currentPassword}
          onChange={(e) => handleChange(e)}
        />
        <Form.Control.Feedback type="invalid">
          Please fill the field.
        </Form.Control.Feedback>
        <Form.Text className="text-muted font-weight-bold">
          New password
        </Form.Text>
        <Form.Control
          required
          type="password"
          name="newPassword"
          value={passwordForm.newPassword}
          onChange={(e) => handleChange(e)}
        />
        <Form.Control.Feedback type="invalid">
          Please fill the field.
        </Form.Control.Feedback>
        <Form.Text className="text-muted font-weight-bold">
          Retype new password
        </Form.Text>
        <Form.Control
          required
          type="password"
          name="retypeNewPassword"
          value={passwordForm.retypeNewPassword}
          isInvalid={
            passwordForm.retypeNewPassword !== passwordForm.newPassword
          }
          onChange={(e) => handleChange(e)}
        />
        <Form.Control.Feedback type="invalid">
          Retype password doesn't match.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Confirm
        {/* {isLoading ? <Spinner animation="border" size="sm" /> : null} */}
      </Button>
    </Form>
  );
};

export default PasswordForm;
