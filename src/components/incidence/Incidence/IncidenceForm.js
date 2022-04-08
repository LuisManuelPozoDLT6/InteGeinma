import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
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

export const IncidenceForm = ({
  isOpen,
  userLogged,
  setIncidence,
  handleClose,
}) => {
  const { user } = useContext(AuthContext);
  const [fileBase64, setFileBase64] = useState("");
  // console.log(user.user.role[0].authority)

  const formik = useFormik({
    initialValues: {
      description: "",
      client: {}, //...userLogged
      status: {
        id: 1,
        description: "Activo",
      },
      files: [],
    },
    validationSchema: yup.object().shape({
      description: yup.string().required("Campo obligatorio!"),
      files: yup.mixed().required("Seleccionar imágenes"),
    }),
    onSubmit: (values) => {
      const incidence = {
        ...values,
        token: user.user.username,
        pictureIncidence: fileBase64[0].fileBase64,
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
            url: "/incidence/",
            method: "POST",
            data: JSON.stringify(incidence),
          })
            .then((response) => {
              console.log(response);
              if (!response.error) {
                setIncidence((incidence) => [...incidence, response.data]);
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

  const handleCloseForm = () => {
    formik.resetForm();
    handleClose();
  };

  const handleChangeFiles = (event) => {
    formik.handleChange(event);
    const { files } = event.target;
    let filesArray = Array.from(files);
    filesArray.map((item) => {
      let reader = new FileReader();
      reader.onloadend = (data) => {
        setFileBase64((files) => [
          {
            fileBase64: data.target.result.replace(
              /^data:image\/\w+;base64,/,
              ""
            ),
          },
        ]);
      };
      reader.readAsDataURL(item);
    });
  };
  
  // const handleChangeFiles = (event) => {
  //   formik.handleChange(event);
  //   const { file } = event.target;
  //   let filesArray = Array.from(file);
  //   filesArray.map((item) => {
  //     let reader = new FileReader();
  //     reader.onloadend = (data) => {
  //       setFileBase64(
  //         data.target.result.replace(/^data:image\/\w+;base64,/, ""),
  //       );
  //     };
  //     reader.readAsDataURL(item);
  //   });
  // };
  //<img src={'data:image/png;base64,'+ inci.file}>
  return (
    <>
      <Modal 
      show={isOpen} 
      onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar incidencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="form-label">Descripción</Form.Label>
              <Form.Control
                name="description"
                placeholder="Describa detalladamente su problema"
                as="textarea"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description ? (
                <span className="error-text">{formik.errors.description}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Imágenes</Form.Label>
              <Form.Control
                name="files"
                type="file"
                multiple
                accept="image/*"
                value={formik.values.files}
                onChange={handleChangeFiles}
              />
              {formik.errors.files ? (
                <span className="error-text">{formik.errors.files}</span>
              ) : null}
            </Form.Group>
            <br />
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
        </Modal.Body>
      </Modal>
    </>
  );
};
