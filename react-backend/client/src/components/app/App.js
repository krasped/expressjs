import React, { Component } from 'react'
import './App.css';
import GotService from '../server';

class App extends Component {
  state = {number: null}

  got = new GotService();


   updateNumber(){
    let num =  this.got.getResource();
    num.then((result) => {
      this.setState({number: result }) 
      alert(this.state.number);
    })
    
  }

  render(){
    return (
      <div className="App">
        <button className='change' onClick={() => this.updateNumber()}>принять рандомное число</button>
      </div>
    );
  }
  
}

export default App;
