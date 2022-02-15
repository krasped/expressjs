import React, { useEffect, useState } from 'react';
import { Button, TableContainer, TableHead, TableRow, 
    Table, Paper, TableCell, TableBody } from '@mui/material';
import { useSelector, useDispatch} from 'react-redux';
import GotService from "../server";

export default function UsersPage() {
    const got = new GotService();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    let [table, setTable] = useState();

    const updateUser = async function () {
        let dbPromise =  got.getResource("user");
        await dbPromise.then((user) => {
            dispatch({ type: "UPDATE_USER", payload: user });
        });
    };

    const updateTable = () => {
        updateUser();
        setTable(renderTable(user));
    };

    const renderTable = (data) => {
        if (!data) return;
        return data.map((row) => (
            <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
            </TableRow>
        ));
    };

    useEffect(() => {
        updateTable();
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={updateTable}>
                Update users table
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Firstname</TableCell>
                            <TableCell align="right">Lastname</TableCell>
                            <TableCell align="right">Emali</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{table}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
