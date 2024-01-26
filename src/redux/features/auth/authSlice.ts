import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// ** define a type for user:
export interface IUser {
   id: string;
   role: "admin" | "faculty" | "student";
   iat: number;
   exp: number;
}

// ** Define a type for authState :
type TAuth = {
   user: IUser | null;
   token: string | null;
};
// ** InitialState define :
const initialState: TAuth = {
   user: null,
   token: null,
};

// ** Auth Slice Declaration :
const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
      },

      logOut: (state) => {
         state.user = null;
         state.token = null;
      },
   },
});

// ** destructure actions:
export const { setUser, logOut } = authSlice.actions;

// ** export slice reducer:
export default authSlice.reducer;

// ** export token an  user from here :
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const currentToken = (state: RootState) => state.auth.token;
