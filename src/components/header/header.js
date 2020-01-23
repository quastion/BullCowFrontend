import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.scss';

class Header extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Navbar bg="light">
                    <Navbar.Brand href="#home">БЫК-КОРОВА</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link data-page-type="Game" onClick={this.update}>Игра</Nav.Link>
                        <Nav.Link data-page-type="Stats" onClick={this.update}>Рекорды</Nav.Link>
                    </Nav>
                    <Navbar/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href="#">{this.props.username}</a>
                        </Navbar.Text>
                        <Button variant="outline-info" className="ml-2" href='/logout'>Выйти</Button>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }

    update = (e) => {
        e.preventDefault();
        this.props.update("pageType", e.target.getAttribute('data-page-type'));
    }
}

export default Header;
