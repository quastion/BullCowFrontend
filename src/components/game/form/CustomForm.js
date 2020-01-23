import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import './form.scss';

class CustomForm extends React.Component {
  state = {
    number: '',
    answer: '',
    status: '',
    hintMessage: 'Подсказка: цифры не повторяются',
    hintMessageClass: 'normal'
  }

  onSend = (e) => {
    let self = this;

    e.preventDefault();

    if(this.state.number.length != 4){
      this.setState({
        hintMessage: 'Должно быть 4 цифры!',
        hintMessageClass: 'error'
      });
      return;
    }

    fetch('http://localhost:8080/step', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({answer: this.state.number }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((result) => {
      self.setState({
        answer: result.answer,
        status: result.status
      }, () =>{
        self.props.onChangeCallback(this.state);
      });
    });
  }

  onChange = (e) => {
    if(!this.validate(e.target.value)){
      return;
    }

    this.setState({ [e.target.name] : e.target.value })
  }

  onInput = (e) => {
    let value = this.state.number + e.target.textContent;
    if(!this.validate(value)){
      return;
    }

    this.setState({ number : value })
  }

  onRemove = (e) => {
    this.setState({ number : this.state.number.slice(0, -1) });
  }

  validate = (value) => {
    this.setState({
      hintMessage: 'Подсказка: цифры не повторяются',
      hintMessageClass: 'normal'
    });

    return value.length <= 4 &&
            value.match(/^\d*$/) &&
            (new Set(value.split('')).size == value.length);
  }

  render(){
    return(
      <div className="custom-form">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Введите 4 цифры:</Form.Label>
            <Form.Control value={this.state.number} type="text" name="number" placeholder="Например: 4958" onChange={this.onChange} />
            <Form.Text className={"text-muted " + this.state.hintMessageClass}>
              {this.state.hintMessage}
            </Form.Text>
          </Form.Group>
          <div className="row justify-content-start mt-3">
            <div className="col">
              <div className="keyboard">
                {[1,2,3,4,5,6,7,8,9,0].map((el) =>{
                  return <Button className="mr-3 mb-3" onClick={this.onInput}>{el}</Button>
                })}
                <Button className="mr-3 mb-3" onClick={this.onRemove}>C</Button>
              </div>
            </div>
          </div>
          <Button variant="primary" className="mt-3 w-100" type="submit" onClick={this.onSend}>
            Отправить
          </Button>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
