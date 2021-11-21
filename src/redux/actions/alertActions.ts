import { AlertActionTypes } from "./actionTypes";

export const showAlertAction = (payload: any) => ({
  type: AlertActionTypes.SHOW_ALERT,
  payload,
});
