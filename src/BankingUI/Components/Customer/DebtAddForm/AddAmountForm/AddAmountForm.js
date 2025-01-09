import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddAmountForm = (props) => {
  const {
    formVariables,
    setFormVariables,
    accessToken,
    setStep,
    setFormError,
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
      console.log({
        senderAccountNumber: accountNumber,
        receiverAccountNumber: formVariables.accountNumber,
        amount: formVariables.amount,
        description: formVariables.content,
      });
      axios
        .post("/api/protected/dept-reminder/create", {
          senderAccountNumber: accountNumber,
          receiverAccountNumber: formVariables.accountNumber,
          amount: formVariables.amount,
          description: formVariables.content,
        })
        .then((result) => {
          setFormError(null, "Debt reminder created");
          console.log(result.message);
        })
        .catch((err) => {
          setFormError(true, "Something's wrong, please try again.");
          console.log(err.response);
        });
      // setStep(3);
      // setFormError(null, "");
      // } else
      // 	setFormError(true, "Tiền không đủ, chuyển cái gì mà chuyển hả trời!");
    }
    setValidated(true);
  };

  return (
    <>
      <h5>Step 2: Add money amount and description</h5>
      <hr />
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
                name="accountNumber"
                value={formVariables.accountNumber}
                onChange={(e) => handleChange(e)}
                disabled
              />
            </Col>
            <Col>
              <Form.Text className="text-muted font-weight-bold">
                Bank
              </Form.Text>
              <Form.Control
                size="sm"
                as="select"
                name="bankId"
                value={formVariables.bankId}
                onChange={(e) => handleChange(e)}
                disabled
              >
                <option value={-1}></option>
                <option value={0}>DOMLand Bank</option>
                <option value={1}>Team3 Bank</option>
                <option value={2}>Hoa Bank</option>
              </Form.Control>
            </Col>
          </Row>
          <Form.Text className="text-muted font-weight-bold">
            Full name
          </Form.Text>
          <Form.Control
            required
            type="text"
            name="name"
            value={formVariables.name}
            onChange={(e) => handleChange(e)}
            isInvalid={
              formVariables.name === "" ||
              formVariables.name === "KHONG TIM THAY"
            }
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Text className="text-muted font-weight-bold">Amount</Form.Text>
          <Form.Control
            required
            type="number"
            step="1000"
            min="1000"
            name="amount"
            value={formVariables.amount}
            onChange={(e) => handleChange(e)}
            isInvalid={
              formVariables.amount % 1000 !== 0 && formVariables.amount === 0
            }
          />
          <Form.Control.Feedback type="invalid">
            The amount must be divisible by 1,000đ and cannot be zero
          </Form.Control.Feedback>
          <Form.Text className="text-muted font-weight-bold">Message</Form.Text>
          <Form.Control
            required
            as="textarea"
            rows="3"
            name="content"
            value={formVariables.content}
            onChange={(e) => handleChange(e)}
            isInvalid={formVariables.debtContent.length === 0}
          />
          <Form.Control.Feedback type="invalid">
            Give your receiver a message to know
          </Form.Control.Feedback>
        </Form.Group>
        <Col className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="primary-outline"
            type="button"
            onClick={() => setStep(1)}
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

export default AddAmountForm;
