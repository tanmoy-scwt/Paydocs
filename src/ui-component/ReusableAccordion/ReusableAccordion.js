import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ReusableAccordion = ({ data = [] }) => {
    const [expandedParent, setExpandedParent] = useState(0);
    const [expandedChild, setExpandedChild] = useState({});

    const handleParentChange = (index) => (_, isExpanded) => {
        setExpandedParent(isExpanded ? index : null);
    };

    const handleChildChange = (parentIndex, childIndex) => (_, isExpanded) => {
        setExpandedChild((prev) => ({
            ...prev,
            [parentIndex]: isExpanded ? childIndex : null
        }));
    };

    return (
        <Box>
            {data.map((item, parentIndex) => (
                <Accordion key={parentIndex} expanded={expandedParent === parentIndex} onChange={handleParentChange(parentIndex)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={600}>
                            {item.job_title} - {item.company_name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Accordion expanded={expandedChild[parentIndex] === 0} onChange={handleChildChange(parentIndex, 0)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Job Info</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <strong>Company:</strong> {item.company_name}
                                </Typography>
                                <Typography>
                                    <strong>Job Title:</strong> {item.job_title}
                                </Typography>
                                <Typography>
                                    <strong>Description:</strong> {item.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expandedChild[parentIndex] === 1} onChange={handleChildChange(parentIndex, 1)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Contact Info</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <strong>Email:</strong> {item.email}
                                </Typography>
                                <Typography>
                                    <strong>Phone:</strong> {item.phone}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expandedChild[parentIndex] === 2} onChange={handleChildChange(parentIndex, 2)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Supporting Document</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <a href={`/${item.supported_doc}`} target="_blank" rel="noopener noreferrer">
                                    View Document
                                </a>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expandedChild[parentIndex] === 3} onChange={handleChildChange(parentIndex, 3)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Timestamps</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <strong>Created:</strong> {new Date(item.created_at).toLocaleString()}
                                </Typography>
                                <Typography>
                                    <strong>Updated:</strong> {new Date(item.updated_at).toLocaleString()}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </AccordionDetails>
                    <Divider />
                </Accordion>
            ))}
        </Box>
    );
};

export default ReusableAccordion;
