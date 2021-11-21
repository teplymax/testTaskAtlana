import { AlertActionTypes } from "../actions/actionTypes";

interface IAlertState {
  message: string;
  show: boolean;
}

interface IAction {
  type: AlertActionTypes.SHOW_ALERT;
  payload?: any;
}

const initialState: IAlertState = {
  message: "",
  show: false,
};

const alertReducer = (state = initialState, action: IAction): IAlertState => {
  switch (action.type) {
    case AlertActionTypes.SHOW_ALERT:
      return { ...state, message: action.payload, show: !state.show };

    default:
      return state;
  }
};

export default alertReducer;
