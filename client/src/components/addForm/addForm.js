import React, { useState } from 'react'
import { Button, CssBaseline, Container, 
        AppBar, Toolbar, TextField} from '@mui/material';

export default function AddForm(props) {
    const book = "book";
    const user = "user";
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

    const handleAdd = (firstName, lastName) => {
        props.saveData({"first": firstName, "last": lastName});
        setFirst('');
        setLast('');
    }

    const handleChangeFirst = (event) =>{
        setFirst(event.target.value);
    }

    const handleChangeLast = (event) =>{
        setLast(event.target.value);
    }

    return(
        <>
            <CssBaseline/>
            <AppBar position='relative'>
                <Toolbar>
                    <Button variant="contained" onClick={() =>props.page(user)}>Users page</Button>
                    <Button variant="contained" onClick={() => props.page(book)}>books page</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <TextField
                    onChange={handleChangeFirst}
                    value={first}
                    autoFocus
                    margin='dense'
                    label="First name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    onChange={handleChangeLast}
                    value={last}
                    autoFocus
                    margin='dense'
                    label="Last name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <Button onClick={() => {handleAdd(first, last)}}>Save</Button>
            </Container>
        </>
    )  
}