import { createSlice } from '@reduxjs/toolkit'
import { RoomInterface } from '../../interfaces/roomInterface'
import { GetRooms, EditRoom, DeleteRoom } from './roomsThunk'

interface roomsState {
    data: RoomInterface[]
    status: 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: string | null
}

const initialState: roomsState = {
    data: [],
    status: "idle",
    error: null,
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetRooms.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetRooms.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.data = action.payload
            })
            .addCase(GetRooms.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload as string
            })
            .addCase(EditRoom.fulfilled, (state, action) => {
                state.data = state.data.map(room =>
                    room._id === action.payload._id ? action.payload : room
                )
            })
            .addCase(DeleteRoom.fulfilled, (state, action) => {
                state.data = state.data.filter(room => room._id !== action.payload)
            })
    },
})

export default roomsSlice.reducer
