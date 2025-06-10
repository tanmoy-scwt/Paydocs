import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, UPDATE_USER } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    return Date.now() < parseInt(serviceToken, 10);
};

const setSession = (serviceToken, expiryTime, userDetails) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        localStorage.setItem('tokenExpiry', expiryTime);
        localStorage.setItem('userDetails', userDetails);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('userDetails');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const serviceTokenExpiry = window.localStorage.getItem('tokenExpiry');
                const userDetails = window.localStorage.getItem('userDetails');

                if (serviceToken && verifyToken(serviceTokenExpiry)) {
                    setSession(serviceToken, serviceTokenExpiry, userDetails);
                    const user = JSON.parse(userDetails);

                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const TOKEN_VALIDITY_DAYS = 7;
        const response = await axios.post('/login', { email, password });
        const { status } = response.data;
        const { token, user } = response.data.data;

        if (status === true) {
            const expiryTime = (Date.now() + TOKEN_VALIDITY_DAYS * 24 * 60 * 60 * 1000).toString();
            const userDetails = JSON.stringify(user);
            setSession(token, expiryTime, userDetails);
        }
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (firstName, lastName, company_name, email, mobile, password) => {
        const response = await axios.post('/register', {
            first_name: firstName,
            last_name: lastName,
            company_name: company_name,
            email: email,
            mobile: mobile,
            password: password,
            password_confirmation: password
        });
        console.log(response, 'response');
        return response;
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async (email) => {
        const emailVerification = {
            email: email,
            send_otp_reason: 'emailVerification' //"resetPassword" or "emailVerification"
        };
        console.log(emailVerification);
    };

    const updateProfile = () => {};

    const updateUserDetails = (updatedUser) => {
        try {
            // Update user details in localStorage
            const userDetails = JSON.stringify(updatedUser);
            localStorage.setItem('userDetails', userDetails);

            // Dispatch action to update user in state
            dispatch({
                type: UPDATE_USER,
                payload: {
                    user: updatedUser
                }
            });

            return true;
        } catch (err) {
            console.error('Failed to update user details:', err);
            return false;
        }
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, updateUserDetails }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
