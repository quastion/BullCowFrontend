import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

class Stats extends React.Component {
  state = {
    stats: []
  }

  componentDidMount(){
    this.loadAndRenderStats();
  }

  componentWillReceiveProps(nextProps){
    this.loadAndRenderStats();
  }

  loadAndRenderStats = () => {
    fetch(this.props.dataUrl, {
      method: 'GET',
      mode: 'cors'
    })
    .then((response) => response.json())
    .then(data => {
      let stats = data.map((stat) => {
        return {'user': stat.user, 'attemptsCount': stat.attemptsCount};
      });
      this.setState({stats: stats});
    });

  }

  render(){
    let { stats } = this.state;
    let rows = stats.map((entity, i) => {
      return (
        <tr>
          {
            (this.props.isVisibleLogin === true ||
            this.props.isVisibleLogin === undefined) &&
            <>
              <td>{i + 1}</td>
              <td>{entity.user.login}</td>
            </>
          }
          <td>{entity.attemptsCount}</td>
        </tr>);
    });

    if(rows.length == 0){
      rows = (
        <tr>
          {
            (this.props.isVisibleLogin === true ||
            this.props.isVisibleLogin === undefined) &&
            <>
              <td></td>
              <td>Нет игр</td>
            </>
          }
          <td>Нет игр</td>
        </tr>);
    }

    return(
      <div className="stats">
        <Table striped bordered hover>
          <thead>
            <tr>
              {
                (this.props.isVisibleLogin === true ||
                this.props.isVisibleLogin === undefined) &&
                <>
                  <th>#</th>
                  <th>Логин</th>
                </>
              }
              <th>Количество попыток</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Stats;
