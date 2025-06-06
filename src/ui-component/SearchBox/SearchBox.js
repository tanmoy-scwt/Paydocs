import { useTheme } from '@emotion/react';
import { Box, Button, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SearchBox = ({ handleSearchChange }) => {
    const [jobInput, setJobInput] = useState('');
    const [inputLocation, setInputLocation] = useState('');
    const theme = useTheme();
    const allJobs = useSelector((state) => state.allJobs);

    const [allCompanyName, setAllCompanyName] = useState([]);
    const [filterdCompanyName, setFilteredCompanyName] = useState([]);

    const [allJobsLocation, setJobsLocation] = useState([]);
    const [filteredJobsLocation, setFilteredJobsLocation] = useState([]);

    const [isCompanySearchSuggestionActive, setCompanySearchSuggetion] = useState(false);
    const [isLocationSuggestion, setLocationSuggestion] = useState(false);

    const handleCompanyTitleChange = (e) => {
        const newValue = e.target.value;
        setCompanySearchSuggetion(true);
        setJobInput(newValue);
        const filterData = allCompanyName?.filter((item) => item?.toLowerCase()?.includes(newValue?.toLowerCase()));
        setFilteredCompanyName(filterData);
        if (newValue.trim().length === 0) {
            if (inputLocation.trim().length === 0) {
                handleSearchChange(['', '']);
            } else {
                handleSearchChange(['', inputLocation]);
            }
            setFilteredCompanyName(allCompanyName);
            setCompanySearchSuggetion(false);
        }
    };

    const handleLocationChange = (e) => {
        const newValue = e.target.value;
        setLocationSuggestion(true);
        setInputLocation(newValue);
        const filterData = allJobsLocation?.filter((item) => item?.toLowerCase()?.includes(newValue?.toLowerCase()));
        setFilteredJobsLocation(filterData);
        if (newValue.trim().length === 0) {
            if (jobInput.trim().length === 0) {
                handleSearchChange(['', '']);
            } else {
                handleSearchChange([jobInput, '']);
            }
            setFilteredJobsLocation(allJobsLocation);
            setLocationSuggestion(false);
        }
    };

    useEffect(() => {
        const allJobsArr = allJobs?.allJobs?.data?.jobList?.data;
        const companyTitleNameArr =
            allJobsArr && allJobsArr.length > 0
                ? Array.from(new Set(allJobsArr.flatMap((jobProfile) => [jobProfile?.title, jobProfile?.company_name])))
                : [];
        const locationNameArr =
            allJobsArr && allJobsArr.length > 0 ? Array.from(new Set(allJobsArr.map((jobProfile) => jobProfile?.location))) : [];

        setAllCompanyName(companyTitleNameArr);
        setJobsLocation(locationNameArr);
    }, [allJobs]);

    const inputStyles = {
        height: '40px',
        backgroundColor: 'transparent',
        '& input': { backgroundColor: 'transparent' },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiInputAdornment-root': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            paddingLeft: '6px'
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                alignItems: 'center',
                width: '100%',
                gap: { xs: 1, md: 0 },
                border: '1px solid #BAC2D3',
                borderRadius: '30px',
                boxShadow: '0px 3px 16px 0px #8E86AB1A',
                p: { xs: 1, md: 0 },
                background: theme.palette.mode === 'dark' ? '' : '#FFFFFF',
                pl: { xs: 1, md: '16px' }
            }}
        >
            {/* Company Name Input */}
            <Box
                sx={{
                    flex: { md: 11, xs: '100%' },
                    minWidth: 0,
                    width: { xs: '100%', md: 'auto' },
                    paddingLeft: '0px',
                    position: 'relative'
                }}
            >
                <OutlinedInput
                    id="input-company-name"
                    placeholder="Job Title, Company Name etc."
                    value={jobInput}
                    autoComplete="off"
                    name={'searchInputCompany'}
                    onChange={handleCompanyTitleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
                        </InputAdornment>
                    }
                    fullWidth
                    sx={{ ...inputStyles, paddingLeft: '0px !important' }}
                />
                {isCompanySearchSuggestionActive && (
                    <Box
                        sx={{
                            height: '200px',
                            width: '100%',
                            position: 'absolute',
                            background: theme.palette.mode === 'dark' ? '#030C1D' : '#fafafa',
                            top: '100%',
                            left: 0,
                            zIndex: 10,
                            overflow: 'auto',
                            overflowY: 'visible',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}
                    >
                        {filterdCompanyName?.length > 0 ? (
                            filterdCompanyName?.map((item, index) => {
                                return (
                                    <Typography
                                        key={index}
                                        sx={{
                                            padding: '10px 16px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: theme.palette.mode === 'dark' ? '#091F3C' : '#f0f0f0'
                                            },
                                            fontSize: '14px'
                                        }}
                                        onClick={() => {
                                            setJobInput(item);
                                            setCompanySearchSuggetion(false);
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                );
                            })
                        ) : (
                            <Typography sx={{ padding: '10px 16px', color: 'gray', fontSize: '14px', textAlign: 'center' }}>
                                No suggestions found
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>

            {/* Location Input */}
            <Box
                sx={{
                    flex: { md: 9, xs: '100%' },
                    minWidth: 0,
                    borderLeft: { md: '1px solid #BAC2D3', xs: 'none' },
                    width: { xs: '100%', md: 'auto' },
                    position: 'relative'
                }}
            >
                <OutlinedInput
                    id="input-location"
                    placeholder="Location"
                    value={inputLocation}
                    name={'searchLocation'}
                    autoComplete="off"
                    onChange={handleLocationChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <LocationOnIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
                        </InputAdornment>
                    }
                    fullWidth
                    sx={{ ...inputStyles, paddingLeft: '0px !important' }}
                />
                {isLocationSuggestion && (
                    <Box
                        sx={{
                            height: '200px',
                            width: '100%',
                            position: 'absolute',
                            background: theme.palette.mode === 'dark' ? '#030C1D' : '#fafafa',
                            top: '100%',
                            left: 0,
                            zIndex: 10,
                            overflow: 'auto',
                            overflowY: 'visible',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}
                    >
                        {filteredJobsLocation?.length > 0 ? (
                            filteredJobsLocation?.map((item, index) => {
                                return (
                                    <Typography
                                        key={index}
                                        sx={{
                                            padding: '10px 16px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: theme.palette.mode === 'dark' ? '#091F3C' : '#f0f0f0'
                                            },
                                            fontSize: '14px'
                                        }}
                                        onClick={() => {
                                            setInputLocation(item);
                                            setLocationSuggestion(false);
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                );
                            })
                        ) : (
                            <Typography sx={{ padding: '10px 16px', color: 'gray', fontSize: '14px', textAlign: 'center' }}>
                                No suggestions found
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>

            {/* Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{
                    background: theme.palette.secondary.main,
                    '&:hover': {
                        background: theme.palette.secondary.dark
                    },
                    height: '48px',
                    borderRadius: '30px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    px: 5,
                    whiteSpace: 'nowrap',
                    width: { xs: '100%', md: 'auto' }
                }}
                onClick={() => handleSearchChange([jobInput, inputLocation])}
            >
                Find Jobs
            </Button>
        </Box>
    );
};

export default memo(SearchBox);
