// STUDENT: 1910509
import React, { Component } from 'react'
import ContactService from '../services/ContactService';

/**
 * create contact component and required methods
 * will display the form required to add a contact
 */
class CreateContactComponent extends Component {

    /**
     *
     * @param props variables passed in from parent component
     */
    constructor(props) {
        super(props);
        // this.state = { hasError: false };

        this.state = {
            id: this.props.match.params.id,
            telephone: '',
            fname: '',
            lname: '',
            street: '',
            town: '',
            postcode: '',
            ret_promise: ''
        };
        this.changeTelephoneHandler = this.changeTelephoneHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeStreetHandler = this.changeStreetHandler.bind(this);
        this.changeTownHandler = this.changeTownHandler.bind(this);
        this.changePostCodeHandler = this.changePostCodeHandler.bind(this);

        this.saveOrUpdateContact = this.saveOrUpdateContact.bind(this);

    }

    // componentDidCatch(error, info) {
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    //     // You can also log the error to an error reporting service
    //
    // }

    componentDidMount(){

        if(this.state.id === '_add'){

        }else{
            ContactService.getContactById(this.state.telephone).then( (res) =>{
                let contact = res.data;
                this.setState({
                    telephone: contact.telephone,
                    fname: contact.fname,
                    lname: contact.lname,
                    street: contact.street,
                    town: contact.town,
                    postcode : contact.postcode
                });
            });
        }
    }
    saveOrUpdateContact = (e) => {
        e.preventDefault();

        let contact = {
            telephone: this.state.telephone,
            fname: this.state.fname,
            lname: this.state.lname,
            street: this.state.street,
            town: this.state.town,
            postcode: this.state.postcode
        };

        //console.log('contact => ' + JSON.stringify(contact));

        if(this.state.telephone === undefined
            || this.state.fname === undefined
            || this.state.lname === undefined
            || this.state.street === undefined
            || this.state.town === undefined
            || this.state.postcode === undefined
            || this.state.telephone.trim() === ''
            || this.state.fname.trim() === ''
            || this.state.lname.trim() === ''
            || this.state.street.trim() === ''
            || this.state.town.trim() === ''
            || this.state.postcode.trim() === '' ){
            alert("All fields are required!");
            return
        }
        if(this.state.id === '_add'){
            // check for duplicate and if already exists show alert here and return

           ContactService.createContact(contact).then(() => {
                this.props.history.push('/contact');
           }, () => {
                   alert("Telephone: "+contact.telephone+" already exists! Select unique number.");
               });

        }else{
            ContactService.updateContact(contact, this.state.telephone).then(() => {
                this.props.history.push('/contact');
            });
        }
    };

    changeTelephoneHandler= (event) => {
        this.setState({telephone: event.target.value});
    };

    changeFirstNameHandler= (event) => {
        this.setState({fname: event.target.value});
    };

    changeLastNameHandler= (event) => {
        this.setState({lname: event.target.value});
    };

    changeStreetHandler= (event) => {
        this.setState({street: event.target.value});
    };

    changeTownHandler= (event) => {
        this.setState({town: event.target.value});
    };

    changePostCodeHandler= (event) => {
        this.setState({postcode: event.target.value});
    };


    cancel(){
        this.props.history.push('/contact');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Contact</h3>
        }else{
            return <h3 className="text-center">Update Contact</h3>
        }
    }
    render() {
        return (
            <div>
                <br /><br />
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>

                                    <div className = "form-group">
                                        <label> Telephone: </label>
                                        <input placeholder="Telephone" name="telephone" className="form-control" maxLength="11"
                                               required pattern="\S+" title="This field is required"
                                               value={this.state.telephone} onChange={this.changeTelephoneHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="fname" className="form-control" maxLength="50"
                                               value={this.state.fname} onChange={this.changeFirstNameHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lname" className="form-control" maxLength="50"
                                               value={this.state.lname} onChange={this.changeLastNameHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label> Street Address: </label>
                                        <input placeholder="Street Address" name="street" className="form-control" maxLength="50"
                                               value={this.state.street} onChange={this.changeStreetHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label> Town Name: </label>
                                        <input placeholder="Town Name" name="town" className="form-control" maxLength="40"
                                               value={this.state.town} onChange={this.changeTownHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Post Code: </label>
                                        <input placeholder="Post Code" name="postcode" className="form-control" maxLength="7"
                                               value={this.state.postcode} onChange={this.changePostCodeHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateContact}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateContactComponent
