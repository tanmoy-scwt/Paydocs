import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/system';

const JobListingSelectBox = ({ id, name, value, action, allOptions, placeholder }) => {
    const theme = useTheme();

    return (
        <Grid sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FormControl fullWidth>
                <InputLabel id={`${id}-label`}>{allOptions?.length === 0 ? 'No Item' : placeholder} </InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={id}
                    disabled={allOptions.length === 0 ? true : false}
                    name={name}
                    value={value}
                    label={placeholder}
                    onChange={(e) => action(e)}
                    sx={{
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
                    }}
                >
                    {allOptions?.map((option) => (
                        <MenuItem key={option?.value} value={option?.value}>
                            {option?.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

JobListingSelectBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired,
    // setter: PropTypes.func.isRequired,
    allOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    placeholder: PropTypes.string
};

export default JobListingSelectBox;
