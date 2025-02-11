import React, { useState } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";

import ReceiverDetail from "./ReceiverDetail/ReceiverDetail";
import AddAmountForm from "./AddAmountForm/AddAmountForm";
import OtpForm from "./OtpForm/OtpForm";
import SuccessInformation from "./SuccessInformation/SuccessInformation";
import RecommendAddReceiver from "./RecommendAddReceiver/RecommendAddReceiver";

import "./Transaction.css";

import AlertBox from "../../Others/AlertBox/AlertBox";

const Transaction = (props) => {
  const { reducerAuthorization, reducerUserInformation } = props;
  const { accessToken } = reducerAuthorization.authentication;
  const { balance, accountNumber, id, email } = reducerUserInformation.data;
  const receiversData = reducerUserInformation.receivers;

  const [formVariables, setFormVariables] = useState({
    accountNumber: "",
    bankId: 0,
    name: "",
    savedName: "",
    amount: 50000,
    content: "",
    otp: "",
    isDebt: 0,
    isReceiverPaid: false,
    error: null,
    message: "",
    transactionId: "",
    createdAt: "",
  });
  const [step, setStep] = useState(1);

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

  // Update giá trị điền vào Form
  const handleChange = (e) => {
    formVariables[e.target.name] = e.target.value;
    setFormVariables({ ...formVariables });
  };

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <ReceiverDetail
            receiversData={receiversData}
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            accessToken={accessToken}
            setStep={setStep}
            setFormError={setFormError}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <AddAmountForm
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            accessToken={accessToken}
            setStep={setStep}
            balance={balance}
            id={id}
            email={email}
            accountNumber={accountNumber}
            setFormError={setFormError}
          />
        );
      case 3:
        return (
          <OtpForm
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            accessToken={accessToken}
            setStep={setStep}
            balance={balance}
            accountNumber={accountNumber}
            id={id}
            email={email}
            setFormError={setFormError}
          />
        );
      case 4:
        return (
          <SuccessInformation
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            reducerUserInformation={reducerUserInformation}
            balance={balance}
            accountNumber={accountNumber}
            id={id}
            setFormError={setFormError}
            setStep={setStep}
          />
        );
      case 5:
        return (
          <RecommendAddReceiver
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            reducerUserInformation={reducerUserInformation}
            balance={balance}
            accountNumber={accountNumber}
            id={id}
            setFormError={setFormError}
            accessToken={accessToken}
            setStep={setStep}
          />
        );
      default:
        return (
          <ReceiverDetail
            receiversData={receiversData}
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            accessToken={accessToken}
            setStep={setStep}
            setFormError={setFormError}
            handleChange={handleChange}
          />
        );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={6}>
          <Card className="text-center mt-3">
            <Card.Header className="text-center">TRANSACTION</Card.Header>
            <Card.Body>
              {renderAlert()}
              {renderStepForm()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
