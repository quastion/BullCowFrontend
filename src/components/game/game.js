import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import CustomForm from './form/CustomForm.js';
import Stats from '../stats/stats.js';
import './game.scss';

class Game extends React.Component {
  statuses = {
    game: 'GAME',
    gameOver: 'GAME_OVER'
  }

  state = {
    answer: '',
    status: this.statuses.gameOver,
    welcomeMessage: 'Чтобы играть, нажмите "Начать"',
    number: ''
  }

  componentDidMount(){
  }

  onStart = (e) => {
    let self = this;

    fetch('http://localhost:8080/start', {
      method: 'GET',
      mode: 'cors'
    })
    .then((response) => response.json())
    .then((result) => {
      this.setState({ status: result.status});
    });
  }

  checkGameStatus = () => {
    if(this.state.status == this.statuses.gameOver){
      this.setState({
        welcomeMessage: `Вы победили! Загаданное число: ${this.state.number}! Продолжим?`
      }, () => {
        this.setState({answer: ''});
      });
    }
  }

  formCallback = (data) => {
    this.setState({
      answer: data.answer,
      status: data.status,
      number: data.number
    },
    () => {
      this.checkGameStatus();
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  render(){
    return(
      <div className="game container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 mb-5 content">
            {
              this.state.status === this.statuses.game &&
              <>
                <CustomForm onChangeCallback = {this.formCallback}/>
                {this.state.answer !== "" && <Alert variant='primary' className="answer mt-3">
                  {this.state.answer}
                </Alert>}
              </>
            }
            {
              this.state.status === this.statuses.gameOver &&
              <>
                <span className="text-center d-block mb-3">{this.state.welcomeMessage}</span>
                <Button onClick={this.onStart} >Начать</Button>
              </>
            }
          </div>
          <div className="col-12 col-md-6 stats">
            <span className="mb-2 d-block">Последние 3 игры:</span>
            <Stats
              gameState={this.state.status}
              isVisibleLogin="false"
              dataUrl = "http://localhost:8080/userStats"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
