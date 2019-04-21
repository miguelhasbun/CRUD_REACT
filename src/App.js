import React, { Component } from 'react';
import './App.css';
import Jeditem from './Jeditem';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import axios from 'axios'

let h1Style = {
  color: 'green'
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      sable: "",
      ladoFuerza: []
    }
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
 componentDidMount() {
   axios.get('http://localhost:59011/api/values')
   .then(res => {
     console.log(res);
      this.setState({ladoFuerza: res.data})
   })
   .catch(err => {
     console.log(err);
   })
 }

  onAdd = () => {
    let jedis = this.state.ladoFuerza;
    let index = jedis[jedis.length - 1].id + 1 || 0;
    const newJedi = {
      nombre: this.state.nombre, 
      sable: this.state.sable
    };

    let url='http://localhost:59011/api/values';
    axios.post(url, newJedi)
    .then(res => {
      console.log({res});
      console.log(index);
      jedis.push({id:index,...newJedi});
      //...newJedi, id: index
      this.setState({ladoFuerza: jedis });
      console.log(this.state.ladoFuerza);
    })
    .catch(err => {
      console.log(err);
    })

  }

  onEditSubmit = (id, nombre, sable) => {
    let editedJedi = this.state.ladoFuerza;
    console.log(id);
    editedJedi = editedJedi.map(jedi => {
      if(jedi.id === id) {
        jedi.nombre = nombre;
        jedi.sable = sable;
      }
      return jedi;
    });
    this.setState({
      ladoFuerza: editedJedi
    });
    
    let url='http://localhost:59011/api/values';
    let data= {id:id, nombre:nombre, sable:sable};
    fetch (url,{
      method:'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res=>res.text())
    .catch(error=>console.error('Error: ',error))
    .then(response=>console.log('Success', response));
    
    
    
  }

  generate = () => {
    console.log('generate');
  };

  onDelete = (id) => {
    let jedi = this.state.ladoFuerza;
    let filteredJedi = jedi.filter(j => {
      return j.id !== id;
    });
    console.log(filteredJedi);
    this.setState({
      ladoFuerza: filteredJedi
    });

    let url='http://localhost:59011/api/values?id='+id;
    fetch(url,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => res.text())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    console.log(id);
  }

  handleChange = nombre => event => {
    this.setState({ [nombre]: event.target.value });
  };

  render() {
    let jedilist= this.state.ladoFuerza.map(jedi => (
      <Jeditem
        key={jedi.id}
        id={jedi.id}
        nombre={jedi.nombre}
        sable={jedi.sable} 
        onDelete={this.onDelete}
        onEditSubmit={this.onEditSubmit}
      />
    ));
    return (
      <div className="App">
         <h1 style={h1Style}>EL CONSEJO JEDI</h1>
        <input 
          type="text" 
          placeholder="Nombre del Jedi" 
          value={this.state.nombre} 
          onChange={this.handleChange('nombre')} 
        />
        <input 
          type="text" 
          placeholder="Sable del Jedi" 
          value={this.state.sable} 
          onChange={this.handleChange('sable')} 
        />
        <Button type="danger" onClick={this.onAdd}>Agregar</Button>
        <ul>
          {jedilist}
        </ul>
      </div>
    );
  }
}

export default App;