import { Link, Outlet } from "react-router-dom";
import { Button, CssBaseline, AppBar, Toolbar, Container } from '@mui/material';

    export default function Layout () {
    return(
        <>
            <CssBaseline/>
            <AppBar position='relative'>
                <Toolbar>
                    <Button variant="contained">
                        <Link to="addUser">add User page</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="books" color="white">books page</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to="users">users page</Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet/>
            </Container>
        </>
    )
}