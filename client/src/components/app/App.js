import React, { useEffect } from "react";
import "./App.css";
import UsersPage from "../usersPage";
import BookTitlePage from "../bookTitlePage";
import Layout from "../layout";
import BookPage from "../bookPage";
import LoginPage from "../loginPage";
import AuthorPage from "../authorPage";
import PublicPage from '../publicPage'
import {Navigate, Routes, Route} from "react-router-dom";
import { useDispatch } from 'react-redux';

export default function App() {
    const dispatch = useDispatch();
    let isLoggedIn = localStorage.getItem('isLogged');
    
    function isLogined (isLogged, children) {
        console.log(typeof isLogged);
        if(!isLogged){
            console.log('ok');
            return <Navigate to='/login' replace />;
        } else return children;
    }

    useEffect(() => {
        dispatch({ 
        type: "AUTORIZATION_STATUS", 
        payload: (localStorage.getItem('isLogged'))?localStorage.getItem('isLogged'): false });
    },[]);

    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    {/* <Route path="/" element={<PublicPage />} /> */}
                    <Route path="login" element={<LoginPage />} /> 
                    <Route path="bookTitles" element={isLogined( isLoggedIn, <BookTitlePage />)} />  
                    <Route path="users" element={isLogined( isLoggedIn, <UsersPage />)} />
                    <Route path="books" element={isLogined( isLoggedIn, <BookPage />)} />
                    <Route path="authors" element={isLogined( isLoggedIn, <AuthorPage />)} />
                    <Route path="*" element={<LoginPage />} />  
                </Route>
            </Routes>
        </>
    );
}
