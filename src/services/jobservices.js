import axiosServices from 'utils/axios';

export const fetchAnyDataAPI = (path) => {
    return axiosServices.get(path);
};

export const fetchAllJobsAPI = (path, params = {}) => {
    return axiosServices.get(path, { params });
};
export const fetchSelectedJobByIDAPI = (path) => {
    return axiosServices.get(path);
};

export const postJobApiJson = (path, body) => {
    return axiosServices.post(path, body, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const postJobApiFormData = (path, formData) => {
    return axiosServices.post(path, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
