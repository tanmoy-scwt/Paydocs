import axiosServices from 'utils/axios';

const useDeleteAPI = () => {
    const callingDeleteAPI = async (API_PATH) => {
        try {
            const response = await axiosServices.delete(API_PATH);
            return response;
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return callingDeleteAPI;
};

export default useDeleteAPI;
