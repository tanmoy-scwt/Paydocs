// action - state management
import { LOGIN, LOGOUT, REGISTER, UPDATE_USER } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload.user
            };
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
