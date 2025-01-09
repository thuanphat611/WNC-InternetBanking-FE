import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

const ModalForm = ({
  show,
  handleClose,
  workingReceiver,
  accessToken,
  setWorkingReceiver,
  isAdding,
  customerData,
}) => {
  const [validated, setValidated] = useState(false);

  // Lấy tên người dùng khi bấm vào receiver có sẵn.
  useEffect(() => {
    if (!isAdding)
      getThisUserName(workingReceiver.accountNumber, workingReceiver.bankId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingReceiver.accountNumber, workingReceiver.bankId]);

  // Hàm lấy tên người dùng theo accountNumber, gọi qua API
  const getThisUserName = async (accountNumber, bankId) => {
    console.log(accountNumber, bankId);

    if (bankId !== -1 && accountNumber !== "") {
      setWorkingReceiver({ ...workingReceiver, name: "WAITING..." });
      const result = await axios
        .get(`/api/protected/customer/bank/${bankId}/users/${accountNumber}`)
        .then((result) => {
          console.log(result.data);
          if (result.data.name) {
            return { name: result.data.name, username: result.data.username };
          }
          return { name: "KHONG TIM THAY", username: "KHONG TIM THAY" };
        })
        .catch((err) => {
          console.log(err.response);
          return { name: "KHONG TIM THAY", username: "KHONG TIM THAY" };
        });
      console.log(accountNumber, bankId);
      setWorkingReceiver({
        ...workingReceiver,
        name: result.name,
        username: result.username,
      });
      console.log(workingReceiver);
    }
  };

  // Update giá trị điền vào Form
  const handleChange = (e) => {
    const newValue = { ...workingReceiver };
    newValue[e.target.name] = e.target.value;
    setWorkingReceiver(newValue);
  };

  // Submit
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (isAdding) {
        // Nếu như là add vào một receiver mới
        await axios.post(`/api/protected/receiver`, {
          nickName:
            workingReceiver.savedName !== ""
              ? workingReceiver.savedName
              : workingReceiver.username,
          bankId: +workingReceiver.bankId,
          senderAccountNumber: customerData.accountNumber,
          receiverAccountNumber: workingReceiver.accountNumber,
          type: +workingReceiver.bankId === 0 ? "internal" : "external",
        });
      } else {
        event.preventDefault();
        console.log("workingReceiver", workingReceiver);
        console.log({
          nickName: workingReceiver.nickName,
          bankId: +workingReceiver.bankId,
          senderAccountNumber: customerData.accountNumber,
          receiverAccountNumber: workingReceiver.receiverAccountId,
          type: +workingReceiver.bankId === 0 ? "internal" : "external",
        });
        // Nếu như update (chỉ đổi savedName)
        await axios.patch(`/api/protected/receiver`, {
          nickName: workingReceiver.nickName,
          bankId: +workingReceiver.bankId,
          senderAccountNumber: customerData.accountNumber,
          receiverAccountNumber: workingReceiver.receiverAccountId,
          type: +workingReceiver.bankId === 0 ? "internal" : "external",
        });
      }
    }
    setValidated(true);
  };

  // Render component
  const renderComponent = () => {
    if (!isAdding) {
      return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Text className="text-muted font-weight-bold">
                  Account Number
                </Form.Text>
                <Form.Control
                  required
                  type="text"
                  name="accountNumber"
                  value={workingReceiver.receiverAccountId}
                  onChange={(e) => handleChange(e)}
                  disabled
                />
              </Col>
              <Col>
                <Form.Text className="text-muted font-weight-bold">
                  Bank
                </Form.Text>
                <Form.Control
                  as="select"
                  name="bankId"
                  value={workingReceiver.bankId}
                  onChange={(e) => handleChange(e)}
                  disabled
                >
                  <option value={-1}></option>
                  <option value={0}>DOMLand Bank</option>
                  <option value={1}>Ngân hàng Ba Tê</option>
                  <option value={2}>Hoa Bank</option>
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted font-weight-bold">
              Saved name
            </Form.Text>
            <Form.Control
              type="text"
              name="nickName"
              value={workingReceiver.nickName}
              onChange={(e) => handleChange(e)}
            />
            <Form.Control.Feedback type="invalid">
              Please fill the field.
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      );
    } else {
      return (
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
                  value={workingReceiver.accountNumber}
                  onChange={(e) => handleChange(e)}
                  onBlur={() =>
                    getThisUserName(
                      workingReceiver.accountNumber,
                      workingReceiver.bankId
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
                  value={workingReceiver.bankId}
                  onChange={(e) => handleChange(e)}
                  onBlur={() =>
                    getThisUserName(
                      workingReceiver.accountNumber,
                      workingReceiver.bankId
                    )
                  }
                >
                  <option value={-1}></option>
                  <option value={0}>DOMLand Bank</option>
                  <option value={1}>Ngân hàng Ba Tê</option>
                  <option value={2}>Hoa Bank</option>
                </Form.Control>
              </Col>
            </Row>
            <Form.Text className="text-muted">
              You cannot change this value. You will use this username to login.
            </Form.Text>
            <Form.Text className="text-muted font-weight-bold">
              Full name
            </Form.Text>
            <Form.Control
              required
              type="text"
              name="name"
              value={workingReceiver.name}
              onChange={(e) => handleChange(e)}
              disabled
              isInvalid={workingReceiver.name === "KHONG TIM THAY"}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted font-weight-bold">
              Saved name
            </Form.Text>
            <Form.Control
              type="text"
              name="savedName"
              value={workingReceiver.savedName}
              onChange={(e) => handleChange(e)}
            />
            <Form.Text className="text-muted">
              We will use user's name in case saved name is missing.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please fill the field.
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer className="mt-3">
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} centered>
      <Modal.Header>
        <Modal.Title>Receiver Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderComponent()}</Modal.Body>
    </Modal>
  );
};

export default ModalForm;
