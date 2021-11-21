import { UsersActionTypes } from "./actionTypes";

export const getUsersSuccessAction = (payload?: any) => ({
  type: UsersActionTypes.GET_USERS_SUCCESS,
  payload,
});

export const getUsersErrorAction = (payload?: any) => ({
  type: UsersActionTypes.GET_USERS_ERROR,
  payload,
});

export const getUsersRequestAction = (payload?: any) => ({
  type: UsersActionTypes.GET_USERS_REQUEST,
  payload,
});
