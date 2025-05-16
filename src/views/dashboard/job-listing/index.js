// material-ui
import { Divider, Grid, Pagination } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SearchBox from './components/SearchBox';
import { useEffect, useState } from 'react';
import JobPostBoxTable from './components/JobPostBoxTable';
import FillOutApplication from './components/FillOutApp';
import { useTheme } from '@mui/system';
import JobListingSelectBox from './components/JobListingSelectBox';
import Company1 from 'assets/images/icons/logoplasan.png';
import { useNavigate, useSearchParams } from 'react-router-dom';

const JobListing = () => {
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    console.log('searchParams:', searchParams.toString());
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const categories = [
        {
            value: 'category',
            label: 'Category'
        },
        {
            value: 'category2',
            label: 'Category2'
        },
        {
            value: 'category3',
            label: 'Category3'
        },
        {
            value: 'category4',
            label: 'Category4'
        }
    ];
    const salaryRangeOptions = [
        {
            value: 'salaryRange',
            label: 'Salary Range'
        },
        {
            value: '0-20000',
            label: '₹0 - ₹20,000'
        },
        {
            value: '20001-40000',
            label: '₹20,001 - ₹40,000'
        },
        {
            value: '40001-60000',
            label: '₹40,001 - ₹60,000'
        },
        {
            value: '60001-100000',
            label: '₹60,001 - ₹1,00,000'
        }
    ];

    const noOfApplicantsOptions = [
        {
            value: 'noOfApplicants',
            label: 'No Of Applicants'
        },
        {
            value: '0-10',
            label: '0 - 10 Applicants'
        },
        {
            value: '11-50',
            label: '11 - 50 Applicants'
        },
        {
            value: '51-100',
            label: '51 - 100 Applicants'
        },
        {
            value: '100+',
            label: '100+ Applicants'
        }
    ];

    const navigate = useNavigate();

    const [category, setCategory] = useState('category');
    const [salaryRange, setSalaryRange] = useState('salaryRange');
    const [noOfApplicants, setNoOfApplicants] = useState('noOfApplicants');

    const handleDropDown = (e, setter) => {
        setter(e.target.value);
    };
    // const handleDropDown = (selectedOption, setter) => {
    //     setter(selectedOption.value);
    //     setSelectedApplicantOption(selectedOption);
    //     console.log('Selected Object:', selectedOption);
    // };

    const [isFormOpen, setIsFormOpen] = useState(false);
    const handleFormOpenAction = () => {
        setIsFormOpen(!isFormOpen);
        console.log(selectedApplicantOption);
    };

    const DifferentAllJobs = [
        [
            {
                companylogo: Company1,
                companyName: 'Software Developer',
                companyDetails: ['TechNova Pvt Ltd', 'Full Time', '₹50,000 - ₹80,000 a month', 'IT Services', 'Bangalore, Karnataka'],
                companyAbout: 'Work on modern tech stacks and contribute to scalable web applications in a fast-paced environment.'
            },
            {
                companylogo: Company1,
                companyName: 'Travel Desk Executive',
                companyDetails: [
                    'TIRUFINE RESIDENCY LLP',
                    'Full Time',
                    '₹25,000 - ₹45,000 a month',
                    'Others',
                    'Salt Lake, Kolkata, West Bengal'
                ],
                companyAbout: 'Manage travel arrangements and coordinate with vendors to ensure a smooth experience for clients.'
            },
            {
                companylogo: Company1,
                companyName: 'Marketing Specialist',
                companyDetails: [
                    'BrightEdge Solutions',
                    'Part Time',
                    '₹15,000 - ₹25,000 a month',
                    'Digital Marketing',
                    'Pune, Maharashtra'
                ],
                companyAbout: 'Assist in executing digital campaigns and optimizing brand reach through various online platforms.'
            },
            {
                companylogo: Company1,
                companyName: 'Sales Manager',
                companyDetails: ['NextWave Inc', 'Full Time', '₹40,000 - ₹70,000 a month', 'Sales', 'Hyderabad, Telangana'],
                companyAbout:
                    'Lead a sales team to meet quarterly targets and develop strong client relationships in the enterprise segment.'
            },
            {
                companylogo: Company1,
                companyName: 'Data Analyst',
                companyDetails: ['DataCraft Analytics', 'Remote', '₹45,000 - ₹65,000 a month', 'Analytics', 'Remote'],
                companyAbout: 'Analyze large datasets to extract insights and support decision-making for internal stakeholders.'
            },
            {
                companylogo: Company1,
                companyName: 'UX Designer',
                companyDetails: ['Pixel Studios', 'Full Time', '₹55,000 - ₹90,000 a month', 'Design', 'Chennai, Tamil Nadu'],
                companyAbout: 'Design user-centric interfaces and collaborate with developers to implement engaging UI/UX flows.'
            },
            {
                companylogo: Company1,
                companyName: 'Project Coordinator',
                companyDetails: ['Axis Minds', 'Contract', '₹30,000 - ₹50,000 a month', 'Project Management', 'Mumbai, Maharashtra'],
                companyAbout: 'Coordinate between internal teams and clients to ensure timely delivery of project milestones.'
            },
            {
                companylogo: Company1,
                companyName: 'Customer Support Executive',
                companyDetails: ['Helpster India', 'Full Time', '₹20,000 - ₹35,000 a month', 'Customer Service', 'Noida, Uttar Pradesh'],
                companyAbout: 'Handle customer queries and resolve issues promptly through chat, email, and phone support.'
            },
            {
                companylogo: Company1,
                companyName: 'HR Generalist',
                companyDetails: ['PeopleFirst HR', 'Full Time', '₹35,000 - ₹60,000 a month', 'Human Resources', 'Gurugram, Haryana'],
                companyAbout: 'Oversee HR operations including recruitment, onboarding, and employee engagement initiatives.'
            },
            {
                companylogo: Company1,
                companyName: 'Business Analyst',
                companyDetails: ['Insight Consulting', 'Full Time', '₹50,000 - ₹75,000 a month', 'Consulting', 'Ahmedabad, Gujarat'],
                companyAbout: 'Liaise with clients to gather requirements, model data flows, and recommend business improvements.'
            },
            {
                companylogo: Company1,
                companyName: 'QA Engineer',
                companyDetails: ['CodeAudit Ltd', 'Full Time', '₹45,000 - ₹65,000 a month', 'Software Testing', 'Jaipur, Rajasthan'],
                companyAbout: 'Perform manual and automated testing to ensure high software quality and bug-free releases.'
            },
            {
                companylogo: Company1,
                companyName: 'DevOps Engineer',
                companyDetails: ['CloudNine Tech', 'Full Time', '₹60,000 - ₹1,00,000 a month', 'Infrastructure', 'Bangalore, Karnataka'],
                companyAbout: 'Automate infrastructure deployment and ensure seamless CI/CD pipelines across cloud platforms.'
            },
            {
                companylogo: Company1,
                companyName: 'Product Manager',
                companyDetails: ['Visionary Labs', 'Full Time', '₹80,000 - ₹1,20,000 a month', 'Product', 'Delhi, India'],
                companyAbout: 'Define product vision, gather customer feedback, and lead the roadmap execution with cross-functional teams.'
            },
            {
                companylogo: Company1,
                companyName: 'Finance Executive',
                companyDetails: ['MoneyMatters Pvt Ltd', 'Full Time', '₹35,000 - ₹55,000 a month', 'Finance', 'Indore, Madhya Pradesh'],
                companyAbout: 'Manage budgeting, financial forecasting, and expense reporting for internal teams.'
            },
            {
                companylogo: Company1,
                companyName: 'Operations Associate',
                companyDetails: ['DailyMart Logistics', 'Full Time', '₹28,000 - ₹40,000 a month', 'Logistics', 'Kochi, Kerala'],
                companyAbout: 'Support daily logistics and operations with efficiency and coordination across warehouse teams.'
            }
        ],
        [
            {
                companylogo: Company1,
                companyName: 'Content Writer',
                companyDetails: [
                    'WordCraft Solutions',
                    'Part Time',
                    '₹18,000 - ₹30,000 a month',
                    'Content/Media',
                    'Bhopal, Madhya Pradesh'
                ],
                companyAbout:
                    'Create engaging and SEO-friendly articles, blogs, and social media posts for various clients across industries.'
            },
            {
                companylogo: Company1,
                companyName: 'Graphic Designer',
                companyDetails: ['DesignPoint Studio', 'Freelance', '₹20,000 - ₹40,000 a month', 'Creative', 'Surat, Gujarat'],
                companyAbout:
                    'Design visuals for branding, marketing campaigns, and digital ads using tools like Photoshop and Illustrator.'
            },
            {
                companylogo: Company1,
                companyName: 'Technical Support Engineer',
                companyDetails: ['SysNet Services', 'Full Time', '₹30,000 - ₹50,000 a month', 'IT Support', 'Nagpur, Maharashtra'],
                companyAbout: 'Provide technical assistance and troubleshoot hardware/software issues for enterprise clients.'
            },
            {
                companylogo: Company1,
                companyName: 'Social Media Manager',
                companyDetails: ['BuzzBlitz Digital', 'Remote', '₹25,000 - ₹45,000 a month', 'Marketing', 'Remote'],
                companyAbout:
                    'Plan and execute social media strategies to improve brand visibility and follower engagement on platforms like Instagram and LinkedIn.'
            },
            {
                companylogo: Company1,
                companyName: 'Backend Developer',
                companyDetails: ['CodeCrafters India', 'Full Time', '₹60,000 - ₹90,000 a month', 'Web Development', 'Trivandrum, Kerala'],
                companyAbout: 'Build scalable APIs and database systems using Node.js and MongoDB for high-performance applications.'
            }
        ],

        [
            {
                companylogo: Company1,
                companyName: 'Frontend Developer',
                companyDetails: [
                    'PixelPeak Technologies',
                    'Full Time',
                    '₹50,000 - ₹80,000 a month',
                    'Software Development',
                    'Noida, Uttar Pradesh'
                ],
                companyAbout:
                    'Develop user-friendly interfaces using React.js and ensure mobile responsiveness and accessibility across devices.'
            },
            {
                companylogo: Company1,
                companyName: 'HR Executive',
                companyDetails: ['PeopleFirst HR', 'Full Time', '₹22,000 - ₹35,000 a month', 'Human Resources', 'Jaipur, Rajasthan'],
                companyAbout:
                    'Manage employee onboarding, assist with payroll, and support recruitment operations in a fast-paced work environment.'
            },
            {
                companylogo: Company1,
                companyName: 'Digital Marketing Analyst',
                companyDetails: ['AdSmart Agency', 'Internship', '₹10,000 - ₹15,000 a month', 'Marketing', 'Indore, Madhya Pradesh'],
                companyAbout:
                    'Assist in managing ad campaigns, analyzing performance metrics, and improving SEO and SEM efforts for client brands.'
            },
            {
                companylogo: Company1,
                companyName: 'Operations Manager',
                companyDetails: ['Swift Logistics', 'Full Time', '₹60,000 - ₹1,00,000 a month', 'Logistics', 'Ahmedabad, Gujarat'],
                companyAbout:
                    'Oversee daily logistics and warehouse operations, manage vendor relations, and ensure timely delivery execution.'
            },
            {
                companylogo: Company1,
                companyName: 'Customer Success Associate',
                companyDetails: ['BrightCRM Solutions', 'Remote', '₹28,000 - ₹45,000 a month', 'Customer Service', 'Remote'],
                companyAbout:
                    'Act as the first point of contact for customers, helping them achieve success with our CRM platform through training and support.'
            }
        ]
    ];

    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        console.log(event);
        console.log(value, 'vALUE');
        setPage(value);
        navigate('/job-listing?page=' + value);
    };

    useEffect(() => {
        if (currentPage) {
            setPage(currentPage);
        }
    }, []);

    return (
        <>
            <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
                <Grid item xs={12}>
                    {!isFormOpen ? (
                        <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="Job Listing" content={false}>
                            <Grid sx={{ paddingX: '0rem', paddingY: '0rem', paddingBottom: '1.5rem' }} container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <SearchBox />
                                </Grid>
                                <Grid sx={{ paddingX: '1rem', paddingY: '.5rem' }} container spacing={gridSpacing} item xs={12} sm={6}>
                                    <JobListingSelectBox
                                        id="category"
                                        name="category"
                                        placeholder="Category"
                                        value={category}
                                        action={handleDropDown}
                                        setter={setCategory}
                                        allOptions={categories}
                                    />
                                    <JobListingSelectBox
                                        id="salaryRange"
                                        name="salaryRange"
                                        placeholder="Salary Range"
                                        value={salaryRange}
                                        action={handleDropDown}
                                        setter={setSalaryRange}
                                        allOptions={salaryRangeOptions}
                                    />
                                    <JobListingSelectBox
                                        id="noOfApplicants"
                                        name="noOfApplicants"
                                        placeholder="No Of Applicants"
                                        value={noOfApplicants}
                                        action={handleDropDown}
                                        setter={setNoOfApplicants}
                                        allOptions={noOfApplicantsOptions}
                                    />
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid sx={{ paddingX: '0rem', paddingY: '0rem' }} container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} lg={12}>
                                    {DifferentAllJobs?.length > 0 &&
                                        DifferentAllJobs?.[page - 1]?.map((jobProfile, index) => (
                                            <JobPostBoxTable
                                                key={`JobProfileAvailable${index}`}
                                                jobDetails={jobProfile}
                                                action={handleFormOpenAction}
                                            />
                                        ))}
                                </Grid>
                                <Grid marginBottom={'2.5rem'} item xs={12} sm={6}>
                                    <Grid container direction="column" spacing={2} alignItems="center">
                                        <Grid item xs={12}>
                                            <Pagination
                                                count={DifferentAllJobs.length}
                                                color="secondary"
                                                page={page}
                                                onChange={handlePageChange}
                                                size="large"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    ) : (
                        <FillOutApplication action={handleFormOpenAction} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default JobListing;
