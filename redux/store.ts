import { createStore } from "redux";
import rootReducer, { RootState } from "./rootReducer";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { persistStore } from "redux-persist";
import { devToolsEnhancer } from "redux-devtools-extension";

const makeStore: MakeStore<RootState> = (context: Context) => {
  let store;
  const isClient = typeof window !== "undefined";
  if (isClient) {
    const { persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "root",
      storage,
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      devToolsEnhancer({})
    );

    persistStore(store);
    // store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer);
  }

  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: false });
