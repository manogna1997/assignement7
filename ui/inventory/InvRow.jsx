import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default class InvRow extends Component {

    /**
 * 
 * @param {default init} props 
 */
    constructor(props) {
        super(props);
        this.removeData = this.removeData.bind(this);

    }
    removeData() {
        this.props.remove(this.props.data);
    }


    render() {
        return (
            <tr>
                <td>{this.props.keyId + 1}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.price}</td>
                <td>{JSON.stringify(this.props.data.category)}</td>
                <td>
                    <Button variant="outline-primary">
                        {this.props.data.image != "" ? (
                            <Link to={'/image/' + this.props.data.id}>View Image</Link>
                        ) : ("N/A")}
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger" onClick={this.removeData}>Click to Remove</Button>
                </td>
                <td>
                    <Button variant="outline-warning">
                        <Link to={'/edit/' + this.props.data.id}>Click Edit</Link>
                    </Button>
                </td>

            </tr>
        );
    }
}
