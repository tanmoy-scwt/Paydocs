import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllJobsAPI, fetchAnyDataAPI, fetchSelectedJobByIDAPI, postJobApiFormData, postJobApiJson } from 'services/jobservices';

export const fetchAllJobsFromAPI = createAsyncThunk('allJobs/fetchAllJobs', async ({ API_PATH, params }, { rejectWithValue }) => {
    try {
        const response = await fetchAllJobsAPI(API_PATH, params);
        return response.data;
    } catch (error) {
        return rejectWithValue('api having issue');
    }
});

export const fetchSelectedJobByIDFromAPI = createAsyncThunk(
    'selectedJobByID/fetchSelectedJobByID',
    async (API_PATH, { rejectWithValue }) => {
        try {
            const response = await fetchSelectedJobByIDAPI(API_PATH);
            return response.data;
        } catch (error) {
            return rejectWithValue('api having issue');
        }
    }
);

export const postJobAPIJSON = createAsyncThunk('postJob/postSingleJob', async ({ API_PATH, body }, { rejectWithValue }) => {
    try {
        const response = await postJobApiJson(API_PATH, body);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const postJobFormData = createAsyncThunk('job/postJobFormData', async ({ API_PATH, formData }, { rejectWithValue }) => {
    try {
        const response = await postJobApiFormData(API_PATH, formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchAnyDataFromAPI = createAsyncThunk('job/fetchAnyData', async (API_PATH, { rejectWithValue }) => {
    try {
        const response = await fetchAnyDataAPI(API_PATH);
        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
