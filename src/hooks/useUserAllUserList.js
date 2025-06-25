import { useEffect, useState } from 'react';
import axiosServices from 'utils/axios';
import useAuth from './useAuth';

const useUserAllUserList = (API_PATH) => {
    const { user } = useAuth();
    const [userCompaniesList, setuserCompaniesList] = useState([]);
    const [loadinguserCompaniesList, setLoadingUserList] = useState(true);
    const [userCompaniesListError, setuserCompaniesListError] = useState(null);
    console.log(API_PATH, 'API PATH');

    const fetchCategories = async () => {
        setLoadingUserList(true);
        setuserCompaniesListError(null);
        try {
            if (user?.user_role === 'user') {
                const response = await axiosServices(API_PATH);
                console.log(response, 'response');

                if (response?.data?.status) {
                    setuserCompaniesList(response.data.data);
                } else {
                    setuserCompaniesList([]);
                    setuserCompaniesListError('Failed to fetch categories');
                }
            }
        } catch (error) {
            setuserCompaniesList([]);
            setuserCompaniesListError(error.message || 'Something went wrong');
            console.error('Error fetching categories:', error);
        } finally {
            setLoadingUserList(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [API_PATH]);
    console.log(userCompaniesList, 'adsakdjaskdjasjdk admin user list');
    // console.log(userCompaniesList, 'adsakdjaskdjasjdk admin user list');
    console.log(userCompaniesListError, 'adsakdjaskdjasjdk admin user list');

    return { userCompaniesList, loadinguserCompaniesList, userCompaniesListError };
};

export default useUserAllUserList;
