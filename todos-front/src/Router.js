import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import AuthFormContainer from "./components/auth/AuthContainer";
import AuthFormContainerReg from "./components/auth/AuthContainerReg";

const Router = ({ setUser, user }) => (
  <Switch>
    <Route exact path="/" render={props => <Home user={user} {...props} />} />
    <Route
      exact
      path="/login"
      render={props => (
        <AuthFormContainer {...props} setUser={setUser} user={user} />
      )}
    />
    <Route
      exact
      path="/register"
      render={props => (
        <AuthFormContainerReg {...props} setUser={setUser} user={user} />
      )}
    />
  </Switch>
);

export default Router;
