import React, { Component } from 'react'
import ContactService from '../services/ContactService'


class ListContactComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        };
        this.addContact = this.addContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.deleteContact= this.deleteContact.bind(this);
    }

    deleteContact(id){
        ContactService.deleteContact(id).then( () => {
            this.setState({contacts: this.state.contacts.filter(contact => contact.id !== id)});
        });
    }
    viewContact(id){
        this.props.history.push(`/view-contact/${id}`);
    }
    editContact(id){
        this.props.history.push(`/add-contact/${id}`);
    }

    componentDidMount(){
        ContactService.getContact().then((res) => {
            this.setState({ contacts: res.data});
        });
    }

    addContact(){
        this.props.history.push('/add-contact/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Contact List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addContact}> Add Contact</button>
                </div>
                <br /><br />
                <div className = "row">
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
                        {
                            this.state.contacts.map(
                                contact =>
                                    <tr key = {contact.id}>
                                        <td> { contact.telephone} </td>
                                        <td> {contact.fname}</td>
                                        <td> {contact.lname}</td>
                                        <td> {contact.street}</td>
                                        <td> {contact.town}</td>
                                        <td> {contact.postcode}</td>
                                        <td>
                                            <button onClick={ () => this.editContact(contact.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteContact(contact.telephone)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewContact(contact.telephone)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListContactComponent
