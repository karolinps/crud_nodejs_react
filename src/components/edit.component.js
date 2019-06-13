import React, {Component} from 'react';
import axios from 'axios';
import App from "../App"

export default class Edit extends Component {
    constructor(){
        super();
        this.state = {
            task:'',
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount(){
        this.getTarea()
     }
    
    getTarea(id){
        axios.get('http://localhost:8080/todo/'+this.props.match.params.id).then(
            response => {
                    this.setState({
                        task: response.data.data.task,
                    });
                  }).catch(function(error){
                    console.log(error);
                })
    }
    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    onSubmit(e, id) {
        e.preventDefault();
        const obj = {
          task: this.state.task,
        };
        axios.put('http://localhost:8080/todo/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        }
     
    render(){
        return(
            <React.Fragment>
            <App/>
        <br/><br/>
        <h3 className="text-center">Editar Tarea</h3>
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
                    <input type="submit" 
                      value="Actualizar" 
                      className="btn btn-primary"/>
                </div>          
             </form>

        </div>
        </React.Fragment>  
        )
    }
}