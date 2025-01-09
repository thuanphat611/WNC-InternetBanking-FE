import React, { useState } from "react";
import { Button, Badge, Alert, Col } from "react-bootstrap";

import AlertBox from "../../../Others/AlertBox/AlertBox";

import moneyFormatter from "../../../HelperFunctions/moneyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

import PayDebtForm from "../PayDebtForm/PayDebtForm";
import OtpDebtForm from "../OtpDebtForm/OtpDebtForm";
import DeleteDebtForm from "../DeleteDebtForm/DeleteDebtForm";

const DebtsFilter = (props) => {
  const { currentUser, debtsData, filterType, step, setStep } = props;
  // const [validated, setValidated] = useState(false);
  const [formVariables, setFormVariables] = useState({
    debtId: "",
    sentUserName: "",
    receivedUserName: "",
    debtContent: "",
    amount: 1000,
    createdAt: "",
    feedbackContent: "",
    isReceiverPaid: false,
    otpCode: "",
    transactionId: "",
    error: false,
    message: "",
  });

  const [sendingForm, setSendingForm] = useState({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    amount: 0,
    description: "",
    type: "dept",
  });

  const filterData = () => {
    let emptyList = [];
    switch (filterType) {
      case "pending-mine": {
        emptyList = debtsData.filter((item) => {
          return (
            item.status === "Chưa thanh toán" &&
            item.senderAccountId === currentUser.accountNumber
          );
        });
        break;
      }
      case "pending-theirs": {
        emptyList = debtsData.filter((item) => {
          return (
            item.status === "Chưa thanh toán" &&
            item.receiverAccountId === currentUser.accountNumber
          );
        });
        break;
      }
      case "paid": {
        emptyList = debtsData.filter((item) => {
          return item.status === "Đã thanh toán";
        });
        break;
      }
      default: {
        emptyList = debtsData.filter((item) => {
          return item.status === "Đã thanh toán";
        });
        break;
      }
    }
    return emptyList;
  };

  const filteredData = filterData();
  console.log(filteredData);

  // Update giá trị điền vào Form
  const handleChange = (e) => {
    formVariables[e.target.name] = e.target.value;
    setFormVariables({ ...formVariables });
  };

  const setFormError = (error, message) => {
    let alertTypes = error === null ? "success" : "danger";

    formVariables["error"] = alertTypes;
    setFormVariables({ ...formVariables });

    formVariables["message"] = message;
    setFormVariables({ ...formVariables });
  };

  const moveNextStep = (item, type) => {
    console.log(item);
    if (item.debtId !== "") {
      formVariables["id"] = item.id;
      formVariables["sentUserName"] = item.senderUserName.toUpperCase();
      formVariables["receivedUserName"] = item.receiverUserName.toUpperCase();
      formVariables["debtContent"] = item.description;
      formVariables["createdAt"] = item.createdAt;
      formVariables["amount"] = item.amount;
      formVariables["transactionId"] = item.transactionId;
    }
    sendingForm["senderAccountNumber"] = item.receiverAccountId;
    sendingForm["receiverAccountNumber"] = item.senderAccountId;
    sendingForm["amount"] = item.amount;
    formVariables["description"] = item.description;

    setSendingForm({ ...sendingForm });
    console.log("sendingForm", sendingForm);
    setFormVariables({ ...formVariables });
    console.log(formVariables);
    if (type === "delete") setStep(1);
    else setStep("pay-debt");
  };

  // Hiện tất cả các list debts ban đầu
  const renderDebts = () => {
    if (filteredData.length === 0) {
      return (
        <AlertBox
          alertTypes="info"
          alertHeading="Info"
          alertMessage="No recent debt reminders!"
        />
      );
    } else {
      return (
        <div>
          {filteredData.map((item, index) => {
            console.log(item);
            let nameToShow = "";
            let moneyType, moneyDetail, transactionType, badgeName;
            let isSentByThisUser = true;
            let isPaid = item.status === "Paid";
            if (item.receiverAccountId === currentUser.accountNumber) {
              isSentByThisUser = false;
              nameToShow = item.senderUserName;
              moneyType = "danger";
              moneyDetail = moneyFormatter.format(item.amount);
              transactionType = "danger";
              badgeName = "Owing";
            } else {
              nameToShow = item.receiverUserName;
              moneyType = "success";
              moneyDetail = moneyFormatter.format(item.amount);
              transactionType = "success";
              badgeName = "Your payment reminder";
            }
            const badgeType = item.isDebt ? "secondary" : "primary";
            const dateToShow = new Date(item.createdAt).toDateString();
            return (
              <Alert variant={transactionType} key={index}>
                <Badge className="text-md text-black" variant={badgeType}>
                  {badgeName} {filterType === "paid" && " - COMPLETED"}
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
                <p>{item.debtContent}</p>
                <hr />
                <Col className="d-flex justify-content-between">
                  <span>{dateToShow}</span>
                  <span className="float-right">
                    {!isSentByThisUser && !isPaid && (
                      <Button
                        variant="success"
                        className="mr-3"
                        size="sm"
                        onClick={() => moveNextStep(item, "pay")}
                      >
                        <FontAwesomeIcon icon={faMoneyBill} />
                      </Button>
                    )}
                    {!isPaid && filterType === "pending-mine" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => moveNextStep(item, "delete")}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    )}
                  </span>
                </Col>
              </Alert>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="mt-3">
      {step === "debt-list" && renderDebts()}
      {step === 1 && (
        <DeleteDebtForm
          formVariables={formVariables}
          setFormVariables={setFormVariables}
          setStep={setStep}
          handleChange={handleChange}
          setFormError={setFormError}
          currentUser={currentUser}
        />
      )}
      {step === "pay-debt" && (
        <PayDebtForm
          formVariables={formVariables}
          setFormVariables={setFormVariables}
          setSendingForm={setSendingForm}
          setStep={setStep}
          handleChange={handleChange}
          setFormError={setFormError}
          currentUser={currentUser}
          sendingForm={sendingForm}
        />
      )}
      {step === "get-otp-debt" && (
        <OtpDebtForm
          formVariables={formVariables}
          setFormVariables={setFormVariables}
          setStep={setStep}
          handleChange={handleChange}
          setFormError={setFormError}
          currentUser={currentUser}
          sendingForm={sendingForm}
        />
      )}
    </div>
  );
};

export default DebtsFilter;
