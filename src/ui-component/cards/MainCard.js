import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Skeleton, Typography } from '@mui/material';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = React.forwardRef(
    (
        {
            border = false,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            isLoading = false,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        // console.log(isLoading, 'isLoading');

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[300] + 98,
                    ':hover': {
                        boxShadow: boxShadow
                            ? shadow ||
                              (theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
                            : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {/* {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />} */}
                {!darkTitle && title && (
                    <CardHeader
                        sx={headerSX}
                        title={isLoading ? <Skeleton variant="text" width={150} height={30} /> : title}
                        action={!isLoading ? secondary : null}
                    />
                )}

                {darkTitle && title && (
                    // <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                    <CardHeader
                        sx={headerSX}
                        title={
                            isLoading ? <Skeleton variant="text" width={180} height={32} /> : <Typography variant="h3">{title}</Typography>
                        }
                        action={isLoading ? null : secondary}
                    />
                )}

                {/* content & header divider */}
                {/* {title && <Divider />} */}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    isLoading: PropTypes.bool
};

export default MainCard;
