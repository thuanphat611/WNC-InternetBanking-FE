import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBackward,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

// Hiện render form khi bấm vào nút thanh toán
const DeleteDebtForm = ({
  formVariables,
  setFormVariables,
  handleChange,
  setStep,
  setFormError,
  currentUser,
}) => {
  const [validated, setValidated] = useState(false);

  const handleDelete = async (event) => {
    console.log(formVariables);
    event.preventDefault();
    await axios
      .delete(`/api/protected/dept-reminder/${formVariables.id}`)
      .then((result) => result.data)
      .then((result) => {
        console.log(result);
        setFormError(null, "Debt reminder deleted");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <>
      <h5 className="text-center">DELETE DEBT REMINDER </h5>
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
          <dt className="col-sm-4">Created date:</dt>
          <dd className="col-sm-7">
            {new Date(formVariables.createdAt).toDateString()}
          </dd>
        </dl>
      </p>
      <Form noValidate validated={validated} onSubmit={handleDelete}>
        {/* <Form.Group>
          <Form.Text className="text-muted font-weight-bold">Note</Form.Text>
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
        </Form.Group> */}
        <Col className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="primary-outline"
            type="button"
            onClick={() => setStep("debt-list")}
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </Button>
          <Button variant="danger" type="submit" className="float-right">
            {false ? (
              <>
                <Spinner animation="border" size="sm" /> Waiting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default DeleteDebtForm;
