import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { FaComments, FaUserAlt, FaCalendar } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  titleError,
  msjError,
  titleExito,
  msjExito,
} from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";
import { AuthContext } from "../../auth/authContext";

export const IncidenceInfo = ({
  isOpenInfo,
  handleClose,
  incidence,
  setIncidenceById,
}) => {
  const { status, client, comments } = incidence;
  const { user } = useContext(AuthContext);

  const handleCloseForm = () => {
    formik.resetForm();
    handleClose();
  };

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

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: yup.object().shape({
      description: yup.string().required("Campo obligatorio!"),
    }),
    onSubmit: (values) => {
      const comment = {
        ...values,
        token: user.user.username,
        incidence: incidence,
      };
      Alert.fire({
        title: titleConfirmacion,
        text: msjConfirmacion,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#198754",
        cancelButtonColor: "#dc3545",
        showCancelButton: true,
        reverseButtons: true,
        showLoaderOnConfirm: true,
        icon: "warning",
        preConfirm: () => {
          return axios({
            url: "/comment/",
            method: "POST",
            data: JSON.stringify(comment),
          })
            .then((response) => {
              console.log(response);
              if (!response.error) {
                setIncidenceById((incidence) => [...incidence, response.data]);
                handleCloseForm();
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonColor: "#198754",
                  confirmButtonText: "Aceptar",
                });
              }
              return response;
            })
            .catch((error) => {
              Alert.fire({
                title: titleError,
                text: msjError,
                confirmButtonColor: "#198754",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            });
        },
        backdrop: true,
        allowOutsideClick: !Alert.isLoading,
      });
    },
  });

  return (
    <>
      <Modal show={isOpenInfo} onHide={handleCloseForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Incidencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="col-12 col-md-6 col-lg-5 pb-3 text-center">
                <img
                  className="size"
                  src={"data:image/png;base64," + incidence?.pictureIncidence}
                ></img>
                <p className="text-center">
                  "Resolvió mi problema, pero se tardó un poco"
                </p>
              </Col>
              <Col className="col-md-6 col-lg-7 pb-3">
                <h2>
                  <span className={"badge " + colorStatus(status?.description)}>{status?.description}</span>
                </h2>
                <p>
                  <FaUserAlt /> {client?.person?.name} {client?.person?.surname}{" "}
                  {client?.person?.secondSurname}
                </p>
                <p>
                  <FaCalendar /> {incidence?.dateRegistered}{" "}
                </p>
                <p>{incidence?.description}</p>
              </Col>
              <hr></hr>
              <h5 className="text-muted">
                <FaComments /> Comentarios
              </h5>
              {comments?.map((comments, index) => {
                return (
                  <Container>
                    <Row>
                      <Col className="col-1 col-lg-1 text-end">
                        <img
                          className="imgRedonda"
                          src={
                            "data:image/png;base64," +
                            client?.person?.imageProfile
                          }
                        ></img>
                      </Col>
                      <Col className="col-lg-11">
                        <span className="fw-bold">
                          {comments?.user?.person?.name}{" "}
                          {comments?.user?.person?.surname}{" "}
                          {comments?.user?.person?.secondSurname}{" "}
                        </span>
                        <span className="text-muted">{comments?.time}</span>
                        <p>{comments?.description}</p>
                      </Col>
                    </Row>
                  </Container>
                );
              })}

              <Container>
                <Row>
                  <Form onSubmit={formik.handleSubmit}>
                    <Col className="col-lg-1 ">
                      <img
                        className="imgRedonda"
                        src={
                          "data:image/png;base64," +
                          client?.person?.imageProfile
                        }
                      ></img>
                    </Col>

                    <Col className="col-lg-11">
                      <span className="fw-bold">
                        {client?.person?.name} {client?.person?.surname}{" "}
                        {client?.person?.secondSurname} :
                      </span>
                      <br></br>

                      <Form.Group className="mb-4">
                        <Form.Control
                          name="description"
                          placeholder="Agregue un comentario..."
                          as="textarea"
                          rows={4}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.description ? (
                          <span className="error-text">
                            {formik.errors.description}
                          </span>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <hr></hr>

                    <Form.Group className="mb-4">
                      <Row>
                        <Col className="text-end">
                          <Button
                            variant="danger"
                            type="button"
                            onClick={handleCloseForm}
                          >
                            <FeatherIcon icon={"x"} />
                            &nbsp; Cerrar
                          </Button>
                          <Button
                            variant="success"
                            className="ms-3"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            <FeatherIcon icon={"check"} />
                            &nbsp; Guardar
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Row>
              </Container>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
