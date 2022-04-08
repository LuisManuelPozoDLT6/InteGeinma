import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import "../../../assets/css/custom-styles.css";
import axios from "../../../shared/plugins/axios";
import Alert, {
  titleConfirmacion,
  titleError,
  titleExito,
  msjConfirmacion,
  msjError,
  msjExito,
} from "../../../shared/plugins/alert";


export const ProductForm = ({ isOpen, handleClose, getProducts }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [fileBase64, setFileBase64] = useState([]);

  const getSubcategories = (category) => {
    axios({ url: `/subcategory/${category}`, method: "GET" })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      file: [],
      cuantity: 0,
      price: 0.0,
      category: undefined,
      subcategory: undefined,
      status: {
        id: 1,
        description: "Activo",
      },
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Campo Obligatorio")
        .min(3, "Mínimo tres caracteres"),
      description: yup
        .string()
        .required("Campo Obligatorio")
        .min(3, "Mínimo tres caracteres"),
      files: yup.mixed().required("Seleccionar imágenes"),
      cuantity: yup
        .number()
        .required("Campo Obligatorio")
        .positive("Número mayor a 0"),
      price: yup
        .number()
        .required("Campo Obligatorio")
        .positive("Número mayor a 0"),
      category: yup.number().required("Campo Obligatorio"),
      subcategory: yup.number().required("Campo Obligatorio"),
    }),
    onSubmit: (values) => {
      const product = {
        ...values,
        category: { id: parseInt(values.category) },
        subcategory: { id: parseInt(values.subcategory) },
        images: [...fileBase64],
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
            url: "/product/",
            methos: "POST",
            data: JSON.stringify(product),
          })
            .then((response) => {
              console.log(response);
              if (!response.error) {
                getProducts();
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonColor: "#198754",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  cancelRegistration();
                });
              }
              return response;
            })
            .catch((error) => {
              Alert.fire({
                title: titleError,
                text: msjError,
                icon: "error",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Aceptar",
              });
            });
        },
        backdrop: true,
        allowOutsideClick: !Alert.isLoading,
      });
    },
  });

  

  const cancelRegistration = () => {
    formik.resetForm();
    setSubcategories([]);
    handleClose();
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target;
    if (value > 0) {
      getSubcategories(value);
      formik.handleChange(event);
    } else {
      setCategories([]);
    }
  };

  const handleChangeFiles = (event) => {
    formik.handleChange(event);
    const { files } = event.target;
    let filesArray = Array.from(files);
    filesArray.map((item) => {
      let reader = new FileReader();
      reader.onloadend = (data) => {
        setFileBase64(
          data.target.result.replace(/^data:image\/\w+;base64,/, ""),
        );
      };
      reader.readAsDataURL(item);
    });
  };

  useEffect(() => {
    axios({ url: "/category/", method: "GET" })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={isOpen}
        onHide={cancelRegistration}
      >
        <Modal.Header>
          <Modal.Title>Registrar Incidencias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Control
                name="name"
                placeholder="Taza"
                value={formik.handleChange}
              />
              {formik.errors.name ? (
                <span className="error-text">{formik.errors.name}</span>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Descripción</Form.Label>
              <Form.Control
                name="description"
                placeholder="Características del producto"
                as="textarea"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description ? (
                <span className="error-text">{formik.errors.description}</span>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-label">Imágenes</Form.Label>
              <Form.Control
                name="files"
                type="file"
                multiple
                accept="image/*"
                value={formik.values.files}
                onChange={formik.handleChangeFiles}
              />
              {formik.errors.files ? (
                <span className="error-text">{formik.errors.files}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="form-label">Existencias</Form.Label>
                  <Form.Control
                    name="cuantity"
                    type="number"
                    value={formik.values.cuantity}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.cuantity ? (
                    <span className="error-text">{formik.errors.cuantity}</span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Label className="form-label">Precio</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.price ? (
                    <span className="error-text">{formik.errors.price}</span>
                  ) : null}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="form-label">Categoría</Form.Label>
                  <Form.Select
                    aria-label="Seleccionar categoría"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    name="category"
                  >
                    <option value="">Seleccionar</option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.description}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.category ? (
                    <span className="error-text">{formik.errors.category}</span>
                  ) : null}
                  <Form.Label className="form-label">Subcategoría</Form.Label>
                  <Form.Select
                    aria-label="Seleccionar subcategoría"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    name="subcategory"
                    disabled={subcategories.length === 0}
                  >
                    <option value="">Seleccionar</option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.description}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.subcategory ? (
                    <span className="error-text">
                      {formik.errors.subcategory}
                    </span>
                  ) : null}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Button
                    variant="danger"
                    onClick={cancelRegistration}
                    className="me-3"
                  >
                    <FeatherIcon icon="x" />
                    &nbsp; Cerrar
                  </Button>
                </Col>
                <Col>
                <Button
                    variant="success"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    <FeatherIcon icon="check" />
                    &nbsp; Registrar
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
