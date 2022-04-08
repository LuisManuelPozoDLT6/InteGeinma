import React, { useState } from "react";
import "../../../assets/css/geinma.css";
import FeatherIcon from "feather-icons-react";
import { StarRating } from "../StarRating";
import { Modal } from "bootstrap";
import { Button } from "bootstrap";
import { ButtonCircle } from "../../../shared/components/ButtonCircle";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { IncidenceExperience } from "../IncidenceExperience";

export const Incidence = (props) => {
  // console.log(props.index+" indice");
  const { incidence, onClick } = props;
  const { status, client, technical } = incidence;

  //Abrir Modal de Descripción
  const [show, setShow] = useState(false);
  const [isOpenExp, setIsOpenExp] = useState(false);

  const colorStatus = (status) => {
    switch (status) {
      case "Activo":
        return "bg-info";
      case "En ejecución":
        return "bg-warning";
      case "Terminada":
        return "bg-danger";
    }
  };

  return (
    <div className="col-md-6 col-lg-4 pb-3">
      <div
        className="card card-custom bg-white border-white border-0"
        style={{ height: 350 }}
        onClick={onClick}
      >
        <div
          className={
            props.index % 2 == 0
              ? "card-custom-img bg-verde"
              : "card-custom-img bg-azul"
          }
        >
          <div
            className="text-white"
            style={{ marginLeft: 130, marginTop: 42, lineHeight: "100%" }}
          >
            <p>
              <FeatherIcon icon={"user"} size={18}></FeatherIcon>{" "}
              {client.person.name} {client.person.surname}{" "}
              {client.person.secondSurname}
            </p>
            <p>
              <FeatherIcon icon={"calendar"} size={18}></FeatherIcon>{" "}
              {incidence.dateRegistered}
            </p>
          </div>
        </div>
        <div className="card-custom-avatar">
          {/* <img src={'data:image/png;base64,'+ inci.file}> */}
          <img
            className="img-fluid "
            src={"data:image/png;base64," + incidence.pictureIncidence}
          />
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <h5 className="card-title">
            <span className={"badge " + colorStatus(status.description)}>
              {status.description}
            </span>
          </h5>
          <p className="card-text">{incidence.description}</p>
        </div>
        <div
          className="card-footer"
          style={{ background: "inherit", borderColor: "inherit" }}
        >
          <hr></hr>
          <p>
            <FeatherIcon icon={"tool"} size={15}></FeatherIcon>{" "}
            {!incidence.technical
              ? "Por asignar"
              : technical.person.name + " " + technical.person.surname}
            {status.description != "Terminada" ? (
              ""
            ) : (
              <button className="btn btn-outline-danger float-end">
                Terminar
              </button>
            )}
          </p>
          <Container>
            {/* <IncidenceExperience
          isOpenExp={isOpenExp}
          handleClose={() => setIsOpenExp(false)}
        /> */}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Incidence;
