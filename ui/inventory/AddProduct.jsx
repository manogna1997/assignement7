import React, { Component } from 'react';
import Product from './Pojo.jsx'
import { Container, Button, ButtonToolbar, Form, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

// https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
export default class AddProduct extends Component {
    /**
     * 
     * @param {default init} props 
     */
    constructor(props) {
        super(props);
        if (props.data == undefined) {
            this.state = { newProd: new Product("", "", "Jeans", "") };
        } else {
            this.state = { newProd: props.data };
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * 
     * @param {handle chnages} event 
     * @param {*} name 
     */
    handleChange(event, name) {
        if (name == "name") {
            this.setState({ newProd: new Product(event.target.value, this.state.newProd.price, this.state.newProd.category, this.state.newProd.image) });
        } else if (name == "cat") {
            this.setState({ newProd: new Product(this.state.newProd.name, this.state.newProd.price, event.target.value, this.state.newProd.image) });
        } else if (name == "price") {
            this.setState({ newProd: new Product(this.state.newProd.name, event.target.value.replace("$ ", ""), this.state.newProd.category, this.state.newProd.image) });
        } else if (name == "image") {
            this.setState({
                newProd: new Product(this.state.newProd.name, this.state.newProd.price,
                    this.state.newProd.category, event.target.value)
            });
        }

    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.saveProd(this.state.newProd);
        // this.setState({ newProd: new Product("", "", "Jeans", "") });
    }
    render() {
        return (

            <Form id="regform" onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                    <Form.Label column sm={2}>Category</Form.Label>
                    {/* <Form.Control  /> */}
                    <Col sm={10}>
                        <Form.Control as="select" defaultValue={this.state.newProd.category} onChange={(e) => this.handleChange(e, "cat")}>
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridAddress1">
                    <Form.Label column sm={2}>Price Per Unit</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={"$ " + this.state.newProd.price} onChange={(e) => this.handleChange(e, "price")} />
                    </Col>
                </Form.Group>
                {/* <Container>
                        <div className="flex-row-3">
                            <Form.Label >Category<span className="error"></span></Form.Label>
                        </div>
                        <div className="flex-row-3">
                            <Form.Label>Price Per Unit<span className="error"></span></Form.Label>
                        </div>
                    </Container>
                    <Container>
      
                        <select id="eventslist" defaultValue={this.state.newProd.category} onChange={(e) => this.handleChange(e, "cat")}>
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <input id="12years" type="text" value={"$ " + this.state.newProd.price} onChange={(e) => this.handleChange(e, "price")} />
                    </Container> */}

                <Form.Group as={Row} controlId="formGridAddress1">
                    <Form.Label column sm={2} >Product Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control typeof="text" value={this.state.newProd.name} onChange={(e) => this.handleChange(e, "name")} />
                    </Col>
                </Form.Group>

                <Form.Group controlId="for">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control typeof="text" value={this.state.newProd.image} onChange={(e) => this.handleChange(e, "image")} />
                </Form.Group>

                {/* <Container>
                        <div className="flex-row-5">
                            <label >Product Name<span className="error"></span></label>
                        </div>
                        <div className="flex-row-3">
                        </div>
                        <div className="flex-row-5">
                            <label>Image URL<span className="error"></span></label>
                        </div>
                    </Container>
                    <Container>
                        <input typeof="text" value={this.state.newProd.name} onChange={(e) => this.handleChange(e, "name")} />
                        <input typeof="text" value={this.state.newProd.image} onChange={(e) => this.handleChange(e, "image")} />
                    </Container> */}
                {/* <Container> */}
                <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                        <Link to={'/'}>        <Button type="submit" form="regform" value="Submit">Add Product</Button></Link>
                    </Col>
                    <Col md={5}></Col>
                </Row>

                {/* </Container> */}
            </Form>

        );
    }
}

