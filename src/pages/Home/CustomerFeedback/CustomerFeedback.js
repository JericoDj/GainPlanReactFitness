import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomerFeedback.css";

export default function CustomerFeedback() {
  const testimonials = [
    {
      message:
        "Gain Plan helped me stay consistent and motivated! I feel stronger every week.",
      name: "— Alex D.",
    },
    {
      message:
        "As a busy mom, the custom plans fit perfectly into my schedule. Love the progress I'm seeing!",
      name: "— Maria L.",
    },
    {
      message:
        "The workouts are challenging but manageable. I’ve lost 10 pounds and feel amazing!",
      name: "— Jason P.",
    },
  ];

  return (
    <div className="customer-feedback-section py-5 text-center">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-3 fw-bold">What Our Customers Are Saying</h2>
            <p className="mb-4 text-muted">
              Your feedback helps us grow stronger and serve better.
            </p>
            
          </Col>
        </Row>

        <Row className="mt-5">
          {testimonials.map((feedback, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="feedback-card h-100 text-start">
                <Card.Body>
                  <Card.Text className="feedback-text">
                    "{feedback.message}"
                  </Card.Text>
                  <Card.Subtitle className="text-muted">
                    {feedback.name}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
