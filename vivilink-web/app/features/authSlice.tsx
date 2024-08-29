import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    user: { email: string } | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
});

export const register = createAsyncThunk('auth/register', async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/api/auth/register', credentials);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: { email: string }; token: string }>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'succeeded';
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: { email: string }; token: string }>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'succeeded';
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to login';
                state.status = 'failed';
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to register';
                state.status = 'failed';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
