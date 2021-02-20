import React, { useEffect, useState } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Search(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // if (props.name) {
    axios
      .get(`/api/tasks`)
      .then((response) => {
        setTasks(() => [...response.data.tasks]);
      })
      .catch((err) => {
        console.log(err);
        setTasks(() => []);
      });
    // } else {
    //   setTasks(() => []);
    // }
    return () => {};
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const writeList = (category) => {
    return tasks
      .filter((task) => task.category === category)
      .map((elem, ind) => <li key={ind}>{elem.id}</li>);
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Watch</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Read</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <p>A butt</p>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div>{writeList("book")}</div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
