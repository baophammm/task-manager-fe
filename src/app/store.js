import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";

const rootReducer = {
  project: projectReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
