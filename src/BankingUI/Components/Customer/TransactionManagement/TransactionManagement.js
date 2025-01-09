import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Col,
  Card,
  Row,
  // DropdownButton,
  // Dropdown,
  // ButtonGroup,
} from "react-bootstrap";
import axios from "axios";

import "./TransactionManagement.css";
import TransactionList from "./TransactionList/TransactionList";

const TransactionManagement = (props) => {
  const { reducerUserInformation } = props;
  const currentUser = reducerUserInformation.data;
  const [transactionsData, setTransactionsData] = useState([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!mountedRef.current) return null;

    let isGettingAList = true;
    getList(isGettingAList);

    return () => {
      mountedRef.current = false;
      isGettingAList = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async (isGettingAList) => {
    await axios
      .get(
        `http://localhost:8080/api/protected/transactions/transaction/account/${currentUser.accountId}`
      )
      .then((result) => result.data.data)
      .then((result) => {
        if (isGettingAList) {
          result.reverse();
          console.log(result);
          setTransactionsData(result);
          isGettingAList = false;
        }
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
            <Card.Header className="toolBar">
              ACCOUNT TRANSACTION MANAGEMENT
            </Card.Header>
            <Card.Body>
              {/* <div className="form-group row">
								<label
									for="example-date-input"
									className="col-4 col-form-label"
								>
									Sort
								</label>
								<DropdownButton
									as={ButtonGroup}
									id="dropdown-variants-light"
									variant="light"
									title="Date"
								>
									<Dropdown.Item eventkey="1">Action</Dropdown.Item>
									<Dropdown.Item eventkey="2">Another action</Dropdown.Item>
								</DropdownButton>
							</div> */}
              <TransactionList
                transactionsData={transactionsData}
                currentUser={currentUser}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionManagement;
