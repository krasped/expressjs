import { Link, Outlet } from "react-router-dom";
import {Stack, Button, CssBaseline, AppBar, Toolbar, Container , Box } from "@mui/material";

export default function Layout() {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                    >
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
                        <Box
                            justifyContent="flex-end"
                        >
                            <Button variant="contained">
                                <Link to="login">Login</Link>
                            </Button>
                        </Box>
                    </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
