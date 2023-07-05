import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  
  //THIS IS FOR TRY CATCH THUNK
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
                                    // DONT GIVE ASYNC CALLS IN REDUCERS
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },



  //   THIS IS FOR THE createAsyncThunk
  //   AND THIS IS SIMILAR TO Promise CONVENTION
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//THIS IS THUNK (SIMPLER WAY)
// export function fetchProducts() {
//   return async function fetchProductsThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));

//     try {
//       const rest = await fetch("https://fakestoreapi.com/products");
//       const data = await rest.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }


export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const rest = await fetch("https://fakestoreapi.com/products");
  const data = await rest.json();
  return data;
});
