import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Invoice from "./component/invoice";
import NotFound from "./component/notfound";
import Dashboard from "./component/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/invoice" exact component={Invoice}></Route>
        <Route path="/notfound" exact component={NotFound}></Route>
        <Redirect to="/notfound"></Redirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
