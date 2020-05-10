import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from '@apollo/client';


const GET_P = gql`
  query getProd($id : ID!){
    getProduct (id: $id){
        id, name, price, image , category
}}`;

export default function DisplayImage(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    const { loading, error, data, refetch, networkStatus } = useQuery(GET_P, { variables: { id: id } });
    console.log(JSON.stringify(data))
    if (id != undefined) {
        if (loading || data.getProduct == undefined) {
            return <div>Loading image.... </div>
        } else {
            return (
                <div className="">
                  {data.getProduct != undefined ? (
                       <img src={data.getProduct.image}  alt="Image to display"/>
                    ) : ("N/A")}
                </div>
            )
        };
    } else {
        return <div>Loading image uri data....</div>
    }
}




