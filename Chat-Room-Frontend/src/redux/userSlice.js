import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  avatar: "",
  token: "",
  onlineUser : [],
  socketConnection: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload?._id;
      state.firstname = action.payload?.firstname;
      state.lastname = action.payload?.lastname;
      state.username = action.payload?.username;
      state.email = action.payload?.email;
      state.avatar = action.payload?.avatar;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      Object.assign(state, initialValue);
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    }
  },
});

export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } = userSlice.actions;

export default userSlice.reducer;