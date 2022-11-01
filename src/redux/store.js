import { configureStore } from "@reduxjs/toolkit";

import { melodyApi } from "./services/melodyApi";


export const store =  configureStore({
  reducer: {
    [melodyApi.reducerPath]: melodyApi.reducer
   
  },
  middleware:  (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(melodyApi.middleware),
});