import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="text-white">Gain Plan</h5>
            <p className="footer-text">
              Your ultimate partner in building strength, discipline, and a healthier life.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="text-white">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/workout">Workout Plan</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="text-white">Contact</h6>
            <p className="footer-text">Email: support@gainplan.com</p>
            <p className="footer-text">Phone: +63 912 345 6789</p>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="text-center text-light small mb-0">
          © {new Date().getFullYear()} Gain Plan. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
