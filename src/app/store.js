import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "../features/login/usersSlice"
import bookingsReducer from "../features/bookings/bookingsSlice"
import roomsReducer from "../features/rooms/roomsSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
        bookings: bookingsReducer,
        rooms: roomsReducer,
    },
})

export default store