import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import axios from "../../shared/plugins/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import Alert from "../../shared/plugins/alert";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { render } from "@testing-library/react";
import "../../assets/css/fondo.css";
import img from "../../assets/img/logoUtez.png";
import img2 from "../../assets/img/fondoHome.png";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Figure,
  FormGroup,
  FormControl,
  Navbar,
  Image,
} from "react-bootstrap";

export const LoginScreen = () => {
  const navigation = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo Obligatorio").email(),
      password: yup
        .string()
        .required("Campo Obligatorio")
        .min(4, "Mínimo cuatro caracteres"),
    }),
    onSubmit: (values) => {
      axios({
        url: "/auth/login",
        method: "POST",
        data: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.error) {
            const action = {
              type: "LOGIN",
              payload: response.data,
            };
            dispatch(action);
            navigation("/incidences", { replace: true });
          }
        })
        .catch((error) => {
          Alert.fire({
            title: "Verifique los datos",
            text: "Usuario y/o contraseña incorrectos",
            icon: "error",
            confirmButtonText: "Aceptar",
            cancelButtonColor: "#3085d6",
          });
        });
    },
  });

  const handleCancel = () => {
    navigation("/");
  };

  const bg1 = {
    backgroundImage: `url(${img2})`,
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    flex: 1,
  };

  const handleReturn = () => {
    navigation("/");
  };


  useEffect(() => {
    document.title = "GEINMA | Login";
  }, []);
  return (
    <>
      <div>
        <section
          className="h-100 "
          // gradient-form

          style={{ backgroundColor: "#eee" }}
        >
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="#">
                <Image
                  src={img}
                  className="ms-5"
                  style={{ width: 100, height: "auto" }}
                ></Image>
              </Navbar.Brand>
              <Form.Text>
                <h4 className="text-center">
                  Gestión de Incidencias de Mantenimiento
                </h4>
              </Form.Text>
              <Button variant="outline-danger" onClick={handleReturn}>
                <FeatherIcon icon="arrow-left" onClick={handleReturn} />
              </Button>
            </Container>
          </Navbar>
          <div style={bg1}>
            <br />
            <Container>
              <div className="fondo"></div>
              <Row className="d-flex justify-content-center aling-items-center h-100">
                <Col className="col-xl-8">
                  <div className="card rounded-3 text-black">
                    <Row className="g-0">
                      <Col className="col-lg-6">
                        <div className="card-body p-md-2 mx-md-1">
                          <div className="text-center">
                            <Figure>
                              <Figure.Image
                                width={225}
                                height={210}
                                alt="GEINMA"
                                src={img}
                              />
                            </Figure>
                            <h4 className="mt-1 mb-5 pb-1">Inicio de Sesión</h4>
                          </div>
                          <Form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                              <Form.Label htmlFor="user">Usuario</Form.Label>
                              <FormControl
                                placeholder="example@gmail.com"
                                id="email"
                                autoComplete="off"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                              />
                              {formik.errors.email ? (
                                <span className="error-text">{formik.errors.email}</span>
                              ) : null}
                            </FormGroup>
                            <FormGroup>
                              <Form.Label htmlFor="password">
                                Contraseña
                              </Form.Label>
                              <FormControl
                                placeholder="************"
                                id="password"
                                autoComplete="off"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                              />
                              {formik.errors.password ? (
                                <span className="error-text">{formik.errors.password}</span>
                              ) : null}
                            </FormGroup>

                            <FormGroup className="form-outline mb-5">
                              <div className="text-end pt-1 pb-1">
                                <a href="#" className="text-muted">
                                  ¿Olvidaste tu contraseña?
                                </a>
                              </div>
                            </FormGroup>

                            <FormGroup>
                              <div className="text-center pt-1 pb-1">
                                <Button
                                  variant="secondary"
                                  className="btn-hover gradient-custom-2"
                                  type="submit"
                                  disabled={!(formik.isValid && formik.dirty)}
                                >
                                  <FeatherIcon icon="log-in" /> Iniciar Sesión
                                </Button>
                              </div>
                            </FormGroup>
                          </Form>
                        </div>
                      </Col>
                      <Col className="col-lg-6 d-flex aling-items-center gradient-custom-2">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                          <h4>
                            Gestión de Incidencias de Mantenimiento | UTEZ
                          </h4>
                          <p className="small mb-0">Lorem ipsun</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
            <br />
          </div>
        </section>
      </div>
    </>
  );
};
