import React, { useEffect, useState } from "react";
import { ButtonCircle } from "../../../shared/components/ButtonCircle";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import { DataTableCustom } from "../../shared/components/DataTableCustom";
import axios from "axios";

export const ProductScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    axios({ url: "/product/", method: "GET" })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const colums = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
  ];
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Productos</Col>
              <Col className="text-end">
                <ButtonCircle
                  type={"btn btn-success btn-circle"}
                  onClickFunct={() => {}}
                  icon="plus"
                  size={20}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTableCustom
              columns={colums}
              data={products}
              isLoading={isLoading}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
