import { createSlice } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productRequested: (state) => {
            state.isLoading = true;
        },
        productCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        productReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productRequestSuccess: (state) => {
            state.dataLoaded = true;
        },
        productRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productLogOut: (state) => {
            state.entities = null;
            state.dataLoaded = false;
        },
        productUpdated: (state, action) => {
            state.entities = state.entities.map(e => {
                if (e._id === action.payload._id) {
                    return action.payload;
                }
                return e;
            });
        },
        productUpdatedFailed: (state, action) => {
            state.error = action.payload;
        },
    }
});
const { reducer: productReducer, actions } = productsSlice;
const { productRequested, productCreated, productReceved, productRequestFiled, productLogOut, productUpdated, productUpdatedFailed, productRequestSuccess } = actions;

// const productCreateRequested = createAction("products/productCreateRequested");
// const createproductFailed = createAction("products/createproductFailed");

export const createProduct = (payload, redirect) => async (dispatch) => {
    dispatch(productRequested());
    try {
        const { content } = await ProductService.create(payload);
        if (content) {
            dispatch(productRequestSuccess());
            dispatch(productCreated(content));
        }
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(productRequestFiled(errorMessage));
        } else {
            dispatch(productRequestFiled(error.message));
        }
    }
};

export const updateProduct = (payload) => async (dispatch, getState) => {
    try {
        const { content } = await ProductService.put(payload);
        dispatch(productUpdated(content));
    } catch (error) {
        dispatch(productUpdatedFailed(error.message));
    }
};

export const loadProducts = () => async (dispatch, getState) => {
    if (!dispatch(getProductLoading())) {
        dispatch(productRequested());
        try {
            const { content } = await ProductService.getProducts();
            dispatch(productReceved(content));
        } catch (error) {
            dispatch(productRequestFiled(error.message));
        }
    }
};
export const logOutProduct = () => (dispatch) => {
    dispatch(productLogOut());
};

export const getProductErrors = () => (state) => state.products.error;
export const getProductLoading = () => (state, dispatch) => dispatch(state).products.isLoading;
export const getProductIsLoading = () => (state, dispatch) => state.products.dataLoaded;
export const getProductList = () => (state, dispatch) => state.products.entities;

export default productReducer;
