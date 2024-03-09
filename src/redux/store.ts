import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
// ** Persist setup:
// step 1: import redux persisStore and persistReducer
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// ** Step 2: import storage for persist store in local: (it's default)
import storage from "redux-persist/lib/storage";

// ** import reducer which we need to persist:
import authReducer from "./features/auth/authSlice";

// Step 3: Create config for Persist:
const persistConfig = {
  key: "root",
  storage,
};

// **  Step 4: Setup create a persistReducer by using persisReducer():
const persistedReducer = persistReducer(persistConfig, authReducer);

// ** Step 5: Replace in store the authReducer with persistedReducer:
//  ** create a redux store:
export const store = configureStore({
  reducer: {
    auth: persistedReducer,

    //  ** connect baseAPi:
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), //  ** connect baseAPi with middleware
});

// ** Step 6: Create a new store byUsing persisStore:

export const persistore = persistStore(store);

// ** Root State Type:
export type RootState = ReturnType<typeof store.getState>;

// ** dispatch type in Store:
export type AppDispatch = typeof store.dispatch;
