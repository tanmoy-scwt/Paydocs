// import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import MainRoutes from './MainRoutes';

// routes
// const LoginRoutes = Loadable(lazy(() => import('./LoginRoutes')));
// const AdminRoutes = Loadable(lazy(() => import('./AdminRoutes')));
// const MainRoutes = Loadable(lazy(() => import('./MainRoutes')));
const NotFound = Loadable(lazy(() => import('NotFound')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { user } = useAuth();
    const routes = [LoginRoutes];
    if (user?.user_role === 'admin') {
        routes.push(AdminRoutes);
    } else if (user?.user_role === 'user') {
        routes.push(MainRoutes);
    }
    routes.push({
        path: '*',
        element: <NotFound />
    });
    return useRoutes(routes);
}
