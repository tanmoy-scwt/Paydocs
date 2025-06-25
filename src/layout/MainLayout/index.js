import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Divider, Grid, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
// import Sidebar from './Sidebar';
import HorizontalBar from './HorizontalBar';
import Customization from '../Customization';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

import navigation from 'menu-items';
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';

// assets
import { IconChevronRight } from '@tabler/icons';
import MenuList from './MenuList';

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { drawerType, container, layout } = useConfig();

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, layout }) => ({
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'relative',
        top: drawerOpen ? '90px' : '50px',
        ...(!open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter + 200
            }),
            [theme.breakpoints.up('md')]: {
                marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '20px',
                width: `calc(100% - ${drawerWidth}px)`,
                marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
            }
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter + 200
            }),
            marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '20px' : 0,
            // marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
            marginTop: 180,
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.up('md')]: {
                marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
            }
        }),
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            padding: '16px',
            marginTop: drawerOpen ? 130 : 90,
            ...(!open && {
                width: `calc(100% - ${drawerWidth}px)`
            })
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            marginRight: '10px',
            padding: '16px',
            marginTop: drawerOpen ? 150 : 90,
            ...(!open && {
                width: `calc(100% - ${drawerWidth}px)`
            })
        }
    }));

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true));
        } else {
            dispatch(openDrawer(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerType]);

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (matchDownMd) {
            dispatch(openDrawer(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd;

    const header = useMemo(
        () => (
            <Grid>
                <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
                    <Header />
                </Toolbar>
                <Divider />
                <Grid sx={{ width: '100%' }}>
                    <MenuList />
                </Grid>
            </Grid>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [layout, matchDownMd]
    );
    console.log(drawerOpen);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: theme.palette.background.default }}>
                {header}
            </AppBar>

            {/* horizontal menu-list bar */}
            {layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd && <HorizontalBar />}

            {/* drawer */}
            {/* {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || matchDownMd) && <Sidebar />} */}

            {/* main content */}
            <Main theme={theme} open={true} layout={layout}>
                <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
                    {/* breadcrumb */}
                    <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                    <Outlet />
                </Container>
            </Main>
            <Customization />
        </Box>
    );
};

export default MainLayout;
