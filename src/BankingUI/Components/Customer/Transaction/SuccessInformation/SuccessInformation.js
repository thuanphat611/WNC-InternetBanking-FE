import React from "react";
import { Button, Col } from "react-bootstrap";
import "./SuccessInformation.css";

import getBankName from "../../../HelperFunctions/getBankName";

const SuccessInformation = (props) => {
  const { formVariables, reducerUserInformation, setFormVariables, setStep } =
    props;
  const { data, receivers } = reducerUserInformation;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const thisCustomerIsInReceiverList = () => {
    const exist = receivers.filter(
      (item) =>
        item.receiverAccountId === formVariables.accountNumber &&
        item.bankId === formVariables.bankId
    );

    return exist.length !== 0;
  };
  console.log(thisCustomerIsInReceiverList());

  return (
    <>
      <h5 className="text-center">
        TRANSFERED {formatter.format(formVariables.amount)}
      </h5>
      <p className="information">
        <dl className="row">
          {/* <dt className="col-sm-3">Thời gian chuyển:</dt>
					<dd className="col-sm-9">{data.name.toUpperCase()}</dd> */}

          <dt className="col-sm-4">Transer date:</dt>
          <dd className="col-sm-7">{Date(formVariables.createdAt)}</dd>
          {formVariables.isReceiverPaid ? (
            <>
              <dt className="col-sm-4">The recipient bears the fee:</dt>
              <dd className="col-sm-7">1,000đ</dd>
            </>
          ) : (
            <>
              <dt className="col-sm-4">The sender bears the fee:</dt>
              <dd className="col-sm-7">1,000đ</dd>
            </>
          )}
        </dl>
      </p>
      <h5 className="text-center">SENDER</h5>
      <p className="information">
        <dl className="row">
          <dt className="col-sm-4">Sender's name:</dt>
          <dd className="col-sm-7">{data.name.toUpperCase()}</dd>

          <dt className="col-sm-4">Bank:</dt>
          <dd className="col-sm-7">DOMLand Bank</dd>

          <dt className="col-sm-4">Account number:</dt>
          <dd className="col-sm-7">{data.accountNumber}</dd>
        </dl>
      </p>
      <h5 className="text-center">RECIPIENT</h5>
      <div className="information">
        <dl className="row">
          <dt className="col-sm-4">Recipient's name:</dt>
          <dd className="col-sm-7">{formVariables.name.toUpperCase()}</dd>

          <dt className="col-sm-4">Bank:</dt>
          <dd className="col-sm-7">{getBankName(formVariables.bankId)}</dd>

          <dt className="col-sm-4">Account number:</dt>
          <dd className="col-sm-7">{formVariables.accountNumber}</dd>
        </dl>
      </div>
      <Col className="d-flex justify-content-center gap-3">
        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          onClick={() => {
            window.location.reload();
          }}
        >
          Close
        </Button>
        {!thisCustomerIsInReceiverList() && (
          <Button
            className="mt-3"
            variant="success"
            type="submit"
            onClick={() => setStep(5)}
          >
            Add this person to the recipient list
          </Button>
        )}
      </Col>
    </>
  );
};

export default SuccessInformation;
