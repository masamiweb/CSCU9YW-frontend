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
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Contact Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Telephone: </label>
                            <div> { this.state.contact.telephone }</div>
                        </div>
                        <div className = "row">
                            <label> First Name: </label>
                            <div> { this.state.contact.fname }</div>
                        </div>
                        <div className = "row">
                            <label> Last Name: </label>
                            <div> { this.state.contact.lname }</div>
                        </div>
                        <div className = "row">
                            <label> Street: </label>
                            <div> { this.state.contact.street }</div>
                        </div>
                        <div className = "row">
                            <label> Town: </label>
                            <div> { this.state.contact.town }</div>
                        </div>
                        <div className = "row">
                            <label> PostCode: </label>
                            <div> { this.state.contact.postcode }</div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default ViewContactComponent
