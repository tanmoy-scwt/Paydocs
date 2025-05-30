import { useTheme } from '@emotion/react';
import { Box, Button, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchBox = () => {
    const theme = useTheme();

    const inputStyles = {
        flexShrink: 1,
        height: '35px',
        width: 200,
        px: 1,
        py: 0.2,
        backgroundColor: 'transparent',
        '& input': {
            backgroundColor: 'transparent'
        },
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
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                ml: 2,
                height: '48px',
                border: '1px solid #BAC2D3',
                borderRadius: '30px',
                boxShadow: '0px 3px 16px 0px #8E86AB1A',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark' ? '' : '#FFFFFF'
            }}
        >
            {/* Company Name Input */}
            <OutlinedInput
                id="input-company-name"
                placeholder="Company Name"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
                    </InputAdornment>
                }
                sx={{
                    ...inputStyles,
                    flex: 1,
                    minWidth: 0 // important to allow shrinking
                }}
            />

            {/* Location Input */}
            <OutlinedInput
                id="input-location"
                placeholder="Location"
                startAdornment={
                    <InputAdornment position="start">
                        <LocationOnIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
                    </InputAdornment>
                }
                sx={{
                    ...inputStyles,
                    flex: 1,
                    minWidth: 0,
                    pr: 0,
                    borderLeft: '1px solid #BAC2D3',
                    borderRadius: 0
                }}
            />

            <Button
                variant="contained"
                color="primary"
                sx={{
                    background: theme.palette.secondary.main,
                    '&:hover': {
                        background: theme.palette.secondary.dark
                    },
                    height: '48px',
                    textTransform: 'none',
                    borderRadius: '30px 30px 30px 30px',
                    boxShadow: 'none',
                    whiteSpace: 'nowrap', // ensures content-based width
                    px: 5
                }}
                onClick={() => {
                    console.log('Search clicked');
                }}
            >
                Find Jobs
            </Button>
        </Box>
    );
};

export default SearchBox;
