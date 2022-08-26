import { SET_BOOKING_INFO } from "store/types/booking.type"

const initialState = {
    bookingInfo: [],
}

export const bookingReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_BOOKING_INFO:
            state.bookingInfo = payload
            return { ...state }

        default:
            return state
    }
}
