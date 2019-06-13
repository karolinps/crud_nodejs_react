import React, {Component} from 'react';
import AuthService from '../AuthService';
import { createHashHistory } from 'history'

export const history = createHashHistory()

export default class LoginForm extends Component{
    constructor(props,history){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            message: '',

        }
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            history.push('/');
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.setState({ message: res.message });
                setTimeout(() => {
                    history.push('/');
                  }, 2000)
            })
            .catch(err =>{
                console.log(err);
                this.setState({ message: err.message });
            })
    }
    alertSuccess(){
        if(this.state.message ){
            return(
                <div className="alert alert-info" role="alert">
                    { this.state.message }

                </div>
            
            )
        }
    }

    render(){
        return(
        <React.Fragment>
            <div className="container row login-card">
                <form className="card-body col-md-6 offset-md-4" onSubmit={this.handleFormSubmit}>

               {this.alertSuccess()}
               
                    <div className="form-group">
                         <input 
                            type="text" 
                            name="username"
                            className="form-control" 
                            placeholder="Ingrese su email"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                         <input 
                            type="text" 
                            name="password"
                            className="form-control" 
                            placeholder="Ingrese su contraseña"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                <div className="form-group text-center">
                    <input type="submit" value="Entrar" className="btn btn-primary"/> 
                    
                </div>   
                </form>   
            </div>   
        </React.Fragment>    
        )
    }
}

