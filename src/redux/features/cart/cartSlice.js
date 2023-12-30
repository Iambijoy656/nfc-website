import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exiting = state.templates.find(
        (template) => template._id === action.payload._id
      );

      const existingVariant = state.templates.find(
        (template) => template.variantName === action.payload.variantName
      );

      if (exiting && existingVariant) {
        exiting.quantity = exiting?.quantity + 1;
      } else {
        state.templates.push({ ...action?.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },

    removeOne: (state, action) => {
      const exiting = state.templates.find(
        (template) => template._id === action.payload._id
      );

      const existingVariant = state.templates.find(
        (template) => template.variantName === action.payload.variantName
      );

      if ((exiting && existingVariant) && (exiting?.quantity > 1)) {
        exiting.quantity = exiting?.quantity - 1;
      }

      state.total -= action.payload.price;
    },


    
    // removeFromCart: (state, action) => {
    //   state.templates = state.templates.filter(
    //     (template) => template._id !== action.payload._id
    //   );
    // },

    removeFromCart: (state, action) => {
        state.templates = state.templates.filter(
          (template) => template._id !== action.payload._id || template.variantName !== action.payload.variantName
        );
      }
      
  },
});

export const { addToCart, removeOne, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
