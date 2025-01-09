import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import ToolBar from "./ToolBar/ToolBar";
import ModalReceiverForm from "./ModalReceiverForm";
import AlertBox from "../../Others/AlertBox/AlertBox";
import getBankName from "../../HelperFunctions/getBankName";

import "./ReceiverList.css";

const ReceiverList = (props) => {
  const { reducerAuthorization, reducerUserInformation } = props;
  const [modalFormVariables, setModalFormVariables] = useState({
    show: false,
    isAdding: false,
  });
  const mountedRef = useRef(true);
  const receiversData = reducerUserInformation.receivers;
  const customerData = reducerUserInformation.data;
  const [workingReceiver, setWorkingReceiver] = useState({
    accountNumber: "",
    savedName: "",
    bankId: -1,
    name: "",
    username: "",
  });

  console.log(receiversData);

  useEffect(() => {
    if (!mountedRef.current) return null;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Làm cho form không xuất hiện khi render màn hình
  useEffect(() => {
    if (workingReceiver.accountNumber === "" || workingReceiver.bankId === -1)
      return;
    if (modalFormVariables.isAdding) return;
    handleShowFormModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingReceiver]);

  const handleClose = () => {
    setModalFormVariables({
      ...modalFormVariables,
      show: false,
      isAdding: false,
    });
    setWorkingReceiver({
      accountNumber: "",
      savedName: "",
      bankId: -1,
      name: "",
      username: "",
    });
  };

  // set show modal and state isAdding
  const handleShowFormModal = (isAdding) => {
    setModalFormVariables({
      ...modalFormVariables,
      show: true,
      isAdding: isAdding,
    });
  };

  // Delete
  const deleteReceiver = async (nickName, accountNumber, bankId) => {
    await axios.delete(`/api/protected/receiver`, {
      data: {
        nickName,
        bankId,
        senderAccountNumber: customerData.accountNumber,
        receiverAccountNumber: accountNumber,
        type: bankId === 0 ? "internal" : "external",
      },
    });
    window.location.reload();
  };

  const showComponent = () => {
    if (receiversData.length === 0) {
      return (
        <AlertBox
          alertTypes="info"
          alertHeading="Info"
          alertMessage="You currently don't have any recipients"
        />
      );
    } else {
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
                  <td>{receiver.receiverAccountId}</td>
                  <td>
                    <span
                      type="button"
                      className="name"
                      onClick={() => {
                        setWorkingReceiver(receiver);
                      }}
                    >
                      {receiver.nickName}
                    </span>
                  </td>
                  <td>{getBankName(receiver.bankId)}</td>
                  <td className="action">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        deleteReceiver(
                          receiver.nickName,
                          receiver.receiverAccountId,
                          receiver.bankId
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 5, offset: 3 }} lg={6}>
          <Card className="mt-3">
            <Card.Header className="toolBar">
              <ToolBar
                handleShowFormModal={handleShowFormModal}
                setModalFormVariables={setModalFormVariables}
                setWorkingReceiver={setWorkingReceiver}
                modalFormVariables={modalFormVariables}
              />
            </Card.Header>
            <ModalReceiverForm
              show={modalFormVariables.show}
              isAdding={modalFormVariables.isAdding}
              handleClose={handleClose}
              workingReceiver={workingReceiver}
              setWorkingReceiver={setWorkingReceiver}
              accessToken={reducerAuthorization.authentication.accessToken}
              customerData={customerData}
            />
            <Card.Body>{showComponent()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReceiverList;
