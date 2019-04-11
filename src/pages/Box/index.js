import React, { Component } from 'react';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import es from 'date-fns/locale/es';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import {  MdInsertDriveFile } from 'react-icons/md';

import logo from '../../assets/logo.svg';
import './styles.css';

class Box extends Component {

  state = { box: {} }

  async componentDidMount(){
    this.subscribeToNewFiles();

    const box =  this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    this.setState({ box: response.data });
  }

  subscribeToNewFiles = () => {
    const box =  this.props.match.params.id;
    const io = socket('https://omnistack-backend-py.herokuapp.com');

    io.emit('connectRoom', box);

    io.on('file', data => {
      this.setState({ box: { ...this.state.box, files: [ data, ...this.state.box.files] }})
    });
  }

  handleUpload = (files) => {
    files.forEach(file => {
      const box =  this.props.match.params.id;
      const data = new FormData();
      data.append('file', file);

      api.post(`boxes/${box}/files`, data);
    })
  }

  render() {
    return (
      <div id='box-container'>
        <header>
          <img src={logo} alt=''/>
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          { ({ getRootProps, getInputProps }) => (
            <div className='upload' {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arrastre o click aqui </p>
            </div>
          )}
        </Dropzone>

        <ul>
          {
            this.state.box.files && this.state.box.files.map( file => (
              <li key={file.id}>
                <a className='fileInfo' href={file.url} target='blank'>
                  <MdInsertDriveFile size={24} color='#A5cFFF' />
                  <strong>{file.title}</strong>
                </a>
                <span>
                  A{' '}{
                    distanceInWords(
                      file.createdAt,
                      new Date(), {
                        locale: es
                      }
                    )
                  }
                </span>
              </li>
            ))
          }
          
        </ul>

      </div>
    );
  }
}

export default Box;