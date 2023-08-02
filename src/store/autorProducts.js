import { createSlice } from "@reduxjs/toolkit";
import AutorProductsService from "../services/autorProducts.service";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false,
    user_id: null
};
const autorProductsSlice = createSlice({
    name: "autorsProducts",
    initialState,
    reducers: {
        autorProductsRequested: (state, action) => {
            state.isLoading = true;
            state.user_id = action.payload;
        },
        autorProductsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        autorProductRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
});

const { reducer: autorProductsReducer, actions } = autorProductsSlice;
const { autorProductsRequested, autorProductsReceved, autorProductRequestFiled } = actions;

export const loadAutorProducts = (id) => async (dispatch, getState) => {
    dispatch(autorProductsRequested(id));
    try {
        const { content } = await AutorProductsService.getProductsByIdUser(id);
        dispatch(autorProductsReceved(content));
    } catch (error) {
        dispatch(autorProductRequestFiled(error.message));
    }
};
export const getAutorsProductList = () => (state) => state.autorsProducts?.entities ? state.autorsProducts.entities : [];
export const getAutorsProductLoaded = () => (state) => state.autorsProducts.dataLoaded;

export default autorProductsReducer;
