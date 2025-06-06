import { useEffect, useState } from 'react';
import axiosServices from 'utils/axios';

const useJobCategoryList = (API_PATH) => {
    const [categories, setCategories] = useState([]);
    const [loadingCategory, setLoading] = useState(false);
    const [categoryError, setCategoryError] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        setCategoryError(null);
        try {
            const response = await axiosServices(API_PATH);
            if (response?.data?.status) {
                setCategories(response.data.data);
            } else {
                setCategories([]);
                setCategoryError('Failed to fetch categories');
            }
        } catch (error) {
            setCategories([]);
            setCategoryError(error.message || 'Something went wrong');
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [API_PATH]);

    return { categories, loadingCategory, categoryError };
};

export default useJobCategoryList;
