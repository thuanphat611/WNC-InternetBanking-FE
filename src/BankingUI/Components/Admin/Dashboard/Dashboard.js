import React, { useRef, useEffect } from "react";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import axios from "axios";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { reducerUserInformation } = props;
  const { name } = reducerUserInformation.data;
  const mountedRef = useRef(true);

  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "VND",
  //   minimumFractionDigits: 0,
  // });
  // const formattedBalance = formatter.format(balance);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={6}>
          <Card className="text-center mt-3 text-center" border="0">
            <Card.Body>
              <Card.Title>
                Hello, admin{" "}
                <Link to="/edit">
                  <span className="text-primary">{name}</span>
                </Link>
              </Card.Title>
              <div className="d-flex mt-3 gap-3">
                <Link to="/employees" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Employee list
                  </Button>
                </Link>
                <Link to="/new-customer" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Create new cutomer account
                  </Button>
                </Link>
                <Link to="/deposit" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Deposit money for customer
                  </Button>
                </Link>
                <Link to="/customer-transaction" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Customer Transaction
                  </Button>
                </Link>
              </div>
            </Card.Body>
            {/* <Card.Footer className="text-muted">
              HCMUS - PTUDWNC - 21KTPM1
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
