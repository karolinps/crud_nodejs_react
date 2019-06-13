import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import App from '../App';


export default class Index extends Component{
    constructor(props){
        super(props);
        this.state={ 
            tareas: [], 
            isLoading: true, 
            error:null
    }
        this.delete = this.delete.bind(this)
    }
    getTareas(){
        axios.get('http://localhost:8080/todos').then(
            response => {
                    this.setState({
                        tareas: response.data.data,
                      isLoading: false
                    });
                  }).catch(function(error){
                    console.log(error);
                })
    }
    componentDidMount(){
       this.getTareas()
    }
    delete(id){
        if(window.confirm('Esta seguro de eliminar el registro ?')){
            axios.delete('http://localhost:8080/todo/delete/'+id)
            .then(res => {
                this.getTareas();
                console.log('Borrado')
                });
            }
    
        }
      
    render(){
        
        return(
            <React.Fragment>
                <App/>
            <div className="container mt-4 ">

                <h3 className="text-center">Listado de tareas</h3>
                    <Link  to={'/create'} className="btn btn-primary">Agregar Registro</Link>
                    <table className="table table-striped" style={{ marginTop: 30 }}>
                    
                    <thead>
                    <tr>
                        <th>Tarea</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.tareas.map((data, i) => {
                        return (
                            <tr key={i}>
                                <td>{data.task}</td>
                                <td>
                                <Link to={"/edit/"+data.id} className="btn btn-primary">Editar</Link>
                                </td>
                                <td>
                                    <button  onClick={ () => this.delete(data.id) } className="btn btn-danger ">Borrar</button>
                                </td>
                            </tr>
                        )
                            })}
                    </tbody>
                    
                </table>
            </div>
         </React.Fragment>

       
           )
        
       
    }
}

