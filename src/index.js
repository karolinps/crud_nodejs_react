import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Index from "./components/index.component";
import Create from "./components/create.component";
import LoginForm from "./components/login/loginForm";
import Edit from "./components/edit.component";

import * as serviceWorker from './serviceWorker';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

ReactDOM.render(
    <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <App />} />
     
      <Route path="/index" render={() => <Index />} />
      <Route path="/create" render={() => <Create />} />
      <Route path="/edit/:id" component={Edit} />
      <Route exact path="/login" render={()=> <LoginForm/>} />

    </Switch>
  </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
