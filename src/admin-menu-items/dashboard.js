// third-party
import { FormattedMessage } from 'react-intl';

// assets

import { IconSmartHome, IconListCheck, IconBriefcase, IconFilePlus, IconUsers, IconCategory, IconDeviceAnalytics } from '@tabler/icons';

const icons = {
    HomeIcon: IconSmartHome,
    ProfileIcon: IconCategory,
    JobPostingIcon: IconListCheck,
    IconFileText: IconFilePlus,
    AllUsersIcon: IconUsers,
    CategoryIcon: IconBriefcase,
    IconDeviceAnalytics: IconDeviceAnalytics
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
        {
            id: 'profile-management',
            title: <FormattedMessage id="profileManagement" />,
            type: 'item',
            url: '/profile-management',
            icon: icons.ProfileIcon,
            breadcrumbs: false
        },
        {
            id: 'jobsManagement',
            title: <FormattedMessage id="jobManagement" />,
            type: 'item',
            url: '/job-management',
            icon: icons.JobPostingIcon,
            breadcrumbs: false
        },
        {
            id: 'post-job',
            title: <FormattedMessage id="postAJob" />,
            type: 'item',
            url: '/admin-post-job',
            icon: icons.IconFileText,
            breadcrumbs: false
        },
        {
            id: 'all-user',
            title: <FormattedMessage id="allUser" />,
            type: 'item',
            url: '/all-user',
            icon: icons.AllUsersIcon,
            breadcrumbs: false
        },
        {
            id: 'job-category',
            title: <FormattedMessage id="jobCategory" />,
            type: 'item',
            url: '/job-category',
            icon: icons.CategoryIcon,
            breadcrumbs: false
        },
        {
            id: 'admin-job-application',
            title: <FormattedMessage id="jobApplication" />,
            type: 'item',
            url: '/admin-job-application',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
