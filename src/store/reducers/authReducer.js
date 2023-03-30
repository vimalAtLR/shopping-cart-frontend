import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

let token = localStorage.getItem('token');
let user;
if (token) {
    user = jwtDecode(token);
}

// initial state
const initialState = {
    token: token ? token : "",
    name: user ? user.name : "",
    email: user ? user.email : "",
    _id: user ? user._id : "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
}

// register user async thunk
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (values, { rejectWithValue }) => {
        try{
            let token = await axios.post(`https://84bd-103-90-96-62.in.ngrok.io/api/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
            });

            localStorage.setItem('token', JSON.stringify(token.data));
            return token.data;
        } catch(err) {
            console.log("error in registerUser thunk method :: ", err)
            return rejectWithValue(err.message);
        }
    }
);

// login user async thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`https://84bd-103-90-96-62.in.ngrok.io/api/login`, {
                email: values.email,
                password: values.password,
            });

            localStorage.setItem('token', JSON.stringify(token.data));
            return token.data;
        } catch (err) {
            console.log("error in loginUser thunk method :: ", err)
            return rejectWithValue(err.message);
        }
    }

)

// createSlice for register user
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            return state = {
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" };
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerStatus: "success",
                };
            } else return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload,
            };
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginStatus: "success",
                };
            } else return state;
        });
    },
})

export const { logout } = authSlice.actions;

// Generate reducer
export const authReducer = authSlice.reducer;