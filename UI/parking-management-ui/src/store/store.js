import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers";
import api from "./middleware/api";
export const createStore = () => {
  return configureStore({
    reducer: reducer,
    middleware: [api],
  });
};
