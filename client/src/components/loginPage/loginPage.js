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

const BookTitlePage = (props) => {
    const got = new GotService();
    const dispatch = useDispatch();
    const bookTitle = useSelector((state) => state.bookTitle.bookTitle);

    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [registrationLogin, setRegistrationLogin] = useState("");
    const [registrationPassword, setRegistrationPassword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (title, description) => {
        got.postResource(
            { title: title, description: description },
            "bookTitle",
        );
        
        handleClose();
    };

    const handleChangeRegistrationLogin = (event) => {
        setRegistrationLogin(event.target.value);
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

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                registration
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>create accaunt</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeRegistrationLogin}
                        value={registrationLogin}
                        autoFocus
                        margin="dense"
                        label="login"
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
                            handleAdd(registrationLogin, registrationPassword);
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
                        handleAdd(login, password);
                    }}
                >
                    Login
                </Button>
            </Container>
        </>
    );
};

export default BookTitlePage;
