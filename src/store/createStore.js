// import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import productReducer from "./products";
import shopReducer from "./shops";
import usersReducer from "./users";

// import postsReducer from "./postsSlice";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    // auth: authReducer,
    message: messageReducer,
    users: usersReducer,
    shops: shopReducer,
    products: productReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
