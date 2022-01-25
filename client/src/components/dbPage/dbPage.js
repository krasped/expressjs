import React, { useState } from 'react';
import { Button, CssBaseline, AppBar, Toolbar, TableContainer, 
        TableHead, TableRow, Table, Paper, TableCell, TableBody } from '@mui/material';

export default function DBPage (props) {
    const addUser = "addUser";
    const book = "book";
    let [table, setTable] = useState();

    const updateTable =  () => {
        props.update();
        setTable(renderTable(props.db));
    }

    const renderTable = (data) =>{ 
        if (!data) return;
        data = JSON.parse(data);
        return data.map((row) => (
            <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.first_name}</TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
            </TableRow>
        ));
    }

    return(
        <>
            <CssBaseline/>
            <AppBar position='relative'>
                <Toolbar>
                    <Button variant="contained" onClick={() =>props.page(addUser)}>add User page</Button>
                    <Button variant="contained" onClick={() => props.page(book)}>books page</Button>
                </Toolbar>
            </AppBar>
            <Button variant="outlined" onClick={updateTable}>Update users table</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Firstname</TableCell>
                            <TableCell align="right">Lastname</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{ table }</TableBody> 
                </Table>
            </TableContainer> 
        </>
    )
}