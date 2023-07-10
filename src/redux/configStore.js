import { configureStore } from "@reduxjs/toolkit";
import { sinhVienReducer } from "./reducer/sinhVienReducer";

export const store = configureStore({
  reducer: {
    sinhVien: sinhVienReducer,
  },
});
