import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { Table, Badge, Button, Space, DatePicker } from "antd";
import axios from "axios";
import getBankName from "../../HelperFunctions/getBankName";
import formatter from "../../HelperFunctions/moneyFormatter";
import TransactionDetail from "../../Customer/TransactionManagement/TransactionDetail/TransactionDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const { Column } = Table;
const { RangePicker } = DatePicker;

const TransactionStatistics = (props) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [filteredTransactionsData, setFilteredTransactionsData] = useState([]);
  const [step, setStep] = useState("table");
  const [workingTransaction, setWorkingTransaction] = useState({
    sentUserId: "",
  });
  let range = null;
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!mountedRef.current) return null;

    getList();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getList = async () => {
    await axios
      .get(`/api/protected/transactions/admin`)
      .then((result) => result.data)
      .then((result) => {
        console.log(result);
        setTransactionsData(result);
        setFilteredTransactionsData(result);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onFilter = (range) => {
    if (range === null) return alert("Wrong information");
    const fromDateUTC = new Date(range.fromDate);
    const toDateUTC = new Date(range.toDate);
    const newTransactionData = transactionsData.filter((item) => {
      const createdAtDate = new Date(item.date);
      if (fromDateUTC <= createdAtDate && toDateUTC >= createdAtDate)
        return true;
      return false;
    });
    console.log(newTransactionData);
    setFilteredTransactionsData(newTransactionData);
  };

  const StatisticTable = () => {
    return (
      <>
        <Space className="mb-3">
          <RangePicker
            onChange={(dates, dateStrings) => {
              console.log("hello: ", dates, dateStrings);
              range = { fromDate: dateStrings[0], toDate: dateStrings[1] };
            }}
          />
          <Button type="primary" onClick={() => onFilter(range)}>
            Filter
          </Button>
        </Space>
        <Table dataSource={filteredTransactionsData}>
          <Column
            title="Sender account"
            dataIndex="sendingAccount"
            key="sendingAccount"
          />
          <Column
            title="Sent bank"
            dataIndex="sendBank"
            key="sendBank"
            render={(sendBank) => <>{getBankName(+sendBank)}</>}
            filters={[
              { text: "DOMLand Bank", value: "0" },
              { text: "Team3 Bank", value: "1" },
              { text: "BAOSON Bank", value: "2" },
            ]}
            onFilter={(value, record) => record.sendBank === value}
          />
          <Column
            title="Receiver account"
            dataIndex="receivingAccount"
            key="receivingAccount"
          />
          <Column
            title="Received bank"
            dataIndex="receiveBank"
            key="receiveBank"
            render={(receiveBank) => <>{getBankName(+receiveBank)}</>}
            filters={[
              { text: "DOMLand Bank", value: "0" },
              { text: "Team3 Bank", value: "1" },
              { text: "BAOSON Bank", value: "2" },
            ]}
            onFilter={(value, record) => record.receiveBank === value}
          />
          <Column
            title="Amount"
            key="amount"
            render={(row) => {
              // let moneyDetail = `${formatter.format(row.amount)}`;
              let moneyDetail, badgeColor;
              if (row.receiveBank === "0") {
                moneyDetail = `${formatter.format(row.amount)}`;
                badgeColor = "#52c41a";
              } else {
                moneyDetail = `${formatter.format(row.amount)}`;
                badgeColor = "red";
              }
              return (
                <Badge
                  className="site-badge-count-109"
                  count={moneyDetail}
                  style={{ backgroundColor: badgeColor }}
                />
              );
            }}
          />
          <Column
            title="Date"
            key="date"
            render={(row) => {
              return <>{new Date(row.date).toUTCString()}</>;
            }}
            sorter={(a, b) => new Date(a.date) - new Date(b.date)}
          />
        </Table>
      </>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 5, offset: 3 }} lg={6}>
          <Card className="mt-3">
            <Card.Header className="toolBar">CUSTOMER TRANSACTION</Card.Header>
            <Card.Body>
              {step === "table" && <StatisticTable />}
              {step === "transaction-detail" && (
                <>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => {
                      setStep("table");
                    }}
                  >
                    <FontAwesomeIcon icon={faBackward} /> BACK
                  </Button>
                  <TransactionDetail transactionDetail={workingTransaction} />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionStatistics;
