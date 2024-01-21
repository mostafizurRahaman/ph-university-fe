import { createSlice } from "@reduxjs/toolkit";

// ** InitialState define :
const initialState = {
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
export const {setUser, logOut} = authSlice.actions; 

// ** export slice reducer: 
export default authSlice.reducer; 