// import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import usersReducer from "./users";
// import postsReducer from "./postsSlice";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    // auth: authReducer,
    message: messageReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
