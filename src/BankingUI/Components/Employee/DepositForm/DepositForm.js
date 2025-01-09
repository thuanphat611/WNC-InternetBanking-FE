import React, { useState, useEffect } from "react";
import { Col, Row, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertBox from "../../Others/AlertBox/AlertBox";

const PayInForm = (props) => {
  const { reducerAuthorization, reducerUserInformation } = props;
  const { accessToken } = reducerAuthorization.authentication;
  const { id } = reducerUserInformation.data;
  const [validated, setValidated] = useState(false);

  const [formVariables, setFormVariables] = useState({
    accountNumber: "",
    bankId: 0,
    username: "",
    name: "",
    isDebt: false,
    isReceiverPaid: false,
    amount: 50000,
    content: `Nạp tiền cho khách hàng ngày ${Date().toString()}`,
    error: "",
    message: "",
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

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log(formVariables);
      setFormVariables({ ...formVariables, isLoading: true });
      await axios
        .post("/api/protected/transactions/deposit", {
          serviceProviderId: id,
          receiverAccountNumber: formVariables.accountNumber,
          amount: +formVariables.amount,
        })
        .then((result) => {
          if (result.status === 200) setFormError(null, "Nạp tiền thành công");
        })
        .catch((err) => {
          const { response } = err;
          console.log(err.response);
          if (response.status === 400) {
            setFormError(true, response.data.message);
          } else setFormError(true, "Something's wrong!");
        });

      setFormVariables({ ...formVariables, isLoading: false });
    }
    setValidated(true);
  };

  const getThisUserName = async (accountNumber, bankId) => {
    console.log(accountNumber, bankId);
    if (bankId !== -1 && accountNumber !== "") {
      setFormVariables({ ...setFormVariables, name: "WAITING..." });

      const name = await axios
        .get(`/api/protected/customer/bank/${bankId}/users/${accountNumber}`)
        .then((result) => {
          if (result.data.name) return result.data.name;
          return "KHONG TIM THAY";
        })
        .catch((err) => "KHONG TIM THAY");
      console.log(accountNumber, bankId);
      await setFormVariables({
        ...formVariables,
        accountNumber: accountNumber,
        bankId: bankId,
        name: name,
      });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={5}>
          <Card className="text-center" className="mt-3">
            <Card.Header className="text-center toolbar">
              <span>DEPOSIT MONEY FOR CUSTOMER</span>
            </Card.Header>
            <Card.Body>
              {renderAlert()}
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
                        onBlur={() =>
                          getThisUserName(
                            formVariables.accountNumber,
                            formVariables.bankId
                          )
                        }
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
                        onBlur={() =>
                          getThisUserName(
                            formVariables.accountNumber,
                            formVariables.bankId
                          )
                        }
                        disabled
                      >
                        <option value={-1}></option>
                        <option value={0}>DOMLand Bank</option>
                        <option value={1}>Ngân hàng Ba Tê</option>
                        <option value={2}>BAOSON Bank</option>
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
                  <Form.Text className="text-muted font-weight-bold">
                    Amount
                  </Form.Text>
                  <Form.Control
                    required
                    type="number"
                    step="1000"
                    min="1000"
                    name="amount"
                    value={formVariables.amount}
                    onChange={(e) => handleChange(e)}
                    isInvalid={formVariables.amount % 1000 !== 0}
                  />
                  <Form.Control.Feedback type="invalid">
                    The amount must be divisible by 1,000 VND.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted font-weight-bold">
                    Content
                  </Form.Text>
                  <Form.Control
                    required
                    as="textarea"
                    type="text"
                    name="content"
                    value={formVariables.content}
                    onChange={(e) => handleChange(e)}
                    isInvalid={formVariables.content === ""}
                  />
                </Form.Group>
                <Col className="d-flex justify-content-center align-items-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    Confirm
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

export default PayInForm;
