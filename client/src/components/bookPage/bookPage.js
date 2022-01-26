import React, { useState , useEffect }from 'react';
import { Button, Dialog, DialogTitle,
        DialogContent, TextField, DialogActions, 
        TableContainer, TableHead, TableRow, Table, 
        Paper, TableCell, TableBody, Box, InputLabel, 
        MenuItem, FormControl, Select } from '@mui/material';

const BookPage = (props) => {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");
    const [titleId, setTitleId] = React.useState('');
    const [table, setTable] = useState();
    
    const handleChangeTitleId = (event) => {
        setTitleId(event.target.value);
    };

    const handleChangeCode = (event) =>{
        setCode(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAdd = (title, description) => {
        props.saveData({"code": title, "description": description}, "book");
        setCode('');
        handleClose();
    }

    const updateTable =  (book) => {
        props.update(book); //'book', 'bookTitle'
        setTable(renderTable(props.db));
    }

    const renderTable = (data) =>{ 
        if (!data)return;
        return data.map((row) => (
            <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.bookTitleId}</TableCell>
            </TableRow>
        ));
    }

    // useEffect(()=>{
    //     updateTable();
    // },[]);

    return(
        <>
            
            <Button variant="outlined" onClick={handleClickOpen}>add book</Button>
            <Button variant="outlined" onClick={() => updateTable('book')}>Update books table</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new book</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChangeCode}
                        value={code}
                        autoFocus
                        margin='dense'
                        label="title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <Box sx={{ minWidth: 300, margin: 2}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">titleId</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={titleId}
                                label="Age"
                                onChange={handleChangeTitleId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={20}>1</MenuItem>
                                <MenuItem value={30}>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {handleAdd(code); updateTable("book")}}>Save</Button>
                </DialogActions>
            </Dialog>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Code</TableCell>
                            <TableCell align="right">bookTitleId</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{ table }</TableBody> 
                </Table>
            </TableContainer> 
        </>
    );
}

export default BookPage;