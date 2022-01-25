import React, { useEffect, useState } from 'react'
import './App.css';
import GotService from '../server';
import DBPage from '../dbPage';
import AddForm from '../addForm';
import BookPage from '../bookPage';
import { Button } from '@mui/material';


export default function App () {
  const [user,setUser] = useState(null);
  const [book,setBook] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [curPage, setCurPage] = useState('user'); //addUser, DB, book
  const [render, setRender] = useState(null);
  const got = new GotService();
  
  const updateTable = async function(url){
    let dbPromise = got.getResource(url);
    if(url === "update"){
      await dbPromise.then(user => setUser(user))
    }else if (url ==="book") {
      await dbPromise.then(book => setBook(book))
    }
  }

  const updateNumber = () => {
    let num =  got.getResource();
    num.then((result) => {
      setRandomNumber(result) ;
      alert(randomNumber);
    })
  }

  function onChangePage(page){
    setCurPage(page);
  }

  const saveData = (data, url) => { 
    got.postResource(data, url);
  }

  const renderPage = (Page) => {
    switch(Page){
      case "user": 
        setRender(
          <DBPage 
            page={(page) => onChangePage(page)}
            update={() => updateTable('update')}
            db={user}/>
        );
        break;
      case "book": 
        setRender(
          <BookPage
            page={(page) => onChangePage(page)}
            db={book}
            saveData={saveData}
            update={() => updateTable("book")}/>
        );
        break;
      case "addUser": 
        setRender(
          <AddForm 
            page={(page) => onChangePage(page)} 
            saveData={saveData}/>
        );
        break; 
      default : 
        setRender(
          <DBPage 
            page={(page) => onChangePage(page)}
            update={() => updateTable('update')}
            db={user}/>
        );
    }
  }

  useEffect(() => renderPage(curPage), [curPage, user, book]);

    return(
      <>
        <Button variant="contained" onClick={updateNumber}>get random number</Button>
        {render}
      </>
    );
}