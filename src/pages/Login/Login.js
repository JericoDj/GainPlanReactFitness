import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const userData = await login(email, password);
      localStorage.setItem("token", userData.access);
      navigate("/worksout");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container
      className="login-container d-flex justify-content-center align-items-center"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="login-card shadow-sm">
            <Card.Header className="bg-light text-center border-bottom-0">
              <h4 className="mb-0 fw-bold text-dark">Welcome Back</h4>
              <p className="text-muted small mb-0">Login to your account</p>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control-brand"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-brand"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="btn-brand w-100"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>
              </Form>
              <div className="d-flex justify-content-between mt-3 small">
                <Link to="/register" className="text-link-brand">
                  Register
                </Link>
                {/* <Link to="/forgot-password" className="text-link-brand">
                  Forgot Password?
                </Link> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
