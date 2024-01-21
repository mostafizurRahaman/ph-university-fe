import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";

//  ** create a redux store:
export const store = configureStore({
   reducer: {
      auth: authReducer,
      [baseApi.reducerPath]: baseApi.reducer,
   },

   middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(baseApi.middleware),
});

// ** Root State Type:
export type RootState = ReturnType<typeof store.getState>;

// ** dispatch type in Store:
export type AppDispatch = typeof store.dispatch;
