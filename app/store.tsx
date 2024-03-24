"use client";
import { configureStore } from "@reduxjs/toolkit";
import guessFormReducer from "@/dux/guessFormReducer";
import guessFormMiddleware from "@/middleware/guessFormMiddleware";

export const store = configureStore({
  reducer: {
    guess: guessFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(guessFormMiddleware),
});
