import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const OtpForm = (props) => {
  const {
    formVariables,
    setFormVariables,
    accessToken,
    setStep,
    setFormError,
    email,
    accountNumber,
  } = props;
  const [validated, setValidated] = useState(false);

  // Update giá trị điền vào Form
  const handleChange = (e) => {
    formVariables[e.target.name] = e.target.value;
    setFormVariables({ ...formVariables });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (
      form.checkValidity() === false ||
      formVariables.name === "" ||
      formVariables.name === "KHONG TIM THAY"
    ) {
      event.stopPropagation();
    } else {
      await axios
        .post("/otp/verify", {
          otp: formVariables.otp,
          email,
        })
        .then(async (result) => {
          console.log(result);
          setFormVariables({ ...formVariables, isLoading: false });
          if (result.status === 200) {
            await axios.post(`/api/protected/transactions`, {
              senderAccountNumber: accountNumber,
              receiverAccountNumber: formVariables.accountNumber,
              // receivedBankId: formVariables.bankId,
              amount: formVariables.amount,
              description: formVariables.content,
              type: formVariables.bankId === 0 ? "internal" : "external",
            });
            setStep(4);
            setFormError(null, "");
          }
        })
        .catch((err) => {
          console.log(err.response);
          err.response && err.response.message
            ? setFormError(true, err.response.data.message)
            : setFormError(true, "Something's wrong, please try again!");
        });
    }
    setValidated(true);
  };

  return (
    <>
      <h5>Step 3: Send your OTP received from mail</h5>
      <hr />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <p>
            You're about to send {formVariables.amount} VND to user{" "}
            <span>{formVariables.name}</span>
          </p>
          <Form.Text className="text-muted font-weight-bold">
            OTP Code
          </Form.Text>
          <Form.Control
            required
            type="text"
            name="otp"
            value={formVariables.otp}
            onChange={(e) => handleChange(e)}
            isInvalid={formVariables.otp === ""}
          />
          <Form.Control.Feedback type="invalid">
            Enter OTP code sent to your email
          </Form.Control.Feedback>
        </Form.Group>
        <Col className="d-flex justify-content-center mt-3">
          <Button
            variant="primary-outline"
            type="button"
            onClick={() => setStep(2)}
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default OtpForm;
