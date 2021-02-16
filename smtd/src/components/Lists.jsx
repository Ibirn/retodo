import React, { useEffect } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Search(props) {
  useEffect(() => {
    axios
      .get(`/api/tasks`)
      .then((response) => {
        console.log(response.user);
        console.log("USER TASKS: ", response.data);
        if (response.data.user) {
          props.setName(response.data.user);
        }
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <p>A butt</p>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <p>TWO butts</p>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
