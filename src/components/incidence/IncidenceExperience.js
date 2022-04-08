import { Button } from "bootstrap";
import { Modal } from "bootstrap";
import React, { useState } from "react";
import { StarRating } from "./StarRating";

export const IncidenceExperience = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incidencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>Descripción:</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
