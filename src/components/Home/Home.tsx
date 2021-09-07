import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    LinearProgress,
    Typography,
    Box,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Voter } from 'types';
import { getTwitterLinks } from './homeAPI';
import { getUniVoters, selectStatus, selectUniVoters } from './homeSlice';
import { useStyles } from './homeStyle';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'address', label: 'Rank', minWidth: 170 },
    { id: 'power', label: 'Total Votes', minWidth: 20 },
];

export default function Home() {
    const classes = useStyles();

    const uniVoters = useAppSelector(selectUniVoters);
    const votersStatus = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();

    const handleClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        getTwitterLinks().then((data) => console.log(data));
        dispatch(getUniVoters());
    }, [dispatch]);

    return (
        <Paper className={classes.root}>
            {votersStatus === 'idle' ? (
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uniVoters.map((row: Voter, index: number) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.address}
                                    >
                                        <TableCell
                                            key={`address-${row.address}`}
                                        >
                                            <Box className={classes.row}>
                                                <Typography>
                                                    {index + 1}
                                                </Typography>
                                                <Link
                                                    to={`/details/${row.address}`}
                                                    className={classes.link}
                                                >
                                                    {row.address}
                                                </Link>
                                            </Box>
                                        </TableCell>
                                        <TableCell key={`power-${row.address}`}>
                                            {row.power}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <LinearProgress />
            )}
        </Paper>
    );
}
