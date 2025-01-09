import React, { useRef, useEffect } from "react";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { reducerUserInformation } = props;
  const { balance, name } = reducerUserInformation.data;
  const mountedRef = useRef(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  const formattedBalance = formatter.format(balance);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={6}>
          <Card className="text-center mt-3" border="0">
            <Card.Body>
              <Card.Title>
                Hello,{" "}
                <Link to="/edit">
                  <span className="text-primary">{name}</span>
                </Link>
              </Card.Title>
              <Card.Text>
                Your balance:{" "}
                <span className="text-primary">{formattedBalance}</span>
              </Card.Text>
              <div className="d-flex mt-3 gap-3">
                <Link to="/receivers" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Receiver list
                  </Button>
                </Link>
                <Link to="/transaction" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Transfer money
                  </Button>
                </Link>
                <Link to="/debt" className="w-100">
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ height: "100px" }}
                  >
                    Create debt reminder
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
