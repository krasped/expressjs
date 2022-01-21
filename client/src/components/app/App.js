import React, { Component } from 'react'
import './App.css';
import GotService from '../server';
import DBPage from '../dbPage';
import AddForm from '../addForm/addForm';
class App extends Component {
  state = {
    number: null,
    curPage: "DB", //addUser, DB
    db: null
  }

  got = new GotService();

  async updateTable(){
    console.log(1);
    let dbPromise = this.got.getResource('update');
    await dbPromise.then(db => this.setState({db}))
    console.log(this.state.db);
  }

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

  saveUser = (user) => { //send data to server
    this.got.postResource(user);
    console.log(user);
  }

  render(){
    let currentPage = (this.state.curPage === "addUser") ? 
      <AddForm page={() => this.onChangePage("DB")} saveUser={this.saveUser}/> : 
      <DBPage 
        page={() => this.onChangePage("addUser")}
        update={() => this.updateTable()}
        db={this.state.db}/> ;
    return (
      <>
        <div className="App">
          <button className='change' onClick={() => this.updateNumber()}>download random number</button>
        </div>
        {currentPage}
      </>  
    );
  }
}

export default App;
