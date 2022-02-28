import React, { useState , useEffect }from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, 
    DialogActions, TableContainer, TableHead, TableRow, Table, Paper, 
    TableCell, TableBody, Box, InputLabel, Select, MenuItem,
    FormControl, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GotService from "../server";

const BookTitlePage = () => {
    const got = new GotService();
    const dispatch = useDispatch();
    const table = useSelector((state) => state.bookTitle.bookTitle);
    const authorIdTable = useSelector((state) => state.author.authorId);
    const covers = useSelector((state) => state.cover.covers);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [description, setDescription] = useState("");
    const [cover, setCover] = useState("");
    const [message, setMesssage] = useState("");
    const [curentId, setCurentId] = useState("");
    const [prevAuthorId, setPrevAuthorId] = useState(null);

    const handleClickOpen = (
        message,
        title = "",
        description = "",
        curId = "",
        prevAuthorId = null,
    ) => {
        setTitle(title);
        setDescription(description);
        setMesssage(message);
        setCurentId(curId);
        setPrevAuthorId(prevAuthorId);
        setAuthorId(prevAuthorId);
        setOpen(true);
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setMesssage("");
        setCurentId("");
        setPrevAuthorId(null);
        setCover("");
        setOpen(false);
    };

    const isEmptyReturnNull = (str) => {
        return (str==='') ? null: str;
    }

    const handleAdd = async (title, description, authorId, cover) => {
        let curBookTitleId;
        await got
            .postResource("bookTitle", {
                title: title,
                description: description,
            })
            .then((result) => {
                curBookTitleId = result.id;
            });
        // got.postResource({ authorId: authorId })
        if (authorId !== null) {
            await got.postResource("authorBookTitle", {
                authorId: authorId,
                bookTitleId: curBookTitleId,
            });
        }

        dispatch({
            type: "UPDATE_COVERS",
            payload: { id: curentId, src: cover },
        });
        updateBookTitle();
        handleClose();
    };

    const handleChange = async (
        curId,
        title,
        description,
        authorId,
        prevAuthorId,
        cover,
    ) => {
        if (prevAuthorId === null && authorId !== null) {
            console.log(1);
            await got.postResource("authorBookTitle", {
                authorId: authorId,
                bookTitleId: curId,
            });
        }
        if (prevAuthorId !== null && authorId === null) {
            console.log(2);
            await got.postResource("authorBookTitle/delete", {
                authorId: prevAuthorId,
                bookTitleId: curId,
            });
        }
        if (prevAuthorId !== null && authorId !== null) {
            console.log(3);
            await got.postResource("authorBookTitle/change", {
                authorId: isEmptyReturnNull(authorId),
                prevAuthorId: prevAuthorId,
                bookTitleId: curId,
            });
        }
        console.log(4);
        await got.postResource("bookTitle/change", {
            bookTitleId: curId,
            title: title,
            description: description,
        });
        dispatch({ type: "UPDATE_COVERS", payload: { id: curId, src: cover } });
        updateBookTitle();
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

    const handleChangeCover = (event, curId) => {
        if (!event) {
            return;
        }

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (function () {
            return function (e) {
                setCover(e.target.result);
            };
        })();

        reader.readAsDataURL(file);
    };

    const updateBookTitle = async function () {
        let dbPromise = await got.getResource("bookTitle");
        let table = await renderTable(await modifyData(dbPromise));
        dispatch({ type: "UPDATE_BOOK_TITLE", payload: table });
    };

    const updateAuthorId = async function () {
        let dbPromise = await got.getResource("author/id");
        let idTable = await renderAuthorId(dbPromise);
        dispatch({ type: "UPDATE_AUTHOR_ID", payload: idTable });
    };

    const renderAuthorId = (data) => {
        if (!data) return;
        return data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
                {item.id}
            </MenuItem>
        ));
    };

    const modifyData = async (data) => {
        let getAuthor = await got.getResource("authorBookTitle");
        let result = data.map((book) => {
            let newBookTitle = book;
            getAuthor.forEach((item) => {
                if (newBookTitle.id === item.bookTitleId) {
                    newBookTitle.authorId = item.authorId;
                }
            });
            return newBookTitle;
        });
        return result;
    };

    const handleDeleteBookTitle = async (id, prevAuthorId) => {
        if (prevAuthorId) {
            await got.postResource("authorBookTitle/delete", {
                prevAuthorId: prevAuthorId,
                bookTitleId: id,
            });
        }
        await got.postResource("bookTitle/delete", { bookTitleId: id });

        updateBookTitle();
    };

    const renderBookCover = (curId, covers) => {
        let img = covers.find((item) => item.id == curId);
        if (!img) {
            img = "";
        }
        return <Avatar alt="Cover" variant="square" src={img.src}></Avatar>;
    };

    const renderTable = (data) => {
        if (!data) return;
        return data.map((row) => (
            <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="right">
                    {renderBookCover(row.id, covers)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.authorId}</TableCell>

                <TableCell align="right">
                    <Button
                        variant="outlined"
                        onClick={() =>
                            handleDeleteBookTitle(row.id, row.authorId)
                        }
                    >
                        delete
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClickOpen(
                                "change bookTitle",
                                row.title,
                                row.description,
                                row.id,
                                row.authorId,
                            );
                            updateAuthorId();
                        }}
                    >
                        change
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

    useEffect(() => {
        updateBookTitle();
    }, []);

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => {
                    handleClickOpen("new bookTitle");
                    updateBookTitle();
                    updateAuthorId();
                }}
            >
                add book title
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{message}</DialogTitle>
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
                                label="authorId"
                                onChange={handleChangeAuthorId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {authorIdTable}
                            </Select>
                        </FormControl>
                    </Box>
                    {cover === "" ? (
                        renderBookCover(curentId, covers)
                    ) : (
                        <Avatar
                            alt="Cover"
                            variant="square"
                            src={cover}
                        ></Avatar>
                    )}
                    <Button variant="contained" component="label">
                        Upload File
                        <input
                            accept="image/*"
                            onChange={(e) => handleChangeCover(e, curentId)}
                            type="file"
                            hidden
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            curentId === ""
                                ? handleAdd(title, description, authorId, cover)
                                : handleChange(
                                      curentId,
                                      title,
                                      description,
                                      authorId,
                                      prevAuthorId,
                                      cover,
                                  );
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
                            <TableCell></TableCell>
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
