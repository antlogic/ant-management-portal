import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import CryptoJS from 'crypto-js';

const initialState = {
    error: null,
    loading: false,
    loggedIn: sessionStorage.getItem("loggedIn"),
    locations: JSON.parse(sessionStorage.getItem("locations")),
    images: JSON.parse(sessionStorage.getItem("images")),
    slides: JSON.parse(sessionStorage.getItem("slides")),
    displays: null,
    firstName: sessionStorage.getItem("firstName"),
    lastName: sessionStorage.getItem("lastName"),
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
    sessionStorage.setItem("firstName", action.authData.firstName);
    sessionStorage.setItem("lastName", action.authData.lastName)

    return updateObject( state, {
        error: null,
        loading: false,
        loggedIn: isLoggedIn,
        firstName: action.authData.firstName,
        lastname: action.authData.lastName
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

// const updateLocation = ( state, action ) => {
//     sessionStorage.setItem("locations", JSON.stringify( action.data.locations ) )
//
//     let tempState = updateObject( state,
//         {
//             loading: false
//         });
//     tempState.locations = {
//         ...action.data.locations
//     };
//
//     return tempState
// };
//
// const updateDisplays = ( state, action ) => {
//     sessionStorage.setItem("displays", JSON.stringify( action.data.displays ) )
//
//     let tempState = updateObject( state,
//         {
//             loading: false
//         });
//     tempState.locations = {
//         ...action.data.locations
//     };
//
//     return tempState
// };

const update = (state, action, name) =>{
    sessionStorage.setItem(name, JSON.stringify( action.data[name] ) )


    let tempState = updateObject( state,
        {
            loading: false
        });
    tempState[name] = {
        ...action.data[name]
    };

    // console.log("State afterwards")
    // console.log(tempState);

    return tempState
}

const logout = (state) => {
    sessionStorage.setItem("loggedIn", false);
    sessionStorage.setItem("locations", null);
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("firstName", "");
    sessionStorage.setItem("lastName", "");
    sessionStorage.setItem("url", "")

    return updateObject( state, { loggedIn: false, locations: null } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.GET_START: return getStart(state, action);
        case actionTypes.GET_FAIL: return getFail(state, action);
        case actionTypes.GET_LOCATIONS: return update(state, action, "locations");
        case actionTypes.SET_LOCATION: return update(state, action, "locations");
        case actionTypes.GET_DISPLAYS: return update(state, action, "displays");
        case actionTypes.SET_DISPLAYS: return update(state, action, "displays");
        case actionTypes.GET_IMAGES: return update(state, action, "images");
        case actionTypes.SET_IMAGES: return update(state, action, "images");
        case actionTypes.GET_SLIDES: return update(state, action, "slides");
        case actionTypes.SET_SLIDE: return update(state, action, "slides");
        case actionTypes.SET_START: return setStart(state, action);
        case actionTypes.SET_FAIL: return setFail(state, action);
        case actionTypes.LOGOUT: return logout(state);
        default:
            return state;
    }
};

export default reducer;