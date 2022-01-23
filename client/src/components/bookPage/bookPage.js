import React, { useEffect, useState }from 'react';
import {Typography, Button, CssBaseline,
        AppBar, Toolbar, Dialog, DialogTitle,
        DialogContent, TextField, DialogActions } from '@mui/material';

const BookPage = (props) => {
    const addUser = "addUser";
    const DB = "DB";
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    let [table, setTable] = useState("");
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleAdd = (title, description) => {
        props.saveData({"title": title, "description": description}, "book");
        handleClose();// могут быть вопросы
    }

    const handleChangeTitle = (event) =>{
        setTitle(event.target.value);
    }

    const handleChangeDescription = (event) =>{
        setDescription(event.target.value);
    }

    const updateTable =  () => {
        props.update();
        setTable(renderTable(props.db));
    }
    

    const renderTable = (data) =>{ 
        if (!data)return;
        console.log(data);
        // data = JSON.parse(data);
            let res = data.map(function(item,i) {
                return (
                    <p key={item.id}>
                    <span> user id: {item.id}</span>
                    <span> title: {item.title}</span>
                    <span> description: {item.description}</span>
                    </p>
                )
            });
        return(
            <div>
                {res}
            </div>
        ) 
    }
    return(
        <>
            <CssBaseline/>
            <AppBar position='relative'>
                <Toolbar>
                    <Button variant="contained" onClick={() =>props.page(DB)}>return to DBUsers page</Button>
                    <Button variant="contained" onClick={() => props.page(addUser)}>return to addUser page</Button>
                </Toolbar>
            </AppBar>

            <Button variant="outlined" onClick={handleClickOpen}>
                Add book
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new book</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeTitle}
                        value={title}
                        autoFocus
                        margin='dense'
                        label="title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChangeDescription}
                        value={description}
                        autoFocus
                        margin='dense'
                        label="description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {handleAdd(title, description)}}>Add</Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" onClick={updateTable}>Update books table</Button>
            <div>
                {table}
            </div>
        </>
    )
}

export default BookPage;