import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
const ApplicationDetails = Loadable(lazy(() => import('views/dashboard/ApplicationDetails/ApplicationDetails')));
const TotalApplicant = Loadable(lazy(() => import('views/dashboard/TotalApplicants/TotalApplicant')));
const ApplicantDetailsUser = Loadable(lazy(() => import('views/dashboard/ApplicantDetailsUser/ApplicantDetailsUser')));
const AppliedJobUser = Loadable(lazy(() => import('views/dashboard/JobsAppliedUser/AppliedJobUser')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ProfileManagement = Loadable(lazy(() => import('views/dashboard/Profile-mangement')));
const PostAJob = Loadable(lazy(() => import('views/dashboard/PostAJob')));
const JobListing = Loadable(lazy(() => import('views/dashboard/job-listing')));
const FillOutApplication = Loadable(lazy(() => import('views/dashboard/FillOutApplication')));
const EditJobForm = Loadable(lazy(() => import('views/dashboard/edit-page')));
const AllJobsTable = Loadable(lazy(() => import('views/dashboard/PostedJobsUser/AllJobsTable')));
const NotFound = Loadable(lazy(() => import('NotFound')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
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

        // ========================== User ======================

        {
            path: '/job-listing',
            element: <JobListing />
        },
        {
            path: '/job-listing/form/:page/:id',
            element: <FillOutApplication />
        },
        {
            path: '/post-job',
            element: <PostAJob />
        },
        {
            path: '/posted-Jobs',
            element: <AllJobsTable />
        },
        {
            path: '/posted-jobs/edit/:page/:id',
            element: <EditJobForm />
        },
        {
            path: '/job-applied',
            element: <AppliedJobUser />
        },
        {
            path: '/job-applied/:page/:id',
            element: <ApplicationDetails />
        },
        {
            path: '/total-applicants',
            element: <TotalApplicant />
        },
        {
            path: '/posted-jobs/application/:page/:id',
            element: <ApplicantDetailsUser />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

// const GetMainRoutes = (user) => ({
//     path: '/',
//     element: (
//         <AuthGuard>
//             <MainLayout />
//         </AuthGuard>
//     ),
//     children: [
//         {
//             path: '/dashboard',
//             element: <DashboardDefault />
//         },
//         {
//             path: '/profile-management',
//             element: <ProfileManagement />
//         },
//         ...(user?.user_role === 'admin'
//             ? [
//                   // Admin Routes
//                   { path: '/job-management', element: <JobManagement /> },
//                   { path: '/job-management/:id', element: <EditCurrentJobAdmin /> },
//                   { path: '/admin-post-job', element: <AdminPostJob /> },
//                   { path: '/all-user', element: <AllUser /> },
//                   { path: '/all-user/:id', element: <CurrentUserDetails /> },
//                   { path: '/job-category', element: <AllJobCategory /> },
//                   { path: '/admin-job-application', element: <JobApplicationAdmin /> },
//                   { path: '/admin-job-application/:id', element: <ApplicationDetailsAdmin /> }
//               ]
//             : [
//                   // User Routes
//                   { path: '/job-listing', element: <JobListing /> },
//                   { path: '/job-listing/form/:id', element: <FillOutApplication /> },
//                   { path: '/post-job', element: <PostAJob /> },
//                   { path: '/posted-Jobs', element: <AllJobsTable /> },
//                   { path: '/posted-job/:id', element: <EditJobForm /> },
//                   { path: '/job-applied', element: <AppliedJobUser /> },
//                   { path: '/job-applied/:id', element: <ApplicationDetails /> },
//                   { path: '/total-applicants', element: <TotalApplicant /> },
//                   { path: '/total-applicants/:id', element: <ApplicantDetailsUser /> }
//               ])
//     ]
// });

export default MainRoutes;
// export default GetMainRoutes;
