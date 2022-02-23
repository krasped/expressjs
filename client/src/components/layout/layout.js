import { Link, Outlet } from "react-router-dom";
import {Stack, Button, CssBaseline, AppBar, Toolbar, Container , Box } from "@mui/material";
import { useSelector } from 'react-redux';

export default function Layout() {

    const isLoggedIn = useSelector((state) => state.autorization.isLoggedIn);
    const email = useSelector((state) => state.autorization.userEmail);

    function renderButtons(isLoggedIn){
        if(isLoggedIn){
            return(
                <Box>
                    <Button variant="contained">
                    <Link to="bookTitles" color="white">
                        book Titles page
                    </Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="users">users page</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="books">books page</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="authors">authors page</Link>
                    </Button> 
                </Box>
            )
        } else return null;
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar >
                    <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                    >
                        {renderButtons(isLoggedIn)}
                        <Box
                            justifyContent="flex-end"
                        >
                            <Button variant="contained">
                                <Link to="login">Login</Link>
                            </Button>
                        </Box>
                    </Stack>
                    </Box>
                    <Box justifyContent="flex-end">
                        {email?` email: ${email}`:null}
                    </Box>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
