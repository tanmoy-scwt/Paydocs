// hooks/useJobListings.js
import { useState, useCallback, useEffect } from 'react';
import axiosServices from 'utils/axios';

const useJobListings = ({ userRole, page, filters }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const { company, location, category, salary, noOfApplicants } = filters;

    const toggleForm = useCallback(() => {
        setIsFormOpen((prev) => !prev);
    }, []);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const API_PATH = userRole !== 'user' ? '/admin/job-list' : '/all-job-list';
            const params = {
                page,
                jobTitleOrCompanyName: company,
                location: location,
                category: category,
                salaryLowerRange: salary[0],
                salaryUpperRange: salary[1],
                noOfApplicants: noOfApplicants
            };

            const response = await axiosServices(API_PATH, { params });

            if (response?.data?.status) {
                const jobData = userRole === 'user' ? response.data.data.jobList : response.data.data;

                setJobs(jobData?.data || []);
                setTotalPages(jobData?.last_page || 1);
            } else {
                setJobs([]);
            }
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, [filters, page, userRole]);

    useEffect(() => {
        fetchJobs();
    }, [company, location, category, salary, noOfApplicants]);

    return {
        jobs,
        loading,
        totalPages,
        isFormOpen,
        selectedJobId,
        setSelectedJobId,
        toggleForm
    };
};

export default useJobListings;
