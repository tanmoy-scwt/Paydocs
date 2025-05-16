import { Grid, TextField, MenuItem } from '@mui/material';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/system';

const JobListingSelectBox = ({ id, name, value, action, allOptions, setter, placeholder }) => {
    const theme = useTheme();

    return (
        <Grid item sx={{ flex: '1' }}>
            <TextField
                select
                fullWidth
                id={id}
                name={name}
                value={value}
                displayEmpty
                onChange={(e) => {
                    action(e, setter);
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.mode === 'dark' ? '' : '#E2E9F8',
                        '& .MuiSelect-select': {
                            backgroundColor: 'transparent'
                        },
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? '' : '#E2E9F8'
                        },
                        '&.Mui-focused': {
                            backgroundColor: theme.palette.mode === 'dark' ? '' : '#E2E9F8'
                        }
                    }
                }}
            >
                <MenuItem disabled value="">
                    {placeholder}
                </MenuItem>
                {allOptions?.map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                        {option?.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    );
};

JobListingSelectBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired,
    setter: PropTypes.func.isRequired,
    allOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    placeholder: PropTypes.string
};

export default memo(JobListingSelectBox);
