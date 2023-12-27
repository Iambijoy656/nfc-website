import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    templates: [],
  }
  

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state,action) => {
            state.templates.push(action.payload)
        }
    },
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer