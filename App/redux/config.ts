import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import storage from '@react-native-community/async-storage';

import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['APPSTATE'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
