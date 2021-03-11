// STUDENT: 1910509
import React, { Component } from 'react'
import ContactService from '../services/ContactService'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


/**
 * component to display the list of all contacts in our database
 */
class ListContactComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [], // an array that will contain all our contacts
            towns: [] // not used, for future use - an array of all unique towns in our contacts list - maybe use Set instead?
        };
        this.addContact = this.addContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.deleteContact= this.deleteContact.bind(this);
    }

    /**
     *
     * @param id the telephone number of the contact we want to delete
     * then display all the remaining contacts, where telephone does not match the one we just deleted
     */
    deleteContact(id){
        ContactService.deleteContact(id).then( () => {
            this.setState({contacts: this.state.contacts.filter(contact => contact.telephone !== id)});
        },() => {
                alert("Contact not in DB, unable to delete!");
            }
        );
    }

    /**
     *
     * @param contacts the contacts list
     * after deleting all the contacts we need to set the array to an empty array, to prevent an error when trying to use
     * .map - .map is only defined for an array, when we delete all the contacts it is of type object, so in order for
     * our .map method to work - defined in the render() method - it must be of array type - so we set it to an empty array
     */
    deleteContactAll(contacts){
        ContactService.deleteContactAll().then((res) => {
            this.setState({ contacts: []});
        },() => {
            alert("There are no contacts in the DB to delete.");
        }
        );
    }

    /**
     * Depending on the town selected in the drop down list - return contacts filtered by town
     * If no town is found - show an alert informing the user
     */
    getContactByTown(town){

        if(town === "ALL") {
            ContactService.getContact().then((res) => {
                this.setState({ contacts: res.data});
            });

        } else {
            ContactService.getContactByTown(town).then((res) => {
                    this.setState({ contacts: res.data});
                    if(this.state.contacts.length === 0){
                        alert("No contacts from, '" + town.toUpperCase() + "' found in database");
                    }
                },() => {
                    alert("Unable to retrieve contacts!");
                }
            );

        }
    }

    /**
     *
     * @param id the telephone number of our contact
     * this will then route us to the correct page for viewing the ocntact
     */
    viewContact(id){
        this.props.history.push(`/view-contact/${id}`);
    }

    /**
     *
     * @param id the telephone number
     * then we are routed to the update contact page
     */
    editContact(id){
        this.props.history.push(`/update-contact/${id}`);
    }

    /**
     * we are routed to our add contact page which displays an empty form ready to fill in with contact info
     */
    addContact(){
        this.props.history.push('/add-contact/_add');
    }

    /**
     * this is called right after a component is mounted - so we set the state here to trigger a re-rendering of
     * components, in this one we retrieve all the contacts from our database as a list and show them on our page
     */
    componentDidMount(){
        ContactService.getContact().then((res) => {
            this.setState({ contacts: res.data});
        });
    }

    /**
     *
     * @returns {*} elements to display on our page
     */
    render() {
        return (
            <div>
                <h2 className="text-center">Contact List</h2>
                <div className = "row">
                    <button className="btn btn-primary mx-2" onClick={this.addContact}> Add Contact </button>
                    <button className="btn btn-danger mx-2" onClick={() => this.deleteContactAll(this.state.contacts)}> Delete All </button>
                    {/* the drop down is hardcoded in this front end - in future we would populate the list from
                     the contacts array dynamically */}
                    <DropdownButton className="mx-2" id="town-dropdown" title="Filter by Town">
                        <Dropdown.Item onClick={() => this.getContactByTown("ALL")}>Show All</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.getContactByTown("stirling")}>Stirling</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.getContactByTown("glasgow")}>Glasgow</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.getContactByTown("edinburgh")}>Edinburgh</Dropdown.Item>
                    </DropdownButton>
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
                            <th> Options (PUT/DELETE/GET) </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.contacts.map(
                                contact =>
                                    <tr key={contact.telephone}>
                                        <td>{contact.telephone}</td>
                                        <td>{contact.fname}</td>
                                        <td>{contact.lname}</td>
                                        <td>{contact.street}</td>
                                        <td>{contact.town}</td>
                                        <td>{contact.postcode}</td>
                                        <td>
                                            <button onClick={ () => this.editContact(contact.telephone)} className="btn btn-info">Update</button>
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

export default ListContactComponent // expose the ListContactComponent component to other modules
