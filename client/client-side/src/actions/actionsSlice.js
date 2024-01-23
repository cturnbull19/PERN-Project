import { createSlice } from '@reduxjs/toolkit'

const initialState = { userId: localStorage.getItem('userId') === null ? '' : JSON.parse(localStorage.getItem('userId')), reservations: [], token: localStorage.getItem('token') === null ? '' : JSON.parse (localStorage.getItem('token'))}

const actionsSlice = createSlice({
    name: 'actionsSlice',
    initialState,
    reducers: {
        updateToken: (state, { payload }) => {
            state.token = payload;
            localStorage.setItem('token', JSON.stringify(state.token))
        },

        updateUserId: (state, { payload }) => {
            state.userId = payload;
            localStorage.setItem('userId', JSON.stringify(state.userId))
        },

        updateReservations: (state, { payload }) => {
            state.reservations = payload;
        }
    },
});

export const { updateToken, updateReservations, updateUserId } = actionsSlice.actions;

export const selectToken = (state) => state.token;
export const selectReservations = (state) => state.reservations;
export const selectUserId = (state) => state.userId;

export default actionsSlice.reducer;