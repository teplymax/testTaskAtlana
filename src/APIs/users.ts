//------------Utils----------------------------
import { fetchRequest } from "../utils";

//------------Libraries--------------------------
import { Dispatch } from "redux";

//-----------Helpers----------------------------
import { responseHandler } from "../helpers";

//----------Redux-------------------------------
import { RootState } from "./../redux/reducers/rootReducer";
import {
  getUsersErrorAction,
  getUsersSuccessAction,
  getUsersRequestAction,
} from "../redux/actions/usersActions";
import { showAlertAction } from "./../redux/actions/alertActions";
import store from "..";

//-----------------------Get users----------------------------------------

export const getUsers =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(getUsersRequestAction());

    const { usersPage } = getState().usersReducer;

    const response = await fetchRequest(
      `users?since=${usersPage}&per_page=30`,
      "GET"
    );

    const error = responseHandler(response);

    if (!error) {
      dispatch(getUsersSuccessAction({ users: response.data }));
    } else {
      dispatch(getUsersErrorAction());
      dispatch(showAlertAction(error));
    }
  };

//-----------------------Search users----------------------------------------

export const searchUsers =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(getUsersRequestAction());

    const { usersPage, searchUsersQuery } = getState().usersReducer;

    const response = await fetchRequest(
      `search/users?q=${searchUsersQuery}&since=${usersPage}&per_page=100`,
      "GET"
    );

    const error = responseHandler(response);

    if (!error) {
      dispatch(getUsersSuccessAction({ users: response.data.items }));
    } else {
      dispatch(getUsersErrorAction());
      dispatch(showAlertAction(error));
    }
  };

//-------------------Get user details------------------------------------

export const getUserDetails = async (
  user: string,
  setLoading: (loading: boolean) => void,
  onSuccess: (data: any) => void
) => {
  setLoading(true);

  let requests = [];

  requests.push(fetchRequest(`users/${user}`, "GET"));
  requests.push(fetchRequest(`users/${user}/repos`, "GET"));

  Promise.all(requests)
    .then((responses) => {
      const error1 = responseHandler(responses[0]);
      const error2 = responseHandler(responses[1]);

      if (!error1 && !error2) {
        onSuccess({
          ...responses[0].data,
          reposList: responses[1].data,
          filteredReposList: responses[1].data,
        });
        console.log({
          ...responses[0].data,
          reposList: responses[1].data,
          filteredReposList: responses[1].data,
        });
      } else {
        store.dispatch(showAlertAction(error1));
        store.dispatch(showAlertAction(error2));
      }
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
};
