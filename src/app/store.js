import { configureStore } from "@reduxjs/toolkit"
import loginUserReducer from "../features/login/loginUserSlice"
import bookingsReducer from "../features/bookings/bookingsSlice"
import roomsReducer from "../features/rooms/roomsSlice"
import usersReducer from "../features/users/usersSlice"
import contactsReducer from "../features/contacts/contactsSlice"

const store = configureStore({
    reducer: {
        loginUser: loginUserReducer,
        bookings: bookingsReducer,
        rooms: roomsReducer,
        users: usersReducer,
        contacts: contactsReducer
    },
})

export default store