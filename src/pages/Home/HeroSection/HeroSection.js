// HomePage.jsx
import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";



export default function HomePage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <h1 className="hero-title">Welcome to Gain Plan</h1>
          <p className="hero-subtitle">your ultimate fitness journey</p>
          <Link to="/workout-plan">
            <Button id="hero-btn">Make Your Plan</Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
