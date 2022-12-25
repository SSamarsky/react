import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
  countItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
       const findItem = state.items.find(obj => obj.id === action.payload.id);

       if (findItem) {
        findItem.count++;
       } else {
        state.items.push({
            ...action.payload,
            count: 1,
        });
       }

       state.totalPrice = state.items.reduce((sum, obj) =>{
        return (Number(obj.price) * Number(obj.count)) + sum;
       }, 0);

      state.countItems = state.items.reduce((sum, obj) => {
        return sum += obj.count;
    }, 0);
    },
    minusItem(state, action) {
        const findItem = state.items.find(obj => obj.id === action.payload);
        findItem.count--;

        state.totalPrice -= findItem.price;
        state.countItems--;
    },  
    removeItem(state, action) {
        const findItem = state.items.find(obj => obj.id === action.payload);
        state.countItems -= findItem.count;
        state.totalPrice -= findItem.price * findItem.count;
        state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    clearItems(state) {
        state.items = [];
        state.totalPrice = 0;
        state.countItems = 0;
    }
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
