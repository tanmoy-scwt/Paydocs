import { createSlice } from '@reduxjs/toolkit';
import { fetchAllJobsFromAPI } from 'store/jobThunks/jobThunks';

const initialState = {
    allJobs: [],
    isLoading: true,
    errorMessage: null,
    successMessage: null,
    params: {}
};

const allJobsSlice = createSlice({
    name: 'getAllJobs',
    initialState,
    reducers: {
        clearAllJobsMessage: (state) => {
            state.successMessage = null;
            state.errorMessage = null;
        },
        setJobParams: (state, action) => {
            state.params = action.payload;
        },
        clearJobData: (state) => {
            state.allJobs = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllJobsFromAPI.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(fetchAllJobsFromAPI.fulfilled, (state, action) => {
                state.allJobs = action.payload;
                state.isLoading = false;
                state.successMessage = 'Fetched all jobs successfully';
            })
            .addCase(fetchAllJobsFromAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload || 'Failed to fetch jobs';
                state.allJobs = [];
                state.categories = [];
            });
    }
});

export const { clearAllJobsMessage, setJobParams, clearJobData } = allJobsSlice.actions;

export default allJobsSlice.reducer;
