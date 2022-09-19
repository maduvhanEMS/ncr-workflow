import { configureStore } from "@reduxjs/toolkit";
import ncrReducer from "../features/ncr/ncrSlice";

export const store = configureStore({
  reducer: {
    ncrs: ncrReducer,
  },
});
