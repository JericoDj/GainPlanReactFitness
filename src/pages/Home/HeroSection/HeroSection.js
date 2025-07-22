// HeroSection.jsx
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeroSection.css"; // Make sure this file exists

export default function HeroSection() {
  return (
    <div className="home-page">
      <section className="hero-section text-center d-flex align-items-center justify-content-center">
        <Container>
          <h1 className="hero-title">Welcome to Gain Plan</h1>
          <p className="hero-subtitle">Your ultimate fitness journey starts now</p>
          <Link to="/workout">
            <Button id="hero-btn">Make Your Plan</Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
