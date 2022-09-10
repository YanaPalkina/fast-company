import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import NavBar from "./components/navBar";
import UsersPage from "./components/user";
import Users from "./components/users";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/:userId?" component={UsersPage} />
            </Switch>
        </>
    );
};

export default App;
