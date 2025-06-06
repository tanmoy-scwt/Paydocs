import React from 'react';
import { Box, Modal, Skeleton, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const JobCategoryDetailSkeleton = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Skeleton variant="text" width="60%" height={30} />
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Skeleton variant="text" width="40%" height={25} />
                    <Skeleton variant="circular" width={24} height={24} />
                </Box>

                <Skeleton variant="text" width="100%" height={40} sx={{ mt: 2 }} />

                <Skeleton variant="text" width="30%" height={25} sx={{ mt: 4 }} />
                <Skeleton variant="text" width="80%" height={25} />

                <Skeleton variant="text" width="30%" height={25} sx={{ mt: 2 }} />
                <Skeleton variant="text" width="80%" height={25} />
            </Box>
        </Modal>
    );
};

export default JobCategoryDetailSkeleton;
