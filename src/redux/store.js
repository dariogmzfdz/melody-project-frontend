import { configureStore } from "@reduxjs/toolkit";

import { melodyApi } from "./services/melodyApi";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [melodyApi.reducerPath]: melodyApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(melodyApi.middleware),
});
