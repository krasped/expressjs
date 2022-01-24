import React, { Component } from 'react'
import './App.css';
import GotService from '../server';
import DBPage from '../dbPage';
import AddForm from '../addForm';
import BookPage from '../bookPage';
class App extends Component {
  state = {
    number: null,
    curPage: "DB", //addUser, DB, book
    db: null,
    book: null // dbOfBooks
  }

  got = new GotService();

  async updateTable(url){
    let dbPromise = this.got.getResource(url);
    if(url === "update"){
      await dbPromise.then(db => this.setState({db}))
    }else if (url ==="book") {
      await dbPromise.then(book => this.setState({book}))
    }
  }

  updateNumber(){
    let num =  this.got.getResource();
    num.then((result) => {
      this.setState({number: result }) 
      alert(this.state.number);
    })
  }

  onChangePage(page){
    console.log(page);
    this.setState({curPage: page});
  }

  saveUser = (user) => { //send data to server
    this.got.postResource(user);
  }

  saveData = (data, url) => { //send data to server
    this.got.postResource(data, url);
  }

  render(){
    let currentPage ;
    if(this.state.curPage === "addUser"){
      currentPage = <AddForm 
        page={(page) => this.onChangePage(page)} 
        saveUser={this.saveUser}/>
    }else if(this.state.curPage === "DB") {
      currentPage = <DBPage 
        page={(page) => this.onChangePage(page)}
        update={() => this.updateTable('update')}
        db={this.state.db}/> ;
    }else if (this.state.curPage === "book") {
      currentPage = <BookPage
        page={(page) => this.onChangePage(page)}
        db={this.state.book}
        saveData={this.saveData}
        update={() => this.updateTable("book")}/>
    }
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
