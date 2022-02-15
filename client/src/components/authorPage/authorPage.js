import React, { useState , useEffect }from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, 
    DialogActions, TableContainer, TableHead, TableRow, Table, Paper, 
    TableCell, TableBody } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GotService from "../server";

const AuthorPage = () => {
    const got = new GotService();
    const dispatch = useDispatch();
    const author = useSelector((state) => state.author.author);

    const [open, setOpen] = useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    let [table, setTable] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (first, last) => {
        got.postResource({ firstName: first, lastName: last }, "author");
        setFirst("");
        setLast("");
        handleClose();
    };

    const handleChangeFirst = (event) => {
        setFirst(event.target.value);
    };

    const handleChangeLast = (event) => {
        setLast(event.target.value);
    };

    const updateTable = () => {
        updateAuthor();
        setTable(renderTable(author));
    };

    const updateAuthor = async function () {
        let tok = (localStorage.getItem('token'))?localStorage.getItem('token'): '';
        let dbPromise = got.getResource("author", tok);
        await dbPromise.then((author) => {
            dispatch({ type: "UPDATE_AUTHOR", payload: author });
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
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
            </TableRow>
        ));
    };

    useEffect(() => {
        updateTable();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                add author
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new author</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeFirst}
                        value={first}
                        autoFocus
                        margin="dense"
                        label="FirstName"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChangeLast}
                        value={last}
                        autoFocus
                        margin="dense"
                        label="LastName"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleAdd(first, last);
                            updateTable();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" onClick={updateTable}>
                Update authors table
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">LastName</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{table}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AuthorPage;
