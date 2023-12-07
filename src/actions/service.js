import axios from "axios";
import {LOAD_ORDER, CREATE_ORDER, ADD_ITEM, CREATE_REPAIR, SAVE_MESSAGES, UPDATE_REPAIR} from "../reducers/types";

export const load_order = (payload) => async dispatch => {
    const token = btoa(`${payload.username}:${payload.password}`);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
        }
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/service/orders/${payload.order_id}/`, config);
        dispatch({type: LOAD_ORDER, payload: res.data});
    } catch (err) {
        console.log(`${err}`);
    }
};

export const create_order = (payload) => async dispatch => {
    const token = btoa(`${payload.username}:${payload.password}`);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
        }
    };

    const body = JSON.stringify({final_price: payload.final_price, status: "in process", user: payload.user_id});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/service/orders/`, body, config);
        dispatch({type: CREATE_ORDER, payload: res.data});
    } catch (err) {
        console.log(`${err}`);
    }
};

export const add_items = (payload) => async dispatch => {
    const token = btoa(`${payload.username}:${payload.password}`);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
        }
    };

    const body = JSON.stringify({item_price: payload.item_price, order: payload.order_id, service: 1, spare: payload.spare_id});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/service/order-items/`, body, config);
        const dt = {item: res.data};
        dispatch({type: ADD_ITEM, payload: dt});
    } catch (err) {
        console.log(`${err}`);
    }
};

export const create_repair = (payload) => async dispatch => {
    const token = btoa(`${payload.username}:${payload.password}`);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
        }
    };

    const body = JSON.stringify({problem: payload.problem});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/service/repair-requests/`, body, config);
        const dt = {repair_request_id: res.data["id"]};
        dispatch({type: CREATE_REPAIR, payload: dt});
    } catch (err) {
        console.log(`${err}`);
    }
}

export const update_repair = (payload) => async dispatch => {
    const token = btoa(`${payload.username}:${payload.password}`);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`,
        }
    };

    const body = JSON.stringify({problem: payload.problem});

    try {
        const res = await axios.patch(`http://127.0.0.1:8000/api/service/repair-requests/${payload.repair_id}/`, body, config);
        const dt = {repair_request_id: res.data["id"]};
        dispatch({type: UPDATE_REPAIR, payload: dt});
    } catch (err) {
        console.log(`${err}`);
    }
}

export const save_messages = (payload) => dispatch => {
    dispatch({type: SAVE_MESSAGES, payload: payload});
}