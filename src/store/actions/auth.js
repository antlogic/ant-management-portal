import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (config, isLogin) => {
    return dispatch => {
        dispatch(authStart());
        const url = isLogin ?
            "https://antlogic-backend-services.herokuapp.com/antlogic/api/auth/signin" :
            "https://antlogic-backend-services.herokuapp.com/antlogic/api/auth/signup";

        const headers = {
            headers: config.headers
        }

        axios.post(url,
            config.data,
            headers)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err))
            })
    }
}