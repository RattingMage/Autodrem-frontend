import {LOAD_ORDER, CREATE_ORDER, ADD_ITEM, CREATE_REPAIR, SAVE_MESSAGES, UPDATE_REPAIR} from "./types";

const initialState = {
    order_id: null,
    items: [],
    final_price: null,
    status: "",
    user: null,
    repair_request: null,
    messages: [],
};

const serviceReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOAD_ORDER:
            return {
                ...state,
                order_id: payload.id,
                final_price: payload.final_price,
                status: payload.status,
                user: payload.user,
                repair_request: payload.repair_request,
                items: payload.items
            }
        case CREATE_ORDER:
            return {
                ...state,
                order_id: payload.id,
                final_price: payload.final_price,
                status: payload.status,
                user: payload.user,
                repair_request: payload.repair_request,
                items: payload.items
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, payload.item]
            }
        case CREATE_REPAIR:
            console.log(payload.repair_request_id);
            return {
                ...state,
                repair_request: payload.repair_request_id
            }
        case UPDATE_REPAIR:
            return {
                ...state,
                repair_request: payload.repair_request_id
            }
        case SAVE_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, payload.message]
            }
        default:
            console.log("default");
            return state;
    }
}

export default serviceReducer;