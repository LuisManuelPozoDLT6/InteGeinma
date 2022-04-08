import React, { useState, useEffect } from "react";
import axios from "../../shared/plugins/axios";
import { CustomLoader } from "../../shared/components/CustomLoader";
import { Card, Col, Container, Row } from "react-bootstrap";
import Incidence from "./Incidence/Incidence";
import { IncidenceForm } from "./Incidence/IncidenceForm";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import { IncidenceExperience } from "./IncidenceExperience";
import { IncidenceInfo } from "./Incidence/IncidenceInfo";

export const Incidences = (props) => {
  const { user } = props;
  // console.log(user)
  const [isLoading, setIsLoading] = useState(false);
  const [incidence, setIncidence] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setisOpenInfo] = useState(false)
  const [isOpenExp, setIsOpenExp] = useState(false);
  const [incidenceById, setIncidenceById] = useState({})

  const getIncidences = () => {
    axios({ url: "/incidence/", method: "GET" })
      .then((response) => {
        setIncidence(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getIncidenceById = (id) => {
    axios({ url: "/incidence/" + id, method: "GET" })
      .then((response) => {
        setIncidenceById(response.data);
        console.log(response.data);
        setisOpenInfo(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    setIsLoading(true);
    getIncidences();
  }, []);


  if (isLoading) {
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <CustomLoader />
            </Col>
          </Row>
        </Container>
      </>
    );
  }


  return (
    <>
      <Container>
        <IncidenceForm
          isOpen={isOpen}
          // userLogged = {userLogged}
          setIncidence={setIncidence}
          handleClose={() => setIsOpen(false)}
        />
        <br />
        <Row>
          <Col className="text-end">
            <ButtonCircle
              type={"btn btn-success btn-circle"}
              onClickFunct={() => setIsOpen(true)}
              icon="plus"
              size={20}
            ></ButtonCircle>
          </Col>
        </Row>
        <IncidenceInfo
          isOpenInfo={isOpenInfo}
          handleClose={() => setisOpenInfo(false)}
          setIncidenceById={getIncidenceById}
          incidence={incidenceById}
        />

        <Row className="pt-5 m-auto">
          {incidence.map((incidence, index) => 
            (
              <Incidence
                key={incidence.id}
                incidence={incidence}
                index={index}
                onClick={() => getIncidenceById(incidence.id)}
              ></Incidence>
            )
          )}
        </Row>
      </Container>
    </>
  );
};
