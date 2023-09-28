import axios from 'axios';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        axios.post('https://localhost:7031/api/Login/logout')
            .then(response => {
                if (response.status === 200) {
                    navigate('/');
                    console.log("Çıkış basarılı");
                } else {
                    console.error('Çıkış işlemi başarısız oldu');
                }
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    };
    return (
        <div className='header'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Ürün Stok Yönetimi</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className={"fa fa-minus"}></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>Anasayfa</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={handleLogout}>Çıkış Yap</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
}
export default Header;
