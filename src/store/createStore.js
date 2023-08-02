// import authReducer from "./authSlice";
import activeAutorReducer from "./activeAutor";
import activeProductsReducer from "./activeProduct";
import autorProductsReducer from "./autorProducts";
import messageReducer from "./messageSlice";
import productReducer from "./products";
import shopReducer from "./shops";
import usersReducer from "./users";
import viewedReducer from "./viewed";

// import postsReducer from "./postsSlice";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    // auth: authReducer,
    message: messageReducer,
    users: usersReducer,
    shops: shopReducer,
    products: productReducer,
    viewed: viewedReducer,
    autorsProducts: autorProductsReducer,
    activeProduct: activeProductsReducer,
    activeAutor: activeAutorReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
