import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboardAdmin',
    initialState: {},
    reducers: {
        getJobPostPerMonth: (state, action) => {
            [...state], action.payload;
        }
    }
});

export default dashboardSlice.reducer;
