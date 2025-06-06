// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';
import allJobsReducer from './slices/JobsSlices/allJobsSlice';
import getJobByIDReducer from './slices/JobsSlices/getJobByID';
import postJobSliceReducer from './slices/JobsSlices/postjobSlice';
import PostJobFormDataSliceReducer from './slices/JobsSlices/postJobFormData';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: userReducer,
    menu: menuReducer,
    allJobs: allJobsReducer,
    getJobByID: getJobByIDReducer,
    PostJobAPI: postJobSliceReducer,
    PostJobFormDataAPI: PostJobFormDataSliceReducer
});

export default reducer;
