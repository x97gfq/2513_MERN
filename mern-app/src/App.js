import './App.css';
import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import BookList from './components/Books.component'; 
import Home from './Home';

function App() {
    return (
        <Router>  
            <div className="container">  
                <nav className="navbar navbar-expand-lg navheader">  
                    <div className="collapse navbar-collapse" >  
                        <ul className="navbar-nav mr-auto">  
                            <li className="nav-item">  
                                <Link to={'/home'} className="nav-link">Home</Link>
                            </li>  
                            <li className="nav-item">  
                                <Link to={'/BookList'} className="nav-link">Book List</Link>  
                            </li>  
                        </ul>  
                    </div>  
                </nav> 
                <br />  
                <Switch>  
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" component={Home} />
                    <Route path='/BookList' component={BookList} />  
                </Switch>  
            </div>
        </Router>
    )
}

export default App;