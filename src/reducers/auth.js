import {LOAD_CARS, LOAD_USER, LOGIN, LOGOUT, SIGNUP} from "./types";

const initialState = {
    id: null,
    username:"",
    password:"",
    first_name:"",
    last_name:"",
    email:"",
    isAuthenticated: false,
    isStaff: false,
    cars: []
};

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOGIN:
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                password: payload.password,
                is_staff: payload.is_staff,
                isAuthenticated: true,
            };
        case SIGNUP:
            return {
                ...state,
                username: payload.username,
                password: payload.password,
            };
        case LOGOUT:
            return {
                ...state,
                username:"",
                password:"",
                first_name:"",
                last_name:"",
                email:"",
                isAuthenticated: false,
            };
        case LOAD_USER:
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                is_staff: payload.is_staff,
            };
        case LOAD_CARS:
            return {
                ...state,
                cars: [payload.cars],
            };
        default:
            console.log("default");
            return state;
    }
};

export default authReducer;