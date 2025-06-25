import { useEffect, useState } from 'react';
import axiosServices from 'utils/axios';
import useAuth from './useAuth';

const useAdminAllUserList = (API_PATH) => {
    const { user } = useAuth();
    const [adminUserList, setAdminUserList] = useState([]);
    const [loadingAdminUserList, setLoadingUserList] = useState(true);
    const [adminUserListError, setAdminUserListError] = useState(null);

    const fetchCategories = async () => {
        setLoadingUserList(true);
        setAdminUserListError(null);
        try {
            if (user?.user_role === 'admin') {
                const response = await axiosServices(API_PATH);
                if (response?.data?.status) {
                    setAdminUserList(response.data.data);
                } else {
                    setAdminUserList([]);
                    setAdminUserListError('Failed to fetch categories');
                }
            }
        } catch (error) {
            setAdminUserList([]);
            setAdminUserListError(error.message || 'Something went wrong');
            console.error('Error fetching categories:', error);
        } finally {
            setLoadingUserList(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [API_PATH]);

    return { adminUserList, loadingAdminUserList, adminUserListError };
};

export default useAdminAllUserList;
