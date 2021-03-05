import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateContactComponent from "./components/CreateContactComponent";
import UpdateContactComponent from "./components/UpdateContactComponent";
import ListContactComponent from "./components/ListContactComponent";
import ViewContactComponent from "./components/ViewContactComponent";
import React from "react";


function App() {
    return (
        <div>
            <Router>
                <HeaderComponent />
                <div className="container">
                    <Switch>
                        <Route path = "/" exact component = {ListContactComponent}/>
                        <Route path = "/contact" component = {ListContactComponent}/>
                        <Route path = "/add-contact/:id" component = {CreateContactComponent}/>
                        <Route path = "/view-contact/:id" component = {ViewContactComponent}/>
                        {/* <Route path = "/update-contact/:id" component = {UpdateContactComponent}></Route> */}
                    </Switch>
                </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
