import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  usersReducer,
  alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
