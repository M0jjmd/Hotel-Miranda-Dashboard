import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../features/login/usersSlice"
import bookingsReducer from "../features/bookings/bookingsSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
        bookings: bookingsReducer,
    },
})

export default store