import { combineReducers, createStore } from 'redux';
import { userReducer } from "./reducers/user.reducer";
import { bookingReducer } from "./reducers/booking.reducer";

const rootReducer = combineReducers({
    userReducer,
    bookingReducer,
})

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)