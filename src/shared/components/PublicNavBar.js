import React from "react";
import {
  Containerm,
  Nav,
  Navbar,
  Image,
  Button,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/logoUtez.png";
import img2 from "../../assets/img/fondoHome.png";
import img3 from "../../assets/img/imagen.png";

export const PublicNavBar = () => {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation("/auth");
  };

  const handleHome = () => {
    navigation("/");
  };

  const bg1 = {
    backgroundImage: `url(${img2})`,
    height: "550px",
    // width:"100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    flex: 1,
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <Image
              src={img}
              className="ms-5"
              style={{ width: 100, height: "auto" }}
              onClick={handleHome}
            ></Image>
          </Navbar.Brand>
          <Form.Text>
            <h4>Gestión de Incidencias de Mantenimiento</h4>
          </Form.Text>
          <Button variant="success" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </Container>
      </Navbar>

      {/*
            ... El texto de universidad en el card con fondo verde ponlo de color blanco
            Y disminuye el tamaño del contenido en el card
            Esta muy grande la letra
          */}

      <div style={bg1}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6" style={{ marginTop: 110, marginLeft: 140 }}>
              <Card border="success" style={{ width: "22rem", opacity: 0.9 }}>
                <strong>
                  <Card.Header
                    style={{ backgroundColor: "#1d8c60", color: "white" }}
                  >
                    Universidad Tecnológica Emiliano Zapata
                  </Card.Header>
                </strong>

                <Card.Body>
                  <Card.Text>
                    <h6 style={{ fontSize: 14 }}>
                      <i>
                        "Nos importa que la UTEZ brinde el mejor servicio
                        tecnológico a todos los alumnos y puedan dar un máximo
                        esfuerzo".
                      </i>
                    </h6>
                  </Card.Text>
                </Card.Body>
                <div className="text-center">
                  <Card.Img
                    variant="top"
                    src={img3}
                    style={{ width: "60%", height: "60%" }}
                  />
                </div>

                <br></br>
              </Card>
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>

      {/* <div className="text-center" style={{backgroundImage:img2}}>
        
        <Image src={img2} style={{ width: "100%", height: "100%" }}></Image>
      </div> */}
    </div>
  );
};
