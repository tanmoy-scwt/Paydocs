import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';

const ApplicantDetails = ({ applicant }) => {
    const [expanded, setExpanded] = useState(applicant?.id || false);

    const handleChange = (panelId) => (event, isExpanded) => {
        setExpanded(isExpanded ? panelId : false);
    };

    if (!applicant) return null;

    return (
        <Box my={2}>
            <Accordion
                expanded={expanded === applicant?.id}
                onChange={handleChange(applicant?.id)}
                sx={{ borderRadius: 2, boxShadow: 3, py: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {applicant?.applied_user_dtls?.first_name} {applicant?.applied_user_dtls?.last_name}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Full Name:</strong> {applicant?.applied_user_dtls?.first_name}{' '}
                        {applicant?.applied_user_dtls?.last_name || 'N/A'}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Job Title:</strong> {applicant?.job_title || 'N/A'}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Company:</strong> {applicant?.company_name || 'N/A'}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Email:</strong> {applicant?.email || 'N/A'}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Phone:</strong> {applicant?.phone || 'N/A'}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Description:</strong> {applicant?.description || 'N/A'}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Applied Date:</strong> {new Date(applicant?.created_at).toLocaleString() || 'N/A'}
                    </Typography>

                    {applicant?.supported_doc !== 'null' ? (
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontWeight="bold">Document:</Typography>
                                <IconButton
                                    component="a"
                                    href={`${process.env.REACT_APP_API_IMAGE_URL}/${applicant.supported_doc}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    color="primary"
                                    size="small"
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: '6px',
                                        px: 1.5,
                                        py: 0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    <DownloadIcon fontSize="small" />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Download Attachment
                                    </Typography>
                                </IconButton>
                            </Box>
                        </Box>
                    ) : (
                        <Typography sx={{ mt: 2 }}>
                            <strong>Document:</strong> N/A
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ApplicantDetails;
