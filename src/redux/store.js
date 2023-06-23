import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { authReducer } from './Auth/authSlice';
import { transactionReducer } from './Transaction/transactionSlice';
import { financeReducer } from './Finance/financeSlice';
import { viewportReducer } from './Viewport/viewportSlice';
import { TransactionCategoriesReducer } from './TransactionCategories/TransactionCategoriesSlice';
import { TransactionSummaryControllerReduser } from './TransactionSummaryController/TransactionSummaryControllerSlice';
import { ModalAddOpenReduser } from './ModalAddOpen/ModalAddOpenSlice';

const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    auth: persistedAuthReducer,
    finance: financeReducer,
    viewport: viewportReducer,
    transaction_categories: TransactionCategoriesReducer,
    transaction_summary_controller: TransactionSummaryControllerReduser,
    modalAddOpen: ModalAddOpenReduser,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
