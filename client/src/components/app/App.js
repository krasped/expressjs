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
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.autorization.isLoggedIn);

    function isLogined (children) { 
        if(!localStorage.getItem('isLogged')){
            return <Navigate to='/login' replace />;
        } else return children;
    }

    useEffect(() => {
        dispatch({ 
        type: "AUTORIZATION_STATUS", 
        payload: (localStorage.getItem('isLogged'))?localStorage.getItem('isLogged'): false });
    },[isLoggedIn]);

    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<PublicPage />} />
                    <Route path="login" element={<LoginPage />} /> 
                    <Route path="bookTitles" element={isLogined( <BookTitlePage />)} />  
                    <Route path="users" element={isLogined( <UsersPage />)} />
                    <Route path="books" element={isLogined( <BookPage />)} />
                    <Route path="authors" element={isLogined( <AuthorPage />)} />
                    <Route path="*" element={<PublicPage />} />  
                </Route>
            </Routes>
        </>
    );
}
