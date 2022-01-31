import React, { useEffect } from "react";
import "./App.css";
import GotService from "../server";
import UsersPage from "../usersPage";
import AddUserPage from "../addUserPage";
import BookTitlePage from "../bookTitlePage";
import Layout from "../layout";
import BookPage from "../bookPage";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; //для работы ыс redux

export default function App() {
    const dispatch = useDispatch();

    const updateBook = (book) => {
        dispatch({ type: "UPDATE_BOOK", payload: book });
    };

    const updateUser = (user) => {
        dispatch({ type: "UPDATE_USER", payload: user });
    };

    const updateBookTitle = (bookTitle) => {
        dispatch({ type: "UPDATE_BOOK_TITLE", payload: bookTitle });
    };

    const got = new GotService();

    const updateTable = async function (url) {
        let dbPromise = got.getResource(url);
        if (url === "user") {
            await dbPromise.then((user) => {
                updateUser(user);
            });
        } else if (url === "bookTitle") {
            await dbPromise.then((book) => {
                updateBookTitle(book);
            });
        } else if (url === "book") {
            await dbPromise.then((book) => {
                updateBook(book);
            });
        }
    };

    const saveData = (data, url) => {
        got.postResource(data, url);
    };

    useEffect(() => {
        updateTable("user");
        updateTable("book");
        updateTable("bookTitle");
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="addUser"
                        element={<AddUserPage saveData={saveData} />}
                    />
                    <Route
                        path="bookTitles"
                        element={
                            <BookTitlePage
                                saveData={saveData}
                                update={() => updateTable("bookTitle")}
                            />
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <UsersPage update={() => updateTable("user")} />
                        }
                    />
                    <Route
                        path="books"
                        element={
                            <BookPage
                                saveData={saveData}
                                update={(book) => updateTable(book)}
                            />
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}
