import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, 
    TableContainer, TableHead, TableRow, Table, Paper, TableCell, TableBody, 
    Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GotService from "../server";

const BookPage = () => {
    const got = new GotService();
    const dispatch = useDispatch();
    const table = useSelector((state) =>  state.book.book);
    const bookTitleId = useSelector((state) => state.bookTitle.bookTitleId);
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [titleId, setTitleId] = useState('');
    const [curentId, setCurentId] = useState('');
    const [message, setMesssage] = useState([]);

    const handleChangeTitleId = (event) => {
        setTitleId(event.target.value);
    };

    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };

    const handleClickOpen = (message, code = '', titleId = '', curId = '') => {
        setCode(code);
        setTitleId(titleId);
        setMesssage(message);
        setCurentId(curId);
        setOpen(true);
    };

    const handleClose = () => {
        setCode('');
        setTitleId('');
        setMesssage('');
        setCurentId('');
        setOpen(false);
    };

    const isEmptyReturnNull = (str) => {
        return (str==='') ? null: str;
    }

    const handleAdd = async (code, titleId) => {
        await got.postResource("book", { code: code, booksTitleId: isEmptyReturnNull(titleId) } );
        updateTable();
        handleClose();
    };

    const handleDeleteBook = async(id) =>{
        await got.postResource("book/delete", { bookId: id } );
        updateTable();
    }

    const handleChange = async (id, code, titleId) => {
        await got.postResource("book/change", { bookId: id, code: code, titleId: isEmptyReturnNull(titleId) } );
        updateTable();
        handleClose();
    }

    const updateBookTitleId = async function () {
        let dbPromise = await got.getResource("bookTitle/id");
        let idTable = await renderBookTitleId(dbPromise);   
        dispatch({ type: "UPDATE_BOOK_TITLE_ID", payload: idTable });
    };

    const modifyData = async (data) => {
        let getAuthor = await got.getResource('book/author');
        let result = data.map((book) => {
            let newBook = book;
            getAuthor.forEach((item) => {
                if(newBook.id === item.bookId){
                    newBook.authorId = item.authorId;
                }
            });
            return newBook;
        }); 
        return result
    }

    const renderTable = (data) => {
        if (!data) return;
        return data.map((row) => (
            <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.bookTitleId}</TableCell>
                <TableCell align="right">{row.authorId}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleDeleteBook(row.id)}>
                        delete
                    </Button>    
                </TableCell>
                <TableCell align="right">
                    <Button variant="outlined" onClick={() => {
                        handleClickOpen('change book', row.code, row.bookTitleId, row.id);
                        updateBookTitleId();
                    }}>
                        change
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

    const updateTable = async () => {
        let dbPromise = await got.getResource("book");
        let table = await renderTable(await modifyData(dbPromise));
        dispatch({ type: "UPDATE_BOOK", payload: table });
    };

    const renderBookTitleId = (data) => {
        if (!data) return;
        return data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
                {item.id}
            </MenuItem>
        ));
    };

    useEffect(() => {
        updateTable();
    }, []);

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => {
                    handleClickOpen('create new book');
                    updateBookTitleId();
                }}
            >
                add book
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{message}</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeCode}
                        value={code}
                        autoFocus
                        margin="dense"
                        label="code"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <Box sx={{ minWidth: 300, margin: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">
                                titleId
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={!titleId ? '' : titleId}
                                label="titleId"
                                onChange={handleChangeTitleId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {bookTitleId}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            (curentId === '') ? handleAdd(code, titleId) : handleChange(curentId, code, titleId);
                            updateTable();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Code</TableCell>
                            <TableCell align="right">booksTitleId</TableCell>
                            <TableCell align="right">authorsId</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{table}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookPage;
