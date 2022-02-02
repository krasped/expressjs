import React, { useState , useEffect }from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, 
    DialogActions, TableContainer, TableHead, TableRow, Table, Paper, 
    TableCell, TableBody } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GotService from "../server";

const BookTitlePage = (props) => {
    const got = new GotService();
    const dispatch = useDispatch();
    const bookTitle = useSelector((state) => state.bookTitle.bookTitle);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    let [table, setTable] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (title, description) => {
        got.postResource({ title: title, description: description }, "bookTitle");
        setTitle("");
        setDescription("");
        handleClose();
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const updateTable = () => {
        updateBookTitle();
        setTable(renderTable(bookTitle));
    };

    const updateBookTitle = async function () {
        let dbPromise = got.getResource("bookTitle");
        await dbPromise.then((bookTitle) => {
            dispatch({ type: "UPDATE_BOOK_TITLE", payload: bookTitle });
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
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
            </TableRow>
        ));
    };

    useEffect(() => {
        updateTable();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                add book title
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new book</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeTitle}
                        value={title}
                        autoFocus
                        margin="dense"
                        label="title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChangeDescription}
                        value={description}
                        autoFocus
                        margin="dense"
                        label="description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleAdd(title, description);
                            updateTable();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" onClick={updateTable}>
                Update books table
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">title</TableCell>
                            <TableCell align="right">description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{table}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookTitlePage;
