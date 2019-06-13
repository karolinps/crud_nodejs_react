import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link  } from "react-router-dom";
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import { createHashHistory } from 'history';

export const history = createHashHistory()

const Auth = new AuthService();

class App extends Component {


  handleLogout(){
    Auth.logout()
    history.push('/login');
 }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={`/`} className="navbar-brand">
            Dashboard
          </Link>
          <Link to={`/index`} className="navbar-brand">
            Tareas
          </Link>
            <button type="button" className="btn btn-primary pull-right" onClick={this.handleLogout.bind(this)}>Cerrar Sesión</button>
        </nav>
        <h2>Bienvenido {this.props.user.username}</h2>
      </React.Fragment>
    );
  }
}

export default withAuth(App);
