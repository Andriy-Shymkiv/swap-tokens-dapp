import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import appSlice from './appSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  app: appSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = (): { store: ToolkitStore; persistor: Persistor } => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['store']['dispatch'];

const { store, persistor } = setupStore();
export { store, persistor };
