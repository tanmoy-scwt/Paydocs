import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmDeleteJobModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteJobModal;
