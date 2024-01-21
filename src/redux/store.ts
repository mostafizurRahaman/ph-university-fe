import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";

//  ** create a redux store:
export const store = configureStore({
   reducer: {
      auth: authReducer,
      //  ** connect baseAPi: 
      [baseApi.reducerPath]: baseApi.reducer,
   },

   middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(baseApi.middleware),  //  ** connect baseAPi with middleware
});

// ** Root State Type:
export type RootState = ReturnType<typeof store.getState>;

// ** dispatch type in Store:
export type AppDispatch = typeof store.dispatch;
