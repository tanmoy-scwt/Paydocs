// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

import { ReactComponent as HomeIcon } from '../assets/images/icons/icon1.svg';

import { ReactComponent as ProfileIcon } from '../assets/images/icons/icon2.svg';
import { ReactComponent as JobListingIcon } from '../assets/images/icons/icon3.svg';
import { ReactComponent as JobPostingIcon } from '../assets/images/icons/icon4.svg';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    HomeIcon,
    ProfileIcon,
    JobListingIcon,
    JobPostingIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    // title: <FormattedMessage id="" />,
    icon: icons.HomeIcon,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.HomeIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'analytics',
        //     title: <FormattedMessage id="analytics" />,
        //     type: 'item',
        //     url: '/dashboard/analytics',
        //     icon: icons.IconDeviceAnalytics,
        //     breadcrumbs: false
        // },
        {
            id: 'profile-management',
            title: <FormattedMessage id="profileManagement" />,
            type: 'item',
            url: '/profile-management',
            icon: icons.ProfileIcon,
            breadcrumbs: false
        },
        {
            id: 'job-listing',
            title: <FormattedMessage id="jobListing" />,
            type: 'item',
            url: '/job-listing',
            icon: icons.JobListingIcon,
            breadcrumbs: false
        },
        {
            id: 'post-job',
            title: <FormattedMessage id="postAJob" />,
            type: 'item',
            url: '/post-job',
            icon: icons.JobPostingIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
