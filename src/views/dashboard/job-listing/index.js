// material-ui
import { Divider, Grid, Pagination } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SearchBox from './components/SearchBox';
import { useState } from 'react';
import JobPostBoxTable from './components/JobPostBoxTable';
import FillOutApplication from './components/FillOutApp';
import { useTheme } from '@mui/system';
import JobListingSelectBox from './components/JobListingSelectBox';
import Company1 from 'assets/images/icons/logoplasan.png';

const JobListing = () => {
    const theme = useTheme();
    const categories = [
        {
            value: 'other',
            label: 'Other'
        },
        {
            value: 'other1',
            label: 'Other1'
        },
        {
            value: 'other2',
            label: 'Other2'
        },
        {
            value: 'other3',
            label: 'Other3'
        }
    ];

    const [category, setCategory] = useState('other');

    const handleDropDown = (e, setter) => {
        setter(e.target.value);
    };

    const [isFormOpen, setIsFormOpen] = useState(false);
    const handleFormOpenAction = () => {
        setIsFormOpen(!isFormOpen);
    };

    const jobDetails = {
        companylogo: Company1,
        companyName: 'Travel Desk Executive',
        companyDetails: ['TIRUFINE RESIDENCY LLP', 'Full Time', '₹25,000 - ₹45,000 a month', 'Others', 'Salt Lake, Kolkata, West Bengal'],
        companyAbout:
            ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.'
    };

    return (
        <>
            <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
                <Grid item xs={12}>
                    {!isFormOpen ? (
                        <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="Job Listing" content={false}>
                            <Grid sx={{ paddingX: '0rem', paddingY: '0rem', paddingBottom: '1.5rem' }} container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <SearchBox />
                                </Grid>
                                <Grid sx={{ paddingX: '1rem', paddingY: '.5rem' }} container spacing={gridSpacing} item xs={12} sm={6}>
                                    <JobListingSelectBox
                                        id="category"
                                        name="category"
                                        value={category}
                                        action={handleDropDown}
                                        setter={setCategory}
                                        allOptions={categories}
                                    />
                                    <JobListingSelectBox
                                        id="category"
                                        name="category"
                                        value={category}
                                        action={handleDropDown}
                                        setter={setCategory}
                                        allOptions={categories}
                                    />
                                    <JobListingSelectBox
                                        id="category"
                                        name="category"
                                        value={category}
                                        action={handleDropDown}
                                        setter={setCategory}
                                        allOptions={categories}
                                    />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid sx={{ paddingX: '0rem', paddingY: '0rem' }} container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                    <JobPostBoxTable jobDetails={jobDetails} action={handleFormOpenAction} />
                                </Grid>
                                <Grid marginBottom={'2.5rem'} item xs={12} sm={6}>
                                    <Grid container direction="column" spacing={2} alignItems="center">
                                        <Grid item xs={12}>
                                            <Pagination count={10} color="secondary" size="large" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    ) : (
                        <FillOutApplication action={handleFormOpenAction} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default JobListing;
