import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";

import CustomersList from "./CustomersList/CustomersList";
import TransactionList from "../../Customer/TransactionManagement/TransactionList/TransactionList";


const CustomerTransaction = (props) => {
  const [usersData, setUsersData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [step, setStep] = useState(0);
  const mountedRef = useRef(true);

  const [currentUser, setCurrentUser] = useState({
    id: "",
    accountNumber: "",
    balance: 0,
    name: "",
    transactions: [],
  });

  console.log(currentUser);
  useEffect(() => {
    if (!mountedRef.current) return null;

    let isGettingAList = true;
    let isGettingATransactionList = true;
    getList(isGettingAList);

    return () => {
      mountedRef.current = false;
      isGettingAList = false;
      isGettingATransactionList = false;
    };
  }, []);

  useEffect(() => {
    if (currentUser.accountNumber === "") return;
    getUserTransaction();
  }, [currentUser.accountNumber]);

  const getList = async (isGettingAList) => {
    await axios
      .get(`/api/protected/customer`)
      // .then((result) => result.data)
      .then((result) => {
        console.log(result);
        if (isGettingAList) {
          result.data = result.data.map((item) => ({ ...item, key: item.id }));
          setUsersData(result.data.reverse());
          isGettingAList = false;
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  console.log(currentUser);
  const getUserTransaction = async () => {
    await axios
      .get(`/api/protected/transactions/transaction/account/${currentUser.id}`)
      .then((result) => {
        return result.data.data;
      })
      .then((result) => {
        // console.log(
        result.sort((a, b) => {
          if (a.accountNumber < b.accountNumber) return -1;
          if (a.accountNumber > b.accountNumber) return 1;
          return 0;
        });
        // );
        setTransactionsData(result);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 5, offset: 3 }} lg={6}>
          <Card className="mt-3">
            <Card.Header className="toolBar">CUSTOMER LIST</Card.Header>
            <Card.Body>
              {step === 0 && (
                <CustomersList
                  usersData={usersData}
                  setStep={setStep}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  getUserTransaction={getUserTransaction}
                />
              )}
              {step === 1 && (
                <>
                  <TransactionList
                    currentUser={currentUser}
                    transactionsData={transactionsData}
                  />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerTransaction;
