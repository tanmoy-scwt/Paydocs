import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
// import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

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
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post('/register', {
            // id,
            first_name: firstName,
            last_name: lastName,
            company_name,
            email,
            mobile,
            password,
            password_confirmation: password
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
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

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
