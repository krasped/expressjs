import React, { useEffect, useState } from 'react';
import { Button, TableContainer, 
        TableHead, TableRow, Table, Paper, TableCell, TableBody } from '@mui/material';

export default function DBPage (props) {
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

    useEffect(()=>{
        updateTable();
    },[])

    return(
        <>
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