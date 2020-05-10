import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from './Inventory.jsx'
import EditProduct from './inventory/route/EditProduct.jsx'
import DisplayImage from './inventory/route/DisplayImage.jsx'
import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.min.js.map';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Switch, Link, useParams } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, ButtonToolbar, Navbar, Nav } from 'react-bootstrap';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql',
    })
});
/**
 * render to index.html page
 */
ReactDOM.render(
    <Container fluid>

        <BrowserRouter>
            <Navbar  bg="dark" expand="lg" variant="dark">

                <Navbar.Brand href="#home">Inventory</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" pullRight>
                        <ButtonToolbar className="custom-btn-toolbar" pullright="true">
                            <Nav.Link href="">
                                <LinkContainer to="/">
                                    <Button>Home</Button>
                                </LinkContainer>
                            </Nav.Link>
                            <Nav.Link href="">
                                <LinkContainer to="/edit">
                                    <Button>Edit</Button>
                                </LinkContainer>
                            </Nav.Link>
                            <Nav.Link href="">
                                <LinkContainer to="/image">
                                    <Button>Image</Button>
                                </LinkContainer>
                            </Nav.Link>
                        </ButtonToolbar>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <ApolloProvider client={client}>
                <Switch>
                    <Route path="/" exact component={Inventory} />
                    <Route path="/edit/:id" exact component={EditProduct} />
                    <Route path="/image/:id" exact component={DisplayImage} />
                </Switch>
            </ApolloProvider>

        </BrowserRouter>
    </Container>

    , document.getElementById('root'));
