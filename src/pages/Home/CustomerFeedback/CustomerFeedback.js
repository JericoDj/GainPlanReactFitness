import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function CustomerFeedback() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Customer Feedback</h1>
          <p>Let your customers know how we're doing!</p>
          <p>
            <Link to="/feedback">Add Feedback</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}