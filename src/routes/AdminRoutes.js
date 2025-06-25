import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// ------------------------ Admin Pages --------------------------
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ProfileManagement = Loadable(lazy(() => import('views/dashboard/Profile-mangement')));

const JobManagement = Loadable(lazy(() => import('views/Admin/JobManagement')));
const EditCurrentJobAdmin = Loadable(lazy(() => import('views/Admin/EditCurrentJob/EditCurrentJobAdmin')));
const ApplicationDetailsAdmin = Loadable(lazy(() => import('views/Admin/ApplicationDetailsAdmin/ApplicationDetailsAdmin')));
const JobApplicationAdmin = Loadable(lazy(() => import('views/Admin/JobApplicationAdmin/JobApplicationAdmin')));
const AllJobCategory = Loadable(lazy(() => import('views/Admin/AllJobCategory/AllJobCategory')));
const CurrentUserDetails = Loadable(lazy(() => import('views/Admin/CurrentUserDetails/CurrentUserDetails')));
const AllUser = Loadable(lazy(() => import('views/Admin/AllUser/AllUser')));
const AdminPostJob = Loadable(lazy(() => import('views/Admin/AdminPostJob/AdminPostJob')));
const NotFound = Loadable(lazy(() => import('NotFound')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/profile-management',
            element: <ProfileManagement />
        },
        {
            path: '/admin-job-listing',
            element: <JobManagement />
        },
        {
            path: '/admin-job-listing/:page/:id',
            element: <EditCurrentJobAdmin />
        },
        {
            path: '/admin-post-job',
            element: <AdminPostJob />
        },
        {
            path: '/companies',
            element: <AllUser />
        },
        {
            path: '/companies/:page/:id',
            element: <CurrentUserDetails />
        },
        {
            path: '/job-category',
            element: <AllJobCategory />
        },
        {
            path: '/admin-job-application',
            element: <JobApplicationAdmin />
        },
        {
            path: '/admin-job-application/:page/:id',
            element: <ApplicationDetailsAdmin />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default AdminRoutes;
