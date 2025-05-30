// import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';
// import Loadable from 'ui-component/Loadable';

// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
// const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
// const LoginRoutes = Loadable(lazy(() => import('./LoginRoutes')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // return useRoutes([{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, MainRoutes]);
    return useRoutes([LoginRoutes, MainRoutes]);
}
