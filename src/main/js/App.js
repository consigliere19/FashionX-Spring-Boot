import React, { Component } from "react";
import ReactDOM from "react-dom";
import Admin from "./components/Admin";
import AddItem from "./components/AddItem";
import Home from "./components/Home";
import Cart from "./components/Cart";

import LandingPage from "./components/LandingPage";
// import Login from "./components/Login";
// import Register from "./components/Register";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export class App extends Component {
  render() {
    return (
        <div>
              <Router>
                <div className="container">
                  <Switch>
                    <Route exact path="/">
                      <LandingPage />
                    </Route>
                    {/* <Route exact path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/registration">
                      <Register/>
                    </Route> */}
                    <Route path="/home">
                      <Home />
                    </Route>
                    <Route path="/cart">
                      <Cart />
                    </Route>
                    <Route exact path="/admin">
                      <Admin />
                    </Route>
                    <Route path="/admin/items">
                      <Admin />
                    </Route>
                    <Route path="/admin/addItem/:id">
                      <AddItem />
                    </Route>

                  </Switch>
                </div>
              </Router>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
