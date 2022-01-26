import React, { useState } from 'react'
import './App.css';
import GotService from '../server';
import DBPage from '../dbPage';
import AddForm from '../addForm';
import BookPage from '../bookPage';
import Layout from '../layout';
import { Routes, Route } from "react-router-dom";


export default function App () {
  const [user,setUser] = useState(null);
  const [book,setBook] = useState(null);
  const got = new GotService();
  
  const updateTable = async function(url){
    let dbPromise = got.getResource(url);
    if(url === "update"){
      await dbPromise.then(user => setUser(user))
    }else if (url ==="book") {
      await dbPromise.then(book => setBook(book))
    }
  }

  const saveData = (data, url) => { 
    got.postResource(data, url);
  }

    return(
      <>
        <Routes>
          <Route path='/'element={<Layout/>}>
            <Route path='addUser'element={
              <AddForm saveData={saveData}/>
            }/>
            <Route path='books'element={
              <BookPage
                db={book}
                saveData={saveData}
                update={() => updateTable("book")}/>
            }/>
            <Route path='users'element={
              <DBPage 
                update={() => updateTable('update')}
                db={user}/>
            }/>
          </Route>
        </Routes>
      </>
    );
}