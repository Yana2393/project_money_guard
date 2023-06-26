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
import { CurrencyReducer } from './Currency/CurrencySlice';
import { ModalEditTransactionReduser } from './ModalEditTransaction/ModalEditTransactionSlice';

const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const persistConfigCurrencyDate = {
  key: 'currencyDate',
  storage,
  whitelist: ['dataCurrency', 'currency'],
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);
const persistedCurrencyReducer = persistReducer(
  persistConfigCurrencyDate,
  CurrencyReducer
);

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    auth: persistedAuthReducer,
    finance: financeReducer,
    viewport: viewportReducer,
    transaction_categories: TransactionCategoriesReducer,
    transaction_summary_controller: TransactionSummaryControllerReduser,
    modalAddOpen: ModalAddOpenReduser,
    currency: persistedCurrencyReducer,
    modaEditTransaction: ModalEditTransactionReduser,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
