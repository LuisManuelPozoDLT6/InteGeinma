import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/auth/authContext";
import FeatherIcon from "feather-icons-react";
import img from "../../assets/img/logoUtez.png";

export const PrivateNavVar = () => {
  const navigation = useNavigate();
  const { dispatch } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Image
          src={img}
          className="ms-5"
          style={{ width: 100, height: "auto" }}
        ></Image>
        <Nav className="me-auto">
          <Link to={"/"} className="nav-link">
            Técnicos
          </Link>
          <Link to={"/subcategory"} className="nav-link">
            Clientes
          </Link>
          <Link to={"/incidences"} className="nav-link">
            Incidencias
          </Link>
        </Nav>
        <Button
          variant="outline-danger"
          onClick={() => dispatch({ type: "LOGOUT" }, navigation("", { replace: true }))}
          
        >
          Cerrar Sesión
        </Button>
      </Container>
    </Navbar>
  );
};
