import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

import formatter from "../../../HelperFunctions/moneyFormatter";

const CustomersList = (props) => {
  const { employeesData, setStep, setCurrentEmployee, currentEmployee } = props;

  const handleClick = (item) => {
    currentEmployee["name"] = item.name;
    currentEmployee["username"] = item.username;
    currentEmployee["accountNumber"] = item.accountNumber;
    currentEmployee["email"] = item.email;
    currentEmployee["address"] = item.address;
    currentEmployee["phone"] = item.phoneNumber;
    currentEmployee["createdAt"] = item.createdAt;
    currentEmployee["status"] = item.status;

    setCurrentEmployee({ ...currentEmployee });
    setStep(1);
    // getUserTransaction();
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Address</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employeesData.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.address}</td>
              <td>
                <Button onClick={() => handleClick(item)}>Detail</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CustomersList;
