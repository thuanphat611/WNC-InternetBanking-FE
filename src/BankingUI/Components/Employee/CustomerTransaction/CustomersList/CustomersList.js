import React from "react";
import { Table, Button } from "antd";
import formatter from "../../../HelperFunctions/moneyFormatter";
import { TransactionOutlined } from "@ant-design/icons";

const { Column } = Table;

const CustomersList = (props) => {
  const {
    usersData,
    setStep,
    setCurrentUser,
    currentUser,
    getUserTransaction,
  } = props;
  const handleClick = (item) => {
    currentUser["id"] = item.accounntId;
    currentUser["name"] = item.name;
    currentUser["accountNumber"] = item.accountNumber;
    currentUser["balance"] = item.balance;
    setCurrentUser({ ...currentUser });
    setStep(1);
    getUserTransaction();
  };

  usersData.sort((firstCustomer, secondCustomer) => {
    return firstCustomer.accountNumber - secondCustomer.accountNumber;
  });

  return (
    <Table dataSource={usersData}>
      <Column
        title="#"
        dataIndex="accountNumber"
        key="accountNumber"
        sorter={(a, b) => a.accountNumber - b.accountNumber}
      />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Balance(VND)" dataIndex="balance" key="balance" className="text-center"/>
      <Column
        title="transactionHistory"
        key="transactionHistory"
        render={(item) => (
          <Button
            type="primary"
            onClick={() => {
              handleClick(item);
              console.log(item);
            }}
          >
            View
          </Button>
        )}
      />
    </Table>
  );
};

export default CustomersList;
