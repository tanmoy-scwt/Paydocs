import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const ConfirmDeleteJobModal = ({ open, onClose, onConfirm, isDeleting }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Typography variant="h3" align="center" fontWeight="bold">
                    Confirm Deletion
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                    <Typography align="center">Are you sure you want to delete this job?</Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: '1rem' }}>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button disabled={isDeleting} onClick={onConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteJobModal;
