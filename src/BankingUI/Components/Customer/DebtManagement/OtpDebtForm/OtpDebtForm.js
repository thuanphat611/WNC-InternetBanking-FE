import React, { useState, useRef } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

// Hiện render form khi bấm vào nút thanh toán
const OtpDebtForm = ({
  formVariables,
  setFormVariables,
  handleChange,
  setStep,
  setFormError,
  currentUser,
  sendingForm,
}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmitOtp = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setFormVariables({ ...formVariables, isLoading: true });
      await axios
        .post("/otp/verify", {
          otp: formVariables.otpCode,
          email: currentUser.email,
        })
        .then(async (result) => {
          setFormVariables({ ...formVariables, isLoading: false });
          if (result.status === 200) {
            console.log(formVariables);
            await axios.post(`/api/protected/transactions`, {
              senderAccountNumber: sendingForm.senderAccountNumber,
              receiverAccountNumber: sendingForm.receiverAccountNumber,
              amount: sendingForm.amount,
              description: formVariables.content,
              type: "dept",
            });
            setFormError(
              null,
              `Debt payment successful! Awesome!
              You will return to the debt list in 3 seconds...`
            );
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err.response);
          err.response
            ? setFormError(true, err.response.data.message)
            : setFormError(true, "Something's wrong, please try again!");
        });
    }
  };

  return (
    <>
      <h5 className="text-center">VERIFY OTP</h5>
      {formVariables.message && (
        <AlertBox
          alertTypes={formVariables.error}
          alertMessage={formVariables.message}
        />
      )}
      <p className="information">
        <dl className="row">
          <dt className="col-sm-4">Amount:</dt>
          <dd className="col-sm-7">
            {moneyFormatter.format(formVariables.amount)}
          </dd>
          <dt className="col-sm-4">Created by:</dt>
          <dd className="col-sm-7">{formVariables.sentUserName}</dd>
          <dt className="col-sm-4">Debtor:</dt>
          <dd className="col-sm-7">{formVariables.receivedUserName}</dd>
          <dt className="col-sm-4">Description:</dt>
          <dd className="col-sm-7">"{formVariables.debtContent}"</dd>
          <dt className="col-sm-4">Created at:</dt>
          <dd className="col-sm-7">
            {new Date(formVariables.createdAt).toDateString()}
          </dd>
        </dl>
      </p>
      <Form noValidate validated={validated} onSubmit={handleSubmitOtp}>
        <Form.Group>
          <Form.Text className="text-muted font-weight-bold">
            Your OTP code
          </Form.Text>
          <Form.Control
            required
            type="text"
            name="otpCode"
            value={formVariables.otpCode}
            onChange={(e) => handleChange(e)}
            isInvalid={formVariables.otpCode === ""}
          />
          <Form.Control.Feedback type="invalid">
            Enter OTP code sent to your email
          </Form.Control.Feedback>
        </Form.Group>
        <Col className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="primary-outline"
            type="button"
            onClick={() => setStep("pay-debt")}
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </Button>
          <Button variant="success" type="submit" className="float-right">
            {false ? (
              <>
                <Spinner animation="border" size="sm" /> Waiting...
              </>
            ) : (
              <>Confirm payment</>
            )}
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default OtpDebtForm;
