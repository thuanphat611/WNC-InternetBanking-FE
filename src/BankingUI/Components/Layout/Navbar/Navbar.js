import React from "react";
import "./Navbar.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const { reducerAuthorization, setIsAuthenticated } = props;
  const { authentication } = reducerAuthorization;
  console.log(authentication.role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    props.history.push("/login");
  };

  const CustomerNavbar = () => (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="info"
      variant="dark"
      className="px-4 py-2"
    >
      <Navbar.Brand as={Link} to="/" className="text-light">
        DOMLand Bank
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="d-flex justify-content-between align-items-center"
      >
        <Nav>
          {/* <Navbar.Text>
            <Image src="./tic-tac-toe.png" className="avatar" roundedCircle />
          </Navbar.Text> */}
          <Nav.Link
            as={Link}
            to="/edit"
            className="text-light d-flex align-items-center"
          >
            Edit Information
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/debt-management"
            className="text-light d-flex align-items-center"
          >
            Debt Management
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/transaction-management"
            className="text-light d-flex align-items-center"
          >
            Transaction Management
          </Nav.Link>
        </Nav>

        <Nav className="d-flex align-items-center">
          <Nav.Link as={Link} to="/notification" className="text-light">
            <FontAwesomeIcon icon={faBell} />
          </Nav.Link>
          <Button eventkey={2} variant="danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const AdminNavbar = () => (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="px-4"
    >
      <Link to="/">
        <Navbar.Brand href="/">INTERNET BANKING</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/edit" className="text-light mr-2">
              Edit profile
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/statistics" className="text-light mr-2">
              External transaction
            </Link>
          </Nav.Link>
          {/* <Nav.Link>
            <Link to="/join" className="text-light mr-2">
              Join Chat
            </Link>
          </Nav.Link> */}
        </Nav>
        <Nav>
          <Button eventKey={2} variant="danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const EmployeeNavbar = () => (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="danger"
      variant="dark"
      className="px-4 py-2"
    >
      <Link to="/">
        <Navbar.Brand href="/" className="text-light">
          INTERNET BANKING
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="d-flex justify-content-between align-items-center"
      >
        <Nav className="d-flex align-items-center">
          <Nav.Link as={Link} to="/new-customer" className="text-light ml-4">
            Create
          </Nav.Link>
          <Nav.Link as={Link} to="/deposit" className="text-light ml-3">
            Deposit
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/customer-transaction"
            className="text-light ml-3"
          >
            Customer Transaction
          </Nav.Link>
        </Nav>

        <Nav className="d-flex align-items-center">
          {/* <Navbar.Text className="text-light d-flex align-items-center">
            <span className="text-light bold mr-3">User: {name}</span>
          </Navbar.Text> */}
          <Button variant="light" className="ml-3" onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const renderNavbar = () => {
    switch (authentication.role) {
      case "admin": {
        return <AdminNavbar />;
      }
      case "Employee": {
        return <EmployeeNavbar />;
      }
      case "customer": {
        return <CustomerNavbar />;
      }
      default: {
        return <CustomerNavbar />;
      }
    }
  };

  return <>{renderNavbar()}</>;
};

export default Header;
