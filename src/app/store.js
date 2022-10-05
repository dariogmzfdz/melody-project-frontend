import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../feautures/userSlice'

export default configureStore({
    reducer: {
        user: userReducer,
    },
});