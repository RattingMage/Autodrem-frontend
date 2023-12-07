import axios from "axios";
import {LOAD_CARS, LOAD_USER, LOGIN, LOGOUT} from "../reducers/types";

export const load = (payload) => async dispatch => {
    const token = btoa(`${payload.username}:${payload.password}`);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
        }
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/auth/profile/`, config);
        dispatch({type: LOAD_USER, payload: res.data});
        if(res.data['car'] !== null){
            const res2 = await axios.get(`http://127.0.0.1:8000/api/auth/cars/${res.data['car']}/`, config)
            const dt = {cars: res2.data};
            dispatch({type: LOAD_CARS, payload: dt});
        }
    } catch (err) {
        console.log(`${err}`)
        dispatch({type: LOGOUT});
    }
};

export const login = (payload) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username: payload.username, password: payload.password});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/auth/login/`, body, config);
        const dt = {...res.data, password : payload.password}
        dispatch({type: LOGIN, payload: dt});
    } catch (err) {
        console.log(`${err}`)
        dispatch({type: LOGOUT});
    }
};

export const signup = (payload) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username: payload.username, password: payload.password, password_repeat: payload.password_repeat});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/auth/signup/`, body, config);
        dispatch({type: LOGIN, payload: res.data});
    } catch (err) {
        console.log(`${err}`)
        dispatch({type: LOGOUT});
    }
};

export const logout = () => dispatch => (dispatch({type: LOGOUT}));

