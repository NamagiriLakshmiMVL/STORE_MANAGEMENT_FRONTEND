import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    favItems:[]
}

const FavSlice = createSlice({
    name:"favorites",
    initialState,
    reducers:{
        favorites:(state,action)=>{
            let newData = state.favItems.push(action.payload)
            console.log(newData)
        }
    }
})

export const {favorites} = FavSlice.actions

export default FavSlice.reducer

