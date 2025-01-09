import React from "react";
import { Spinner, Button, Badge } from "react-bootstrap";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faTrash } from "@fortawesome/free-solid-svg-icons";

import AlertBox from "../../../Others/AlertBox/AlertBox";

const EmployeeDetail = (props) => {
  const {
    currentEmployee,
    setStep,
    accessToken,
    setFormError,
    setCurrentEmployee,
  } = props;

  const handleDelete = async () => {
    setCurrentEmployee({ ...currentEmployee, isLoading: true });
    await axios
      .delete(`/api/admin/employees/${currentEmployee.accountNumber}`)
      .then((result) => {
        if (result.status === 200) {
          setFormError(null, result.data.message);
          setCurrentEmployee({ ...currentEmployee, isLoading: false });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        // setFormError(error.response.message);
      });
  };

  const handleRecover = async () => {
    setCurrentEmployee({ ...currentEmployee, isLoading: true });

    await axios
      .patch(`/api/admin/employees/recover/${currentEmployee.accountNumber}`)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setFormError(null, result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        // setFormError(error.response.message);
      });
    setCurrentEmployee({ ...currentEmployee, isLoading: false });

    window.location.reload();
  };

  return (
    <>
      <h5 className="text-center">EMPLOYEE DETAIL</h5>
      {currentEmployee.message && (
        <AlertBox
          alertTypes={currentEmployee.error}
          alertMessage={currentEmployee.message}
        />
      )}

      <p className="information">
        <dl className="row">
          <dt className="col-sm-4">Name:</dt>
          <dd className="col-sm-7">{currentEmployee.name}</dd>
          <dt className="col-sm-4">Email:</dt>
          <dd className="col-sm-7">{currentEmployee.email}</dd>
          <dt className="col-sm-4">Phone number:</dt>
          <dd className="col-sm-7">{currentEmployee.phone}</dd>
          <dt className="col-sm-4">Address:</dt>
          <dd className="col-sm-7">{currentEmployee.address}</dd>
        </dl>
      </p>

      <Button
        variant="primary-outline"
        type="button"
        className="mt-3"
        onClick={() => setStep(0)}
      >
        <FontAwesomeIcon icon={faBackward} /> Back
      </Button>
    </>
  );
};

export default EmployeeDetail;
