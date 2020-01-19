import * as actionTypes from './actionTypes'
import axios from 'axios'
import CryptoJS from "crypto-js"

export const getStart = () => {
    return {
        type: actionTypes.GET_START,
    }
}

export const setStart = () => {
    return {
        type: actionTypes.SET_START,
    }
}

export const getFail = (err) => {
    return {
        type: actionTypes.GET_FAIL,
        error: err,
    }
}

export const setFail = (err) => {
    return {
        type: actionTypes.SET_FAIL,
        error: err,
    }
}

export const getLocations = (locations) => {

    return {
        type: actionTypes.GET_LOCATIONS,
        data: locations
    }
}

export const SetLocation = (locations) => {
    return {
        type: actionTypes.SET_LOCATION,
        data: locations
    }
}

export const logOutUser = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


export const GetRequest = (to) => {
    return dispatch => {
        dispatch(getStart());
        const url = "https://antlogic-backend-services.herokuapp.com/upsign/v1/" + to;
        const bytes = sessionStorage.getItem("token");

        axios.get(
            url,
            {
                headers:{
                    Authorization: CryptoJS.AES.decrypt(bytes.toString(), "noOne Cancrack myKey").toString(CryptoJS.enc.Utf8)
                },
            })
            .then(response => {
                console.log(response)
                dispatch(getLocations(response.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(getFail(err))
            })
    }
}

export const SetRequest = (to, config) => {
    return dispatch => {
        dispatch(setStart());
        const url = "https://antlogic-backend-services.herokuapp.com/upsign/v1/" + to;
        const bytes = sessionStorage.getItem("token");

        axios.post(
            url,
            config,{
                headers:{
                    Authorization: CryptoJS.AES.decrypt(bytes.toString(), "noOne Cancrack myKey").toString(CryptoJS.enc.Utf8)
                },
            })
            .then(response => {
                console.log(response)
                dispatch(SetLocation(response.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(setFail(err))
            })
    }
}

export const logOut = () => {
    return dispatch => {
        dispatch(logOutUser());
    }
}

