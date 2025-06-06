import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

const statusLabelMap = {
    0: 'Pending',
    1: 'Approved',
    2: 'Disapproved'
};

const ReusableTable = ({
    columns = [],
    rows = [],
    onView = null,
    onDelete = null,
    formatDateFields = [],
    emptyText = 'No data available'
}) => {
    const theme = useTheme();

    const actionColumn = {
        id: '__actions__',
        label: 'Actions',
        render: (_, row) => (
            <Stack direction="row" spacing={1} justifyContent="center">
                {onView && (
                    <Button
                        onClick={() => onView(row?.jobID)}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                            minWidth: '36px',
                            padding: '4px',
                            background: theme.palette.secondary.main,
                            '&:hover': {
                                background: theme.palette.secondary.dark
                            }
                        }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </Button>
                )}
                {onDelete && (
                    <Button
                        onClick={() => onDelete(row?.jobID)}
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{
                            minWidth: '36px',
                            padding: '4px'
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </Button>
                )}
            </Stack>
        )
    };

    const finalColumns = [...columns, (onView || onDelete) && actionColumn].filter(Boolean);

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {finalColumns.map((col) => (
                                <TableCell sx={{ textAlign: 'center' }} key={col?.id}>
                                    <strong>{col?.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.length > 0 ? (
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    {finalColumns.map((col) => {
                                        const value = row?.[col?.id];

                                        let cellContent;

                                        if (col?.render) {
                                            cellContent = col.render(value, row);
                                        } else if (formatDateFields?.includes(col?.id)) {
                                            cellContent = formatDate(value);
                                        } else if (col?.id === 'status') {
                                            cellContent = statusLabelMap?.[value] ?? 'N/A';
                                        } else {
                                            cellContent = value !== null && value !== undefined && value !== '' ? value : 'N/A';
                                        }

                                        return (
                                            <TableCell sx={{ textAlign: 'center' }} key={col?.id}>
                                                {cellContent}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={finalColumns?.length} align="center">
                                    <Typography variant="body2">{emptyText}</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ReusableTable;
