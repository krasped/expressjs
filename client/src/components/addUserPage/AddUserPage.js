import React, { useState } from 'react'
import { Button, TextField, Container} from '@mui/material';

export default function AddUserPage(props) {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

    const handleAdd = (firstName, lastName) => {
        props.saveData({"first": firstName, "last": lastName}, "user");
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