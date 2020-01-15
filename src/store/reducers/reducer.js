import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    error: null,
    loading: false,
    loggedIn: false,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true, loggedIn: false } );
};

const authSuccess = (state, action) => {
    const isLoggedIn = action.authData.error == null
    console.log(action.authData.error)
    return updateObject( state, {
        error: action.authData.error,
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        default:
            return state;
    }
};

export default reducer;