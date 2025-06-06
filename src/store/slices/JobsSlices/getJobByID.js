import { createSlice } from '@reduxjs/toolkit';
import { fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';

const initialState = {
    isLoading: true,
    successMessage: null,
    errorMessage: null,
    selectedJob: null
};

const getJobByID = createSlice({
    name: 'getJobByID',
    initialState,
    reducers: {
        resetSelectedJobByID: (state) => {
            state.isLoading = false;
            state.selectedJob = null;
            state.successMessage = null;
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSelectedJobByIDFromAPI.pending, (state) => {
                state.isLoading = true;
                state.successMessage = null;
                state.errorMessage = null;
            })
            .addCase(fetchSelectedJobByIDFromAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedJob = action.payload;
                state.successMessage = 'Data fetched Successfully';
            })
            .addCase(fetchSelectedJobByIDFromAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload || 'this is error';
                state.successMessage = null;
                state.selectedJob = null;
            });
    }
});

export default getJobByID.reducer;

export const { resetSelectedJobByID } = getJobByID.actions;
