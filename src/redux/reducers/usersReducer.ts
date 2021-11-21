import { UsersActionTypes } from "../actions/actionTypes";

interface IUsersState {
  users: never[];
  usersPage: number;
  loadMoreUsers: boolean;
  loading: boolean;
  searchUsersQuery: string;
}

interface IAction {
  type:
    | UsersActionTypes.GET_USERS_ERROR
    | UsersActionTypes.GET_USERS_REQUEST
    | UsersActionTypes.GET_USERS_SUCCESS;
  payload?: any;
}

const initialSatate = {
  users: [],
  usersPage: 1,
  loadMoreUsers: true,
  loading: false,
  searchUsersQuery: "",
};

const usersReducer = (state = initialSatate, action: IAction): IUsersState => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: !state.searchUsersQuery && state.usersPage && true,
        ...action.payload,
      };

    case UsersActionTypes.GET_USERS_SUCCESS: {
      const { users, usersPage } = action.payload;

      if (users) {
        return {
          ...state,
          users: state.usersPage === 1 ? users : [...state.users, ...users],
          usersPage: usersPage ? usersPage : users.slice(-1)[0]?.id,
          loadMoreUsers: users.length > 0,
          loading: false,
        };
      }
      return { ...state, ...action.payload, loading: false };
    }

    case UsersActionTypes.GET_USERS_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default usersReducer;
