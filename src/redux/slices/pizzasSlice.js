import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus', async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const {data} = await axios.get(
            `https://639601bf90ac47c6807a740d.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
      return data;
    }
);

const initialState = {
    items: [],
    status: 'loading',
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
       state.status = 'loading';
       state.items =  [];
      },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items =  action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
        state.status = 'error';
        console.error('ERROR', 'Ошибка при получении пицц');
        state.items =  [];
    }
  }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
