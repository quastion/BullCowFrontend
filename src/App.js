import React from 'react';
import './App.css';
import Game from './components/game/game';
import Stats from './components/stats/stats';
import Header from './components/header/header';

class App extends React.Component {
  state = {
    url: '',
    username: '',
    authorities: '',
    pageType: 'Game'
  }

  componentDidMount() {
    this.load('/principal');
  }

  updateState = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  render(){
    const { url } = this.state;

    return (
      <div className="app-container">
        <Header update={this.updateState} username={this.state.username}/>
        {this.state.pageType === "Game" && <Game/>}
        {this.state.pageType === "Stats" && <Stats dataUrl = "http://localhost:8080/usersStats"/>}
      </div>
    );
  }

  load = (url, callback) => {
    let self = this;

    fetch(url, {
      method: 'POST',
      mode: 'cors',
    })
    .then((response) => {
      return response.json()
    })
    .then(function (result) {
      let user = JSON.parse(result);
      self.setState({
        username: user.principal.username,
        authorities: user.principal.authorities
      }, () => {
        if (callback) {
          callback();
        }
      });
    })
    .catch((e) => {

    })
  }
}

export default App;
