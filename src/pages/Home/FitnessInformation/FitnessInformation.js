// FitnessInformation.jsx
import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "react-bootstrap";
import "./FitnessInformation.css";

export default function FitnessInformation() {
  return (
    <section className="fitness-info-section">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="fitness-card">
            <CardBody>
              <CardTitle className="fs-2 fw-bold text-primary-custom">
                Why Fitness Matters
              </CardTitle>
              <CardSubtitle className="mb-3 text-muted fw-semibold">
                Fuel Your Mind and Body
              </CardSubtitle>
              <CardText className="text-secondary">
                Regular exercise and proper nutrition are essential for building
                strength, improving endurance, and boosting mental clarity.
                Start your journey with <strong>Gain Plan</strong> and transform your
                lifestyle today.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
