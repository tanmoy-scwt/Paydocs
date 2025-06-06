const { createSlice } = require('@reduxjs/toolkit');
const { postJobFormData } = require('store/jobThunks/jobThunks');

const initialState = {
    isLoadingFormData: false,
    successMessageFormData: null,
    errorMessageFormData: null
};

const PostJobFormDataSlice = createSlice({
    name: 'postJobFormData',
    initialState,
    reducers: {
        resetPostJobFormData: (state) => {
            state.isLoadingFormData = false;
            state.successMessageFormData = null;
            state.errorMessageFormData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Post Job (FormData)
            .addCase(postJobFormData.pending, (state) => {
                state.isLoadingFormData = true;
                state.errorMessageFormData = null;
                state.successMessageFormData = null;
            })
            .addCase(postJobFormData.fulfilled, (state) => {
                state.isLoadingFormData = false;
                state.successMessageFormData = 'Job Posted successfully';
                state.errorMessageFormData = null;
            })
            .addCase(postJobFormData.rejected, (state) => {
                state.isLoadingFormData = false;
                state.errorMessageFormData = 'Submission failed.';
            });
    }
});

export default PostJobFormDataSlice.reducer;

export const { resetPostJobFormData } = PostJobFormDataSlice.actions;
