import React, { Component } from 'react'
import './App.css';
import GotService from '../server';
import DBPage from '../dbPage';
import AddForm from '../addForm/addForm';

class App extends Component {
  state = {
    number: null,
    curPage: "DB" //addUser, DB
  }

  got = new GotService();

  updateNumber(){
    let num =  this.got.getResource();
    num.then((result) => {
      this.setState({number: result }) 
      alert(this.state.number);
    })
  }

  onChangePage(page){
    this.setState({curPage: page});
  }

  render(){
    let currentPage = (this.state.curPage === "addUser") ? 
      <AddForm page={() => this.onChangePage("DB")}/> : 
      <DBPage page={() => this.onChangePage("addUser")}/> ;
    return (
      <>
        <div className="App">
          <button className='change' onClick={() => this.updateNumber()}>принять рандомное число</button>
        </div>
        {currentPage}
      </>  
    );
  }
}

export default App;
