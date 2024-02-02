import {configureStore} from "@reduxjs/toolkit"
import itemSlice from "../redux/itemSlice"

export const store = configureStore({
    reducer:{
        itemShop:itemSlice
    }
})