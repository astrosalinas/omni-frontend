import React, { Component } from 'react';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';

class Main extends Component {

  state = {
    new_box: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('boxes', {
      title: this.state.new_box
    });

    this.props.history.push(`/box/${response.data._id}`)

  }

  handleInputChange = e => {
    this.setState({ new_box : e.target.value })
  }

  render() {
    return (
      <div id='main-container'>
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt=''/>
          <input 
            placeholder='Criar un box'
            value={this.state.new_box}
            onChange={this.handleInputChange}
          />
          <button type='submit'>Criar</button>
        </form>
      </div>
    );
  }
}

export default Main;