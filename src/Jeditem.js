import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

class Jeditem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    onDelete = () => {
        const { onDelete, id } = this.props;
        onDelete(id);
    }

    onEdit = () => {
        this.setState({isEdit: true});
    }

    onEditSubmit = (event) => {
        event.preventDefault();
        this.props.onEditSubmit(this.props.id, this.nameInput.value, this.sableInput.value);
        this.setState({isEdit: false});
    }

    render() {
      const { nombre, sable} = this.props;
      return (
        <div>
            {
            this.state.isEdit 
            ? (
                <form onSubmit={this.onEditSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nombre del jedi" 
                        ref={nameInput => this.nameInput = nameInput}
                        defaultValue={nombre}
                    />
                    <input 
                        type="text" 
                        placeholder="Sable del Jedi" 
                        ref={sableInput => this.sableInput = sableInput}
                        defaultValue={sable}
                    />
                    <button>Save</button>
                </form>
            )
            : (
                <div>
                    <span>{nombre}</span>
                    {` | `}
                    <span>{sable}</span>
                    {` | `}
                    <Button type="danger" onClick={this.onEdit}>Edit</Button>
                    {` | `}
                    <Button type="danger" onClick={this.onDelete}>Delete</Button>
                </div>
            )
        }
            
        </div>
      );
    }
  }
  
export default Jeditem;