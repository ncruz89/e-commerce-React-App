import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";

import { persistStore, persistReducer } from "redux-persist"; // persist library to store current states in browsers local storage
import storage from "redux-persist/lib/storage"; // storage to localstorage by default

import { logger } from "redux-logger";

import { rootReducer } from "./root-reducer";

// persist config boilerplate - blacklisted user to prevent auth problems
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

// create new reducer with persist library - persist boilerplate
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create middleware to add redux logger only while in development
// use .filter to prevent passing 'false' as a middleware
// therefore only passes when 'true' allowing middleWares to be set to logger
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

// redux devtools boilerplate
// create new enhancer that runs redux devtools if passes - if not just simply use redux compose
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__) ||
  compose;

// compose enhancers for store with added features like redux dev tools
// replaced redux compose function with composeEnhancer function created above
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// store creation - rootReducer, additional default states (not needed for this project), store enhancers (in this project just middleware)
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
// create persistor component using updated store with persistedReducer
export const persistor = persistStore(store);
