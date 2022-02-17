 import React, { useEffect, useState } from 'react';
import { Button, TableContainer, TableHead, TableRow, 
    Table, Paper, TableCell, TableBody } from '@mui/material';
import { useSelector, useDispatch} from 'react-redux';
import GotService from "../server";

export default function UsersPage() {
    const got = new GotService();
    const dispatch = useDispatch();
    const userTable = useSelector((state) => state.user.user);

    const updateUser = async function () {
        let dbPromise = await got.getResource("user");
        let table = await renderTable(dbPromise);
        dispatch({ type: "UPDATE_USER", payload: table });
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
        updateUser();
    }, []);

    return (
        <>
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
                    <TableBody>{userTable}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
