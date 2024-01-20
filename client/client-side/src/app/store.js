import { configureStore } from "@reduxjs/toolkit";
import { fetchingApi } from "../api/fetching";
import actionsSliceReducer from "../actions/actionsSlice";

const store = configureStore({
    reducer: {
        actionsSlice: actionsSliceReducer,
        [fetchingApi.reducerPath] : fetchingApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(fetchingApi.middleware)
});

export default store
