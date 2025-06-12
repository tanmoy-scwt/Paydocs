import { Navigate, useRoutes } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import MainRoutes from './MainRoutes';

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
        element: <Navigate to="/" replace />
    });
    return useRoutes(routes);
}
