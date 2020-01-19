import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import CryptoJS from 'crypto-js';

const initialState = {
    error: null,
    loading: false,
    loggedIn: sessionStorage.getItem("loggedIn"),
    locations: sessionStorage.getItem("locations"),
};

const authStart = ( state, action ) => {
    return updateObject(
        state, {
            error: null,
            loading: true,
            loggedIn: false
        } );
};

const authSuccess = (state, action) => {
    const isLoggedIn = action.authData.error == null
    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("token", CryptoJS.AES.encrypt(action.authData.tokenType + " " + action.authData.accessToken, "noOne Cancrack myKey"));
    // const bytes = CryptoJS.AES.decrypt(sessionStorage.getItem("token").toString(), "noOne Cancrack myKey");
    // console.log(bytes.toString(CryptoJS.enc.Utf8));

    return updateObject( state, {
        error: null,
        loading: false,
        loggedIn: isLoggedIn
    } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        loggedIn: false
    });
}

const getStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const getFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const setStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const setFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const updateLocation = ( state, action ) => {
    sessionStorage.setItem("locations", action.data.locations)
    console.log(action.data.locations)

    let tempState = updateObject( state,
        {
            loading: false
        });
    tempState.locations = {
        ...action.data.locations
    };

    return tempState
};

const logout = (state) => {
    sessionStorage.setItem("loggedIn", false);
    sessionStorage.setItem("locations", null);
    sessionStorage.setItem("token", "");

    return updateObject( state, { loggedIn: false, locations: null } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.GET_START: return getStart(state, action);
        case actionTypes.GET_FAIL: return getFail(state, action);
        case actionTypes.GET_LOCATIONS: return updateLocation(state, action);
        case actionTypes.SET_LOCATION: return updateLocation(state, action);
        case actionTypes.SET_START: return setStart(state, action);
        case actionTypes.SET_FAIL: return setFail(state, action);
        case actionTypes.LOGOUT: return logout(state);
        default:
            return state;
    }
};

export default reducer;