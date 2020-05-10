import React, { Component, useState, useEffect } from 'react';
import InvRow from './inventory/InvRow.jsx'
import Product from './inventory/Pojo.jsx'
import AddProduct from './inventory/AddProduct.jsx'
import { useQuery, gql, useMutation } from '@apollo/client';

import { Table, Button, Container } from 'react-bootstrap';

const GET_PRODUCT = gql` {
products {
    id, name,price,image , category
}}`;

const ADD_PRODUCT = gql`
    mutation CreateProd($n : String! , $p: Float ,$i: String, $c : Category!){
    createProd(name: $n ,price : $p ,image: $i ,category: $c ){
        category
    }}`;

const REMOVE_PRODUCT = gql`
        mutation RemoveProd($i : ID!){
            removeProd(id: $i)
}`;
export default function Inventory(props) {

    const [prod, setProd] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [addProduct] = useMutation(ADD_PRODUCT);
    const [removeProduct] = useMutation(REMOVE_PRODUCT);
    const { loading, error, data, refetch, networkStatus } = useQuery(GET_PRODUCT, { notifyOnNetworkStatusChange: true });

    function saveProduct(p) {
        // console.log(JSON.stringify(p))
        console.log(addProduct({ variables: { n: p.name, p: Number.parseFloat(p.price), i: p.image, c: p.category } }));
        if (refresh == false) {
            setRefresh(true)
        } else {
            setRefresh(false)
        }
        refetch()
    };


    function removeProd(p) {
        console.log(p.id)
        console.log(removeProduct({ variables: { i: p.id } }));
        if (refresh == false) {
            setRefresh(true)
        } else {
            setRefresh(false)
        }
        refetch()
    };
    if (loading) {
        return <div>Loading still ....</div>
    } else {
        console.log("loading " + prod)
        return (
        <Container>
        <div>

            <div>
                <h2> {data.products.lenght}</h2>
            </div>
            <div>
                <h3>Showing all available products</h3>
            </div>
            <hr />
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Remove</th>
                            <th>Edit/Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((p, i) => { return <InvRow key={i} keyId={i} data={p} remove={removeProd} /> })}
                    </tbody>
                </Table>
            </div>
            <div>
                <div>
                    <h3>Add a new product to inventory</h3>
                </div>
                <hr />
                <div >
                <Container fluid>
                        <AddProduct saveProd={saveProduct} />
                    </Container>
                </div>
            </div>
        </div>
        </Container>

        );

    }
}

