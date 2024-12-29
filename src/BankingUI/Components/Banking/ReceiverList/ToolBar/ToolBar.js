import React from "react";
import { Card, Badge, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ToolBar.css";

const ToolBar = ({ handleShowFormModal }) => (
  <Card.Header className="toolBar">
    <span>YOUR RECEIVERS LIST</span>
    <span>
      <Button onClick={handleShowFormModal}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </span>
  </Card.Header>
);

export default ToolBar;
