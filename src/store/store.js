import {configureStore} from "@reduxjs/toolkit"
import itemSlice from "../redux/itemSlice"
import favoriteSlice from "../redux/FavSlice"

export const store = configureStore({
    reducer:{
        itemShop:itemSlice,
        favoriteSlice
        
    }
})