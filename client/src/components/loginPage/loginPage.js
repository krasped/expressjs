import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GotService from "../server";

const BookTitlePage = () => {
    const got = new GotService();
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [registrationFirstName, setRegistrationFirstName] = useState("");
    const [registrationLastName, setRegistrationLastName] = useState("");
    const [registrationEmail, setRegistrationEmail] = useState("");
    const [registrationPassword, setRegistrationPassword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (firstName, lastName, email, password) => {
        got.postResource(
            { first: firstName, last: lastName, email: email, password: password },
            "user",
        );
        setRegistrationFirstName('');
        setRegistrationLastName('');
        setRegistrationEmail('');
        setRegistrationPassword('');
        handleClose();
    };

    const handleChangeRegistrationFirastName = (event) => {
        setRegistrationFirstName(event.target.value);
    };

    const handleChangeRegistrationLastName = (event) => {
        setRegistrationLastName(event.target.value);
    };

    const handleChangeRegistrationEmail = (event) => {
        setRegistrationEmail(event.target.value);
    };

    const handleChangeRegistrationPassword = (event) => {
        setRegistrationPassword(event.target.value);
    };

    useEffect(() => {}, []);

    const handleChangeLoginLogin = (event) => {
        setLogin(event.target.value);
    };

    const handleChangeLoginPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (login, password) => {
        const getToken = await got.postResource(
            { login: login, password: password },
            "login",
        );
        if (getToken !== null){
            localStorage.setItem('token', getToken);
        } else localStorage.removeItem('token');
        setLogin('');
        setPassword('');
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                registration
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>create accaunt</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeRegistrationFirastName}
                        value={registrationFirstName}
                        autoFocus
                        margin="dense"
                        label="firstName"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChangeRegistrationLastName}
                        value={registrationLastName}
                        autoFocus
                        margin="dense"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChangeRegistrationEmail}
                        value={registrationEmail}
                        autoFocus
                        margin="dense"
                        label="email"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChangeRegistrationPassword}
                        value={registrationPassword}
                        autoFocus
                        margin="dense"
                        label="password"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleAdd(registrationFirstName, registrationLastName, registrationEmail, registrationPassword);
                        }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            <Container maxWidth="sm">
                <TextField
                    onChange={handleChangeLoginLogin}
                    value={login}
                    autoFocus
                    margin="dense"
                    label="login"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    onChange={handleChangeLoginPassword}
                    value={password}
                    autoFocus
                    margin="dense"
                    label="password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleLogin(login, password);
                    }}
                >
                    Login
                </Button>
            </Container>
        </>
    );
};

export default BookTitlePage;
