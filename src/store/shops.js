import { createAction, createSlice } from "@reduxjs/toolkit";
import ShopService from "../services/shop.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
};

const shopsSlice = createSlice({
    name: "shops",
    initialState,
    reducers: {
        shopsRequested: (state) => {
            state.isLoading = true;
        },
        shopCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
    }
});
const { reducer: shopsReducer, actions } = shopsSlice;
const { shopsRequested } = actions;

const shopCreateRequested = createAction("shops/shopCreateRequested");
const createShopFailed = createAction("shops/createShopFailed");

function createShop(payload) {
    return async function (dispatch) {
        dispatch(shopCreateRequested());
        try {
            const { content } = await ShopService.create(payload);
            dispatch(shopCreated(content));
            // history.push("/users");
        } catch (error) {
            dispatch(createShopFailed(error.message));
        }
    };
};