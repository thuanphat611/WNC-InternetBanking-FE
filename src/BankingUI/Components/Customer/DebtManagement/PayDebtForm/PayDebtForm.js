import React, { useState } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

// Hiện render form khi bấm vào nút thanh toán
const PayDebtForm = ({
  formVariables,
  setFormVariables,
  handleChange,
  setStep,
  setFormError,
  setSendingForm,
  currentUser,
  sendingForm,
}) => {
  const [validated, setValidated] = useState(false);

  const handleGetOtp = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setFormVariables({ ...formVariables, isLoading: true });
      await axios
        .post(`/otp/generate-otp`, {
          otp: "111",
          email: currentUser.email,
        })
        .then((result) => {
          console.log(result);
          // formVariables["transactionId"] = result.data.transactionId;
          // if (result.data) {
          //   console.log(result.data.transactionId);
          //   setFormVariables({ ...formVariables });
          // }
          setFormError(
            null,
            "The system has sent an OTP code to you, please check your email!"
          );
        })
        .catch((error) => {
          console.log(error.response);
        });
      console.log(formVariables);
      setStep("get-otp-debt");
    }
  };

  return (
    <>
      <h5 className="text-center">DEBT REMINDER PAYMENT</h5>
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
          <dt className="col-sm-4">Created At:</dt>
          <dd className="col-sm-7">
            {new Date(formVariables.createdAt).toDateString()}
          </dd>
        </dl>
      </p>
      <Form noValidate validated={validated} onSubmit={handleGetOtp}>
        <Form.Group>
          <Form.Text className="text-muted font-weight-bold">Content</Form.Text>
          <Form.Control
            required
            as="textarea"
            rows="3"
            type="text"
            name="feedbackContent"
            value={formVariables.feedbackContent}
            onChange={(e) => handleChange(e)}
            isInvalid={formVariables.feedbackContent === ""}
          />
          <Form.Control.Feedback type="invalid">
            Give your receiver a message to know
          </Form.Control.Feedback>
        </Form.Group>
        <Col className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="primary-outline"
            type="button"
            onClick={() => setStep("debt-list")}
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </Button>
          <Button variant="primary" type="submit" className="float-right">
            {false ? (
              <>
                <Spinner animation="border" size="sm" /> Waiting...
              </>
            ) : (
              <>Receive OTP</>
            )}
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default PayDebtForm;
