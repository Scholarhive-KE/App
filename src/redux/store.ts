import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import profileSlice from "./slices/profileSlice";
import studentSlice from "./slices/studentSlice";
import courseSlice from "./slices/courseSlice";
import scholarshipSlice from "./slices/scholarshipSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["profile"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    profile: profileSlice,
    student: studentSlice,
    course: courseSlice,
    scholarship: scholarshipSlice,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
