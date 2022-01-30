import React, { useEffect, useState } from 'react'
import './App.css';
import GotService from '../server';
import UsersPage from '../usersPage';
import AddUserPage from '../addUserPage';
import BookTitlePage from '../bookTitlePage';
import Layout from '../layout';
import BookPage from '../bookPage';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'//для работы ыс redux


export default function App () {

  // const dispatch = useDispatch();

  // const book = useSelector(state => state.book.book);
  // const bookTitle = useSelector(state => state.bookTitle.bookTitle);
  // const user = useSelector(state => state.user.user);

  // const updateBook = (book) => {
  //   dispatch({type: "UPDATE_BOOK", payload: book})
  // }
  // const updateUser = (user) => {
  //   dispatch({type: "UPDATE_USER", payload: user})
  // }
  // const updateBookTitle = (bookTitle) => {
  //   dispatch({type: "UPDATE_BOOK_TITLE", payload: bookTitle})
  // }

  const [user,setUser] = useState(null);
  const [bookTitle,setBookTitle] = useState(null);
  const [book,setBook] = useState(null);

  const got = new GotService();
  
  const updateTable = async function(url){
    let dbPromise = got.getResource(url);
    if(url === "user"){
      await dbPromise.then(user => {setUser(user); return user});
    }else if (url ==="bookTitle") {
      await dbPromise.then(book => {setBookTitle(book); return book;})
    }else if (url ==="book") {
      await dbPromise.then(book => {setBook(book); return book});
    }
  }

  const saveData = (data, url) => { 
    got.postResource(data, url);
  }

   useEffect( ()=>{
    updateTable("user");
    updateTable("book");
    updateTable("bookTitle");
  },[]);

    return(
      <>
        <Routes>
          <Route path='/'element={<Layout/>}>
            <Route path='addUser'element={
              <AddUserPage saveData={saveData}/>
            }/>
            <Route path='bookTitles'element={
              <BookTitlePage
                db={bookTitle}
                saveData={saveData}
                update={() => updateTable("bookTitle")}/>
            }/>
            <Route path='users'element={
              <UsersPage 
                update={() => updateTable("user")}
                db={user}/>
            }/>
            <Route path='books'element={
              <BookPage
                db={book}
                saveData={saveData}
                update={(book) => updateTable(book)}
                parentDb={bookTitle}/>
            }/>
          </Route>
        </Routes>
      </>
    );
}