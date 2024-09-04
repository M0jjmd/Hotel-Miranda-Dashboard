import { createSlice } from '@reduxjs/toolkit'
import { Room } from '../../interfaces/roomInterface'
import { GetRooms, EditRoom, DeleteRoom } from './roomsThunk'

interface roomsState {
    data: Room[]
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
                state.error = action.error.message || null
            })
            .addCase(EditRoom.fulfilled, (state, action) => {
                state.data = state.data.map(room =>
                    room.id === action.payload.id ? action.payload : room
                )
            })
            .addCase(DeleteRoom.fulfilled, (state, action) => {
                state.data = state.data.filter(room => room.id !== action.payload)
            })
    },
})

export default roomsSlice.reducer
