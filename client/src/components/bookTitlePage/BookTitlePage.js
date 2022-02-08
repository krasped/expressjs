import React, { useState , useEffect }from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, 
    DialogActions, TableContainer, TableHead, TableRow, Table, Paper, 
    TableCell, TableBody, Box, InputLabel, Select, MenuItem,
    FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GotService from "../server";

const BookTitlePage = () => {
    const got = new GotService();
    const dispatch = useDispatch();
    const bookTitle = useSelector((state) => state.bookTitle.bookTitle);
    const author = useSelector((state) => state.author.author);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState(null)
    const [description, setDescription] = useState("");
    let [table, setTable] = useState();
    const [idTable, setIdTable] = useState([]);
    const [associations, setAssociations]= useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async (title, description, authorId) => {
        let curBookTitleId; 
        await got.postResource({ title: title, description: description }, "bookTitle")
            .then((result) => {
                curBookTitleId = result.id;
                // return console.log(result.id);
            });
        // got.postResource({ authorId: authorId })
        console.log(curBookTitleId);
        got.postResource({ authorId: authorId , bookTitleId: curBookTitleId}, "authorBookTitle");
        setTitle("");
        setDescription("");
        handleClose();
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeAuthorId = (event) => {
        setAuthorId(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const updateTable = async () => {
        updateBookTitle();
        setTable(await renderTable(modifyData(bookTitle, associations)));
    };

    const updateBookTitle = async function () {
        let dbPromise = got.getResource("bookTitle");
        await dbPromise.then((bookTitle) => {
            dispatch({ type: "UPDATE_BOOK_TITLE", payload: bookTitle });
        });
        let getAuthor = await got.getResource('bookTitle/author');
        if(getAuthor.length > 0) {
            setAssociations(getAuthor);
        }
    };

    const updateAuthor = async function () {
        let dbPromise = got.getResource("author");
        await dbPromise.then((author) => {
            dispatch({ type: "UPDATE_AUTHOR", payload: author });
        });
    };

    const renderAuthorId = (data) => {
        if (!data) return;
        return data.map((id) => (
            <MenuItem key={id} value={id}>
                {id}
            </MenuItem>
        ));
    };

    const getParentId = () => {
        let idArray = author.map((item) => {
            return item.id;
        });
        return idArray;
    };

    const updateAuthorId = () => {
        updateAuthor();
        setIdTable(renderAuthorId(getParentId()));
    };

    const modifyData = (data, associations) => {
        let result = data.map((book) => {
            let newBookTitle = book;
            associations.forEach((item) => {
                if(newBookTitle.id === item.bookTitleId){
                    newBookTitle.authorId = item.authorId;
                }
            });
            return newBookTitle;
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
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.authorId}</TableCell>
            </TableRow>
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
                    handleClickOpen();
                    updateAuthorId();
                }}
            >
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
                    <Box sx={{ minWidth: 300, margin: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">
                                authorId
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={!authorId ? "" : authorId}
                                label="Age"
                                onChange={handleChangeAuthorId}
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
                            handleAdd(title, description, authorId);
                            updateTable();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" onClick={updateTable}>
                Update bookTitles table
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">title</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">authorId</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{table}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookTitlePage;
