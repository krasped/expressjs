import React from "react";
import "./App.css";
import UsersPage from "../usersPage";
import AddUserPage from "../addUserPage";
import BookTitlePage from "../bookTitlePage";
import Layout from "../layout";
import BookPage from "../bookPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="addUser" element={<AddUserPage />} />
                    <Route path="bookTitles" element={<BookTitlePage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="books" element={<BookPage />} />
                    {/* <Route path="login" element={<Login />} />
                    <Route path="authors" element={<Authors />} /> */}
                </Route>
            </Routes>
        </>
    );
}
