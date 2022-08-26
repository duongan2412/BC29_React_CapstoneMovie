import { SET_BOOKING_INFO } from "store/types/booking.type";


export const setBookingInfoAction = (data) => {
    return {
        type: SET_BOOKING_INFO,
        payload: data
    }
}
