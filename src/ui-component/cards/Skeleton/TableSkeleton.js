import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';

const TableSkeleton = ({ columnCount = 6, rowCount = 7 }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <TableCell key={i}>
                                <Skeleton variant="text" width={80} height={24} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <Skeleton variant="text" width="100%" height={20} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableSkeleton;
