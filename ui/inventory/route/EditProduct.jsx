import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { Container, Button, Row, Col,Alert } from 'react-bootstrap';


import AddProduct from '../AddProduct.jsx'


const GET_P = gql`
  query getProd($id : ID!){
    getProduct (id: $id){
        id, name, price, image , category
}}`;

const EDIT_PRODUCT = gql`
        mutation EditProd($i : ID! ,$n : String! , $p: Float ,$f: String, $c : Category!){
            editProd(id: $i,name: $n ,price : $p ,image: $f ,category: $c ){
                id, name, price, image , category
        }}`;


export default function EditProduct(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();

    if (id != undefined) {
        const [refresh, setRefresh] = useState(false);
        const { loading, error, data, refetch, networkStatus } = useQuery(GET_P, { variables: { id: id } });
        const [editProduct] = useMutation(EDIT_PRODUCT);

        console.log(JSON.stringify(data))
        // const { loading, error, data, refetch, networkStatus } = useQuery(GET_P({ variables: { _id : id} }), { notifyOnNetworkStatusChange: true });

        function saveProduct(p) {

            console.log(editProduct({ variables: { i: id, n: p.name, p: Number.parseFloat(p.price), f: p.image, c: p.category } }));
            if (refresh == false) {
                setRefresh(true)
            } else {
                setRefresh(false)
            }

            refetch()
            alert("completed saving " + id)
        };
        if (loading) {
            return <div>Loading still product data....</div>
        } else {
            return (
                <Container>
                    <div>
                        <Row>
                            <Col md={9}>
                                <Alert variant="warning">
                                    <h6>Edit/Update Product ID: {id}</h6>
                                </Alert>
                            </Col>
                            <Col md={1}></Col>

                            <Col md={2}>
                                <Link to={'/'}> <Button type="submit" value="Submit">Back</Button></Link>
                            </Col>

                        </Row>
                        <br />
                        <AddProduct saveProd={saveProduct} data={data.getProduct} />
                        <br />

                    </div>
                </Container>
            )
        };
    } else {
        return <div>Loading id....</div>
    }
}




