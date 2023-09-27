import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from '../App';
import LoginPage from '../Pages/Login';

function App() {
    return (
        <Router>
            <div className='header'>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to="index">Ürün Stok Yönetimi</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <span className={"fa fa-minus"}></span>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to='index'>Anasayfa</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to='cikis'>Çıkış Yap</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <Routes>
                <Route path="index" exact component={HomePage} />
                <Route path="cikis" exact component={LoginPage} />
            </Routes>
        </Router>
    );
}

export default App;
