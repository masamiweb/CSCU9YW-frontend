// STUDENT: 1910509
import React, { Component } from 'react'
import ContactService from '../services/ContactService'


class ViewContactComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,

            contact: {}
        }

    }

    componentDidMount(){
        ContactService.getContactById(this.state.id).then( res => {
            this.setState({contact: res.data});
        })
    }

    render() {
        return (
            <div>
                <br /><br />
                <div className = "container">
                <div className = "row">
                    <h3 className="text-center">View Contact</h3>
                    <table className = "table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Telephone </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Street </th>
                            <th> Town </th>
                            <th> PostCode </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td> { this.state.contact.telephone }</td>
                            <td> { this.state.contact.fname }</td>
                            <td> { this.state.contact.lname }</td>
                            <td> { this.state.contact.street }</td>
                            <td> { this.state.contact.town }</td>
                            <td> { this.state.contact.postcode }</td>
                        </tr>

                        </tbody>
                    </table>

                </div>
            </div>
            </div>
        )
    }
}

export default ViewContactComponent
