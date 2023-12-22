import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../Todoslice";

const store = configureStore({
    reducer: {
        todo: TodoReducer,
    },
});

export default store;