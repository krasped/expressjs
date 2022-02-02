import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, 
    TableContainer, TableHead, TableRow, Table, Paper, TableCell, TableBody, 
    Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GotService from "../server";

const BookPage = () => {
    const got = new GotService();
    const dispatch = useDispatch();
    const book = useSelector((state) =>  state.book.book);
    const bookTitle = useSelector((state) => state.bookTitle.bookTitle);

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [titleId, setTitleId] = React.useState(null);
    const [table, setTable] = useState();
    const [idTable, setIdTable] = useState([]);

    const handleChangeTitleId = (event) => {
        setTitleId(event.target.value);
    };

    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (code, titleId) => {
        got.postResource({ code: code, booksTitleId: titleId }, "book");
        setCode("");
        setTitleId(null);
        handleClose();
        updateTable();
    };

    const updateBookTitle = async function () {
        let dbPromise = got.getResource("bookTitle");
        await dbPromise.then((bookTitle) => {
            dispatch({ type: "UPDATE_BOOK_TITLE", payload: bookTitle });
        });
    };

    const updateBook = async function () {
        let dbPromise =  got.getResource("book");
        await dbPromise.then((book) => {
            dispatch({ type: "UPDATE_BOOK", payload: book });
        });
    };

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
                <TableCell align="right">{row.booksTitleId}</TableCell>
            </TableRow>
        ));
    };

    const updateTable = async () => {
        updateBook(); //'book', 'bookTitle'
        setTable(await renderTable(book));
    };

    const renderBookTitleId = (data) => {
        if (!data) return;
        return data.map((id) => (
            <MenuItem key={id} value={id}>
                {id}
            </MenuItem>
        ));
    };

    const getParentId = () => {
        let idArray = bookTitle.map((item) => {
            return item.id;
        });
        return idArray;
    };

    const updateBookTitleId = () => {
        updateBookTitle();
        setIdTable(renderBookTitleId(getParentId()));
    };

    useEffect(() => {
        updateTable();
    }, []);

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => {
                    handleClickOpen();
                    updateBookTitleId();
                }}
            >
                add book
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    updateTable();
                }}
            >
                Update books table
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new book</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeCode}
                        value={code}
                        autoFocus
                        margin="dense"
                        label="title"
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
                                value={!titleId ? "" : titleId}
                                label="Age"
                                onChange={handleChangeTitleId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {idTable}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleAdd(code, titleId);
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
                        </TableRow>
                    </TableHead>
                    <TableBody>{table}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookPage;
