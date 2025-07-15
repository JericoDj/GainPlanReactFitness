import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Collapse } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import logo from "../assets/GainPlanLogo(1).png";
import './appNavBar.css';


export default function AppNavBar() {
  const { user, unsetUser, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    unsetUser();
    setExpanded(false); // close navbar
    navigate('/');
  };

const handleNavClick = () => {
  setExpanded(false); // Collapse the navbar (mobile)
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
};

  

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className="shadow-sm custom-navbar"
      sticky="top"
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center brand-logo"
        >
          <img
            src={logo}
            alt="Likha Home Logo"
            className="logo-img"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!loading && (
              <>
                {!user.isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/home"
                    className="mx-2 nav-link-custom"
                    onClick={handleNavClick}
                  >
                    Home
                  </Nav.Link>
                )}

                {!user.isAdmin && (
                  <Nav.Link
                    as={NavLink}
                    to="/workout"
                    className="mx-2 nav-link-custom"
                    onClick={handleNavClick}
                  >
                    Workout
                  </Nav.Link>
                )}

                {/* {user.isAdmin && (
                  <Nav.Link as={NavLink} to="/adminDashboard" className="mx-2 nav-link-custom" onClick={handleNavClick}>
                    Admin Dashboard
                  </Nav.Link>
                )} */}

                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="mx-2 nav-link-custom"
                  onClick={handleNavClick}
                >
                  Account
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
