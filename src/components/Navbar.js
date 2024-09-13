import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo.png';
import {Row, Col, Button, Form, InputGroup, ListGroup, Card} from 'react-bootstrap';
import {useContext} from "react";
import {UserContext} from "./UserContext";
import {Link} from "react-router-dom";


function BasicExample() {

    const {user, logout} = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            // Handle logout error
        }
    };
    return (
        <Navbar expand="lg" className={'mb-4'}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        alt="Logo"
                        width="100%"  // Adjust size as necessary
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="text-white">Home</Nav.Link>
                        <Nav.Link href="#link" className="text-white">Link</Nav.Link>
                        <NavDropdown title={<span className="text-white">Dropdown</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {user ? (
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <span>Welcome, {user.username}</span>
                            <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <Link className="btn btn-sm btn-primary" to="/login">Login</Link>
                            <Link className="btn btn-sm btn-success" to="/signup">Signup</Link>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
