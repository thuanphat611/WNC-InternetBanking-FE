import React, { useState, useEffect } from "react";
import { Table, Button, Form, Col, Row, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertBox from "../../../Others/AlertBox/AlertBox";

const ReceiverDetail = (props) => {
  const { formVariables, setFormVariables, setStep, setFormError } = props;
  const [validated, setValidated] = useState(false);
  const [renderOption, setRenderOption] = useState("component-0");
  let receiversData = props.receiversData.filter((item) => item.bankId === 0);

  // Hàm lấy tên người dùng theo accountNumber, gọi qua API
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
      if (
        formVariables.name === "" ||
        formVariables.name === "KHONG TIM THAY" ||
        formVariables.accountNumber === "" ||
        formVariables.bankId === -1
      ) {
        return;
      }
      setStep(2);
      setFormError(null, "");
    }
    setValidated(true);
  };

  const renderConditionally = () => {
    switch (renderOption) {
      case "component-0":
        return (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="d-flex justify-content-center">
              {/* <Form.Label className="font-weight-bold">ID and UserName</Form.Label> */}
              <Col lg={8}>
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
                    disabled
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
                  >
                    <option value={-1}></option>
                    <option value={0}>DOMLand Bank</option>
                    <option value={1}>Ngân hàng Ba Tê</option>
                    <option value={2}>BAOSON Bank</option>
                  </Form.Control>
                </Col>
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
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Next
            </Button>
          </Form>
        );
      case "component-1":
        if (receiversData.length !== 0) {
          return (
            <Table responsive="sm" striped bordered hover>
              <thead>
                <tr>
                  <th>Account number</th>
                  <th>Name</th>
                  <th>Bank name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {receiversData.map((receiver, index) => {
                  return (
                    <tr key={index}>
                      <td>{receiver.accountNumber}</td>
                      <td>{receiver.savedName}</td>
                      <td>
                        {receiver.bankId === 0
                          ? "DOMLand Bank"
                          : receiver.bankId === 1
                          ? "Ngân hàng Ba Tê"
                          : "BAOSON Bank"}
                      </td>
                      <td className="action">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            console.log(formVariables);
                            getThisUserName(
                              receiver.accountNumber,
                              receiver.bankId
                            );
                            setStep(2);
                          }}
                        >
                          <FontAwesomeIcon icon={faForward} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          );
        } else
          return (
            <>
              <AlertBox
                alertTypes="info"
                alertHeading="Info"
                alertMessage="You currently don't have any recipients."
              />
              <Link to="/receivers">Go to receivers form</Link>
            </>
          );
      default:
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
                    disabled
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
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Next
            </Button>
          </Form>
        );
    }
  };

  return (
    <>
      <h5 style={{ fontSize: "16px" }}>
        Step 1: Enter the information of the person to remind for debt (within
        the same bank)
      </h5>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey="component-0"
        onSelect={(selectedKey) => {
          setRenderOption(selectedKey);
        }}
      >
        <Nav.Item>
          <Nav.Link eventkey="component-0">New</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventkey="component-1">From list</Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      {renderConditionally()}
    </>
  );
};

export default ReceiverDetail;
