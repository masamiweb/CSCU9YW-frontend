import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <HeaderComponent />
                <div className="container">
                    <Switch>
                        <Route path = "/" exact component = {ListContactComponent}></Route>
                        <Route path = "/contact" component = {ListContactComponent}></Route>
                        <Route path = "/add-contact/:id" component = {CreateContactComponent}></Route>
                        <Route path = "/view-contact/:id" component = {ViewContactComponent}></Route>
                        {/* <Route path = "/update-contact/:id" component = {UpdateContactComponent}></Route> */}
                    </Switch>
                </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
