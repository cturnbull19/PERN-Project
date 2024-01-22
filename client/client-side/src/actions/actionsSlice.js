import { createSlice } from '@reduxjs/toolkit'

const initialState = { reservations: [], token: localStorage.getItem('token') === null ? '' : JSON.parse (localStorage.getItem('token'))}

const actionsSlice = createSlice({
    name: 'actionsSlice',
    initialState,
    reducers: {
        updateToken: (state, { payload }) => {
            state.token = payload;
            localStorage.setItem('token', JSON.stringify(state.token))
        },

        updateReservations: (state, { payload }) => {
            state.reservations = payload;
        }
    },
});

export const { updateToken } = actionsSlice.actions;

export const selectToken = (state) => state.token;
export const selectReservations = (state) => state.reservations;

export default actionsSlice.reducer;