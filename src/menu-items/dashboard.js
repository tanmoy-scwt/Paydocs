// third-party
import { FormattedMessage } from 'react-intl';

// assets
// import { IconHome, IconUser, IconBriefcase, IconFilePlus, IconUsers, IconCategory, IconDeviceAnalytics } from '@tabler/icons';
import {
    IconSmartHome,
    IconListCheck,
    IconBriefcase, // for posting jobs
    IconCategory, // for job listing
    IconWorldUpload, // for posted jobs
    IconCheck, // for job applied
    IconUsers // for total applicants
} from '@tabler/icons';
const icons = {
    HomeIcon: IconSmartHome,
    Profile: IconCategory,
    JobListing: IconListCheck,
    PostJob: IconBriefcase,
    PostedJobs: IconWorldUpload,
    JobApplied: IconCheck,
    TotalApplicants: IconUsers
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    // title: <FormattedMessage id="" />,
    icon: icons.HomeIcon,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.HomeIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'profile-management',
        //     title: <FormattedMessage id="profileManagement" />,
        //     type: 'item',
        //     url: '/profile-management',
        //     icon: icons.Profile,
        //     breadcrumbs: false
        // },
        {
            id: 'job-listing',
            title: <FormattedMessage id="jobListing" />,
            type: 'item',
            url: '/job-listing',
            icon: icons.JobListing,
            breadcrumbs: false
        },
        {
            id: 'post-job',
            title: <FormattedMessage id="postAJob" />,
            type: 'item',
            url: '/post-job',
            icon: icons.PostJob,
            breadcrumbs: false
        },
        {
            id: 'posted-jobs',
            title: <FormattedMessage id="postedJobs" />,
            type: 'item',
            url: '/posted-jobs',
            icon: icons.PostedJobs,
            breadcrumbs: false
        },
        {
            id: 'job-applied',
            title: <FormattedMessage id="jobsApplied" />,
            type: 'item',
            url: '/job-applied',
            icon: icons.JobApplied,
            breadcrumbs: false
        }
        // {
        //     id: 'total-applicant',
        //     title: <FormattedMessage id="totalApplicant" />,
        //     type: 'item',
        //     url: '/total-applicants',
        //     icon: icons.TotalApplicants,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
