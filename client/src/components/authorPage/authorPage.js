import React, { useState , useEffect }from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, 
    DialogActions, TableContainer, TableHead, TableRow, Table, Paper, 
    TableCell, TableBody } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GotService from "../server";

const AuthorPage = () => {
    const got = new GotService();
    const dispatch = useDispatch();
    const authorTable = useSelector((state) => state.author.author);

    const [open, setOpen] = useState(false);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [message, setMesssage] = useState("add new Author");
    const [curentId, setCurentId] = useState('');

    const handleClickOpen = (message, firstField = '', secondField = '', curId = '' ) => {
        setFirst(firstField);
        setLast(secondField);
        setMesssage(message);
        setCurentId(curId);
        setOpen(true);
    };

    const handleClose = () => {
        setFirst("");
        setLast("");
        setMesssage("");
        setCurentId("");
        setOpen(false);
    };

    const handleAdd = async (first, last) => {
        await got.postResource("author", { firstName: first, lastName: last } );
        updateAuthor();
        handleClose();
    };

    const handleChange = async (id, firstName, lastName) => {
        await got.postResource("author/change", { authorId: id, firstName: firstName, lastName: lastName } );
        updateAuthor();
        handleClose();
        console.log(id);
    }

    const handleDeleteAuthor = async (id) => {
        await got.postResource("author/delete", { authorId: id } );
        updateAuthor();
    }

    const handleChangeFirst = (event) => {
        setFirst(event.target.value);
    };

    const handleChangeLast = (event) => {
        setLast(event.target.value);
    };

    const updateAuthor = async function () {
        let dbPromise = await got.getResource("author");
        let table = await renderTable(dbPromise);
        dispatch({ type: "UPDATE_AUTHOR", payload: table });   
    };

    const renderTable = async (data) => {
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
                <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleDeleteAuthor(row.id)}>
                        delete
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button variant="outlined" onClick={() => handleClickOpen('change author', row.firstName, row.lastName, row.id)}>
                        change
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

     useEffect(() => {
        updateAuthor();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={() => handleClickOpen('create new author')}>
                add author
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{message}</DialogTitle>
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
                            (curentId === '') ? handleAdd(first, last) : handleChange(curentId, first, last);
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
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">LastName</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{authorTable}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AuthorPage;
