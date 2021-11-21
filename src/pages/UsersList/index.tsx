//-----------Basic imports----------------------------
import React from "react";
import "./UsersList.scss";

//----------Components----------------------------------------------
import { Button, Loader, SearchInput } from "../../components";

//----------Libraries----------------------------------------------
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//----------Routes----------------------------------------------
import ROUTES from "../../route/routes";

//----------Hooks----------------------------------------------
import { useTypedSelector } from "../../hooks";

//----------APIs----------------------------------------------
import { getUsers, searchUsers } from "../../APIs/users";
import { getUsersRequestAction } from "../../redux/actions/usersActions";

interface IUser {
  avatar_url: string;
  id: string;
  login: string;
}

const UsersList: React.FC = () => {
  //-----------Hooks----------------------------

  const { loading, users, searchUsersQuery, loadMoreUsers } = useTypedSelector(
    (state) => state.usersReducer
  );
  const dispatch = useDispatch();

  //-----------Handlers----------------------------

  const loadMoreBtnHandler = () => {
    if (searchUsersQuery) dispatch(searchUsers());
    else dispatch(getUsers());
  };

  const searchInputHandler = (v: string) => {
    dispatch(getUsersRequestAction({ searchUsersQuery: v }));
    if (v) {
      dispatch(searchUsers(1));
    } else dispatch(getUsers());
  };

  React.useEffect(() => {
    if (users.length === 0) dispatch(getUsers());
  }, []);

  //-----------Layout----------------------------

  return (
    <div className="usersList container">
      <div className="usersList__header">
        <h2>Github Searcher</h2>
        <SearchInput
          name="userSearcher"
          value={searchUsersQuery}
          onChange={searchInputHandler}
          placeholder="Search via gitHub users..."
        />
      </div>

      {users.length <= 0 && !loading && <p>No users found</p>}

      <ul className="usersList__content">
        {users &&
          users.map((item: IUser) => (
            <li key={item.id}>
              <Link
                to={`${ROUTES.user}/${item.login}`}
                className="usersList__item"
              >
                <img src={item.avatar_url} alt="usersAvatar" />
                <p>{item.login}</p>
              </Link>
            </li>
          ))}
        {loading ? (
          <div className="usersList__loader">
            <Loader />
          </div>
        ) : (
          loadMoreUsers && (
            <Button onClick={loadMoreBtnHandler}>
              <span>Load more</span>
            </Button>
          )
        )}
      </ul>
    </div>
  );
};

export default UsersList;
