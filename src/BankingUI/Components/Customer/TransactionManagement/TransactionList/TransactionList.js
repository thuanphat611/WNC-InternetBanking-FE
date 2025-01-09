import React, { useState } from "react";
import { Badge, Alert, Col } from "react-bootstrap";

import AlertBox from "../../../Others/AlertBox/AlertBox";
import moneyFormatter from "../../../HelperFunctions/moneyFormatter";

import TransactionDetail from "../TransactionDetail/TransactionDetail";

const TransactionList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { currentUser, setStep } = props;
  // eslint-disable-next-line no-unused-vars
  const [step, setLittleStep] = useState("total");
  // eslint-disable-next-line no-unused-vars
  const [workingTransaction, setWorkingTransaction] = useState({
    sentUserId: "",
  });
  console.log("currentUser: ", currentUser);
  const transactionsData = props.transactionsData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const DetailTransaction = () => {
    return (
      <>
        {/* <Button
          variant="light"
          size="sm"
          onClick={() => {
            setLittleStep("total");
          }}
        >
          <FontAwesomeIcon icon={faBackward} /> BACK
        </Button> */}
        <TransactionDetail transactionDetail={workingTransaction} />
      </>
    );
  };

  const TotalTransaction = () => {
    console.log(transactionsData);
    if (transactionsData.length === 0) {
      return (
        <>
          <AlertBox
            alertTypes="info"
            alertHeading="Info"
            alertMessage="No recent transactions!"
          />
          {/* <Button
            variant="light"
            size="sm"
            onClick={() => {
              setStep(0);
            }}
          >
            <FontAwesomeIcon icon={faBackward} /> BACK
          </Button> */}
        </>
      );
    } else {
      return (
        <>
          {/* <Button variant="light" size="sm" onClick={() => setLittleStep(0)}>
            <FontAwesomeIcon icon={faBackward} /> Back to transaction list
          </Button> */}
          <h5>Customer name: {currentUser.name.toUpperCase()}</h5>
          {transactionsData.map((item, index) => {
            let nameToShow = "";
            let moneyType, moneyDetail, transactionType;

            if (item.receiverAccountNumber === currentUser.accountNumber) {
              nameToShow = item.senderAccountName;
              moneyType = "success";
              moneyDetail = `+ ${moneyFormatter.format(item.amount)}`;
              transactionType = "success";
            } else {
              nameToShow = item.receiverAccountName;
              moneyType = "danger";
              moneyDetail = `- ${moneyFormatter.format(item.amount)}`;
              transactionType = item.isDebt ? "secondary" : "danger";
            }
            if (item.type === "external") {
              transactionType = "info";
            }

            const dateToShow = new Date(item.createdAt).toUTCString();
            return (
              <Alert variant={transactionType} key={index}>
                <Badge className="text-md text-black">
                  {item.type === "dept" ? "DEBT" : item.type.toUpperCase()}{" "}
                  TRANSACTION
                </Badge>{" "}
                <Col className="d-flex align-items-center justify-content-between">
                  <span>
                    <b>{nameToShow.toUpperCase()}</b>
                  </span>
                  <Badge
                    variant={moneyType}
                    className="text-black float-right money"
                  >
                    {moneyDetail}
                  </Badge>
                </Col>
                <p>{item.content}</p>
                <hr />
                <Col className="d-flex justify-content-between">
                  <span>{dateToShow}</span>
                </Col>
              </Alert>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      {step === "total" && <TotalTransaction />}
      {step === "detail" && <DetailTransaction />}
    </>
  );
};

export default TransactionList;
