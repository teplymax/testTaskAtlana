import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

function configureStore() {
  const middlwareEnhancer = composeWithDevTools(applyMiddleware(thunk));

  const store = createStore(rootReducer, middlwareEnhancer);

  return store;
}

export default configureStore;
