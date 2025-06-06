const { createSlice } = require('@reduxjs/toolkit');
const { postJobAPIJSON } = require('store/jobThunks/jobThunks');

const initialState = {
    isLoadingPOST: false,
    postResponse: null,
    successMessage: null,
    errorMessage: null,
    userEmailDetails: null
};

const PostJobSlice = createSlice({
    name: 'postJob',
    initialState,
    reducers: {
        resetPostJobAPIJSON: (state) => {
            state.successMessage = null;
            state.postResponse = null;
            state.errorMessage = null;
            state.isLoadingPOST = false;
        },
        getEmailValueRegister: (state, action) => {
            state.userEmailDetails = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postJobAPIJSON.pending, (state) => {
            state.isLoadingPOST = true;
            state.successMessage = null;
            state.errorMessage = null;
        });
        builder.addCase(postJobAPIJSON.fulfilled, (state, action) => {
            state.successMessage = 'Message';
            state.isLoadingPOST = false;
            state.postResponse = action.payload;
        });
        builder.addCase(postJobAPIJSON.rejected, (state) => {
            state.successMessage = null;
            state.errorMessage = 'Error';
            state.isLoadingPOST = false;
            state.postResponse = null;
        });
    }
});

export default PostJobSlice.reducer;

export const { resetPostJobAPIJSON, getEmailValueRegister } = PostJobSlice.actions;
