import React, {Component} from 'react';
import axios from 'axios';
import App from "../App"

export default class Create extends Component {
    constructor(props){
        super(props)
        this.state={
            task: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
      }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            task: this.state.task,
        };
       
        axios.post('http://localhost:8080/todo/save', obj)
            .then(res => console.log(res.data));
        
        this.setState({
            task: '',
        })
  }
    render(){
        return(
            <React.Fragment>
                <App/>
                <br/><br/>
            <h3 className="text-center">Agregar Tarea</h3>
            <div className="card mt-8 container">
                <form className="card-body" onSubmit={this.onSubmit} >
                    <div className="form-group">
                         <input 
                            type="text" 
                            name="task"
                            value={this.state.task}
                            onChange={this.handleChange}
                            className="form-control" 
                            placeholder="Tarea"
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Registrar" className="btn btn-primary"/>
                </div>                
                </form>

            </div>
            </React.Fragment>

        )
    }
}