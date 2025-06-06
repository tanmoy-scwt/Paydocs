import { Box, Skeleton, Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, CardActions, Divider } from '@mui/material';

const JobPostBoxTableSkeleton = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                    padding: 2,
                    borderRadius: 1
                }}
            >
                {/* Skeleton Avatar */}
                <Avatar
                    variant="rounded"
                    sx={{
                        width: 70,
                        height: 70,
                        mt: 1,
                        background: 'transparent'
                    }}
                >
                    <Skeleton variant="circular" width={70} height={70} />
                </Avatar>

                {/* Text Content Skeleton */}
                <Box sx={{ flex: 1, mx: 2 }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Skeleton variant="text" width="60%" height={28} />
                    </Grid>

                    <Grid item>
                        <List
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                columnGap: '1rem',
                                rowGap: '0rem',
                                padding: 0
                            }}
                        >
                            {[...Array(4)].map((_, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingX: 0,
                                        paddingY: '0.5rem',
                                        width: 'auto',
                                        flexShrink: 0
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            minWidth: 'auto',
                                            marginRight: '0.5rem'
                                        }}
                                    >
                                        <Skeleton variant="circular" width={20} height={20} />
                                    </ListItemIcon>
                                    <ListItemText primary={<Skeleton variant="text" width={80} height={20} />} sx={{ margin: 0 }} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Skeleton variant="text" width="100%" height={20} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="80%" height={20} />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <CardActions sx={{ justifyContent: 'flex-start', padding: '0rem', paddingTop: '1rem' }}>
                            <Skeleton variant="text" width={100} height={30} />
                        </CardActions>
                    </Grid>
                </Box>

                {/* Button Skeleton */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', paddingY: '1rem' }}>
                    <Skeleton variant="rectangular" width={100} height={40} />
                </Box>
            </Box>

            <Divider
                sx={{
                    borderBottomWidth: '2px',
                    color: '#BDBDBD'
                }}
            />
        </>
    );
};

export default JobPostBoxTableSkeleton;
