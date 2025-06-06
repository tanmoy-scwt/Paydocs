import React, { useState, useEffect } from 'react';
import { Box, ClickAwayListener, FormControl, Grid, Paper, Slider, Typography, FormHelperText } from '@mui/material';

import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/system';

const SalarySliderDropdown = ({
    id,
    name,
    value,
    action,
    setter,
    placeholder,
    getAriaValueText,
    min = 0,
    max = 100000,
    step = 1000,
    isError,
    helperText
}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    // Instead of default range, initialize as null if no valid value provided
    const isValidValue = Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';

    const [currentRange, setCurrentRange] = useState(isValidValue ? value : null);

    // Sync currentRange if value prop changes from outside
    useEffect(() => {
        if (isValidValue) {
            setCurrentRange(value);
        } else {
            setCurrentRange(null); // reset if invalid or empty value prop
        }
    }, [value]);

    const handleBoxClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    // Determine if user has selected a valid range different from full min-max
    const isValueSelected = Array.isArray(currentRange) && (currentRange[0] !== min || currentRange[1] !== max);

    const formatDisplayValue = () => {
        if (
            Array.isArray(currentRange) &&
            currentRange.length === 2 &&
            typeof currentRange[0] === 'number' &&
            typeof currentRange[1] === 'number'
        ) {
            return `₹${currentRange[0].toLocaleString()} - ₹${currentRange[1].toLocaleString()}`;
        }
        return placeholder || ''; // fallback jab empty ho ya invalid ho
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Grid
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    height: 'auto',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <FormControl
                    fullWidth
                    sx={{
                        height: '50px', // fixed height
                        position: 'relative',
                        borderRadius: '8px',
                        border: isError
                            ? '1px solid red'
                            : open
                            ? `1px solid ${theme.palette.primary.main}`
                            : theme.palette.mode === 'dark'
                            ? '1px solid transparent'
                            : '1px solid #ccc',
                        backgroundColor: theme.palette.mode === 'dark' ? '#051327' : '#E2E9F8',
                        '&:hover': {
                            border: isError ? '1px solid red' : open ? `1px solid ${theme.palette.primary.main}` : '1px solid #000',
                            backgroundColor: theme.palette.mode === 'dark' ? '#051327' : '#E2E9F8'
                        },
                        overflow: 'visible' // important for dropdown visibility
                    }}
                    variant="outlined"
                >
                    <Box
                        id={id}
                        name={name}
                        aria-labelledby={`${id}-label`}
                        onClick={handleBoxClick}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: '100%',
                            px: '0.5rem',
                            userSelect: 'none'
                        }}
                    >
                        <Typography variant="body1" color={!isValueSelected ? 'text.secondary' : 'text.primary'} sx={{ flexGrow: 1 }}>
                            {isValueSelected ? formatDisplayValue() : placeholder}
                        </Typography>

                        <ArrowDropDownIcon
                            sx={{
                                ml: 1,
                                position: 'relative',
                                right: 0,
                                top: 0,
                                transform: 'none'
                            }}
                        />
                    </Box>

                    {open && (
                        <Paper
                            elevation={3}
                            sx={{
                                position: 'absolute',
                                zIndex: 10,
                                top: 'calc(100% + 4px)', // position below the box with gap
                                left: 0,
                                right: 0,
                                px: 2.5,
                                py: 1,
                                backgroundColor: theme.palette.background.paper,
                                border: '1px solid #ccc',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Slider
                                id={id}
                                name={name}
                                getAriaLabel={() => placeholder}
                                // If currentRange is null, slider value = [min, max] (or min)
                                value={currentRange || [min, max]}
                                onChange={(e, newValue) => setCurrentRange(newValue)}
                                valueLabelDisplay="auto"
                                onChangeCommitted={() => action(currentRange, setter)}
                                getAriaValueText={getAriaValueText}
                                min={min}
                                max={max}
                                step={step}
                                sx={{
                                    color: '#3A64D8',
                                    width: '100%',
                                    '& .MuiSlider-thumb': {
                                        borderRadius: '50%',
                                        border: '2px solid #3A64D8',
                                        backgroundColor: '#E2E9F8'
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: '#3A64D8'
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: '#E2E9F8'
                                    },
                                    '&:hover': {
                                        color: '#2B4BB8'
                                    }
                                }}
                            />
                        </Paper>
                    )}
                </FormControl>

                {isError && helperText && (
                    <FormHelperText
                        sx={{
                            position: 'absolute',
                            bottom: '-1.8em', // position error text just below the box (adjust as needed)
                            left: 0,
                            color: 'red',
                            fontSize: '0.75rem',
                            pointerEvents: 'none', // prevent interaction with helper text
                            userSelect: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {helperText}
                    </FormHelperText>
                )}
            </Grid>
        </ClickAwayListener>
    );
};

SalarySliderDropdown.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.number),
    action: PropTypes.func.isRequired,
    setter: PropTypes.func,
    placeholder: PropTypes.string,
    getAriaValueText: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    isError: PropTypes.bool,
    helperText: PropTypes.string
};

SalarySliderDropdown.defaultProps = {
    value: null,
    placeholder: 'Select Salary Range',
    isError: false
};

export default SalarySliderDropdown;
