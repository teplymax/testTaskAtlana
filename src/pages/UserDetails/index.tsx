//-----------Basic imports----------------------------
import React from "react";
import "./UserDetails.scss";

//----------Libraries----------------------------------------------
import { useParams } from "react-router-dom";

//----------Components----------------------------------------------
import { Loader, SearchInput } from "../../components";

//------------APIs------------------------------------------------
import { getUserDetails } from "../../APIs/users";
import ICONS from "../../assets/icons";

interface IRouteParams {
  id: string;
}

interface IUserData {
  avatar_url?: string;
  created_at?: string;
  followers?: number;
  following?: number;
  location?: string | null;
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  reposList?: any[];
  filteredReposList?: any[];
}

interface IState {
  searchText: string;
  loading: boolean;
  userData: IUserData;
}

interface IRepo {
  id: number;
  forks?: number;
  name: string;
  stargazers_count?: number;
  html_url: string;
}

const UserDetails: React.FC = () => {
  //-----------Hooks----------------------------

  const [state, setState] = React.useState<IState>({
    searchText: "",
    loading: false,
    userData: {},
  });

  const params = useParams<IRouteParams>();

  //-----------Data----------------------------

  const { searchText, loading, userData } = state;

  //-----------Handlers----------------------------

  const inputHandler = (v: string) => {
    setState((prev) => ({
      ...prev,
      searchText: v,
      userData: {
        ...prev.userData,
        filteredReposList: prev.userData.reposList?.filter((item: IRepo) =>
          item.name.toLowerCase().includes(v.toLowerCase())
        ),
      },
    }));
  };

  const setLoading = () => {
    setState((prev) => ({ ...prev, loading: !prev.loading }));
  };

  const setUserData = (data: any) =>
    setState((prev) => ({ ...prev, userData: data }));

  React.useEffect(() => {
    getUserDetails(params?.id, setLoading, setUserData);
  }, []);

  //-----------Layout----------------------------

  return (
    <div className="userDetails container">
      <h2>Github Searcher</h2>

      {loading ? (
        <div className="userDetails__loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="userDetails__userInfo">
            <div className="userDetails__mainInfo">
              <img src={userData.avatar_url} alt="" />
              <div>
                {userData.name && (
                  <div className="userDetails__infoBlock">
                    <p className="userDetails__label">Username:</p>
                    <p>{userData.name}</p>
                  </div>
                )}

                {userData.email && (
                  <div className="userDetails__infoBlock">
                    <p className="userDetails__label">Email:</p>
                    <p>{userData.email}</p>
                  </div>
                )}

                {userData.location && (
                  <div className="userDetails__infoBlock">
                    <p className="userDetails__label">Location:</p>
                    <p>{userData.email}</p>
                  </div>
                )}

                {userData.created_at && (
                  <div className="userDetails__infoBlock">
                    <p className="userDetails__label">Join date:</p>
                    <p>{new Date(userData.created_at).toDateString()}</p>
                  </div>
                )}

                {userData.followers && (
                  <p className="userDetails__infoBlock">
                    {userData.followers} followers
                  </p>
                )}

                {userData.following && (
                  <p className="userDetails__infoBlock">
                    {userData.following} following
                  </p>
                )}
              </div>
            </div>

            {userData.bio && <p>{userData.bio}</p>}

            <SearchInput
              name="userSearcher"
              value={searchText}
              onChange={inputHandler}
              placeholder="Search via gitHub users..."
            />
          </div>

          {userData.filteredReposList &&
            userData.filteredReposList.length <= 0 && <p>No repos found</p>}

          <ul>
            {userData.filteredReposList &&
              userData.filteredReposList.map((item: IRepo) => (
                <li key={item.id}>
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="userDetails__repo"
                  >
                    <p>{item.name}</p>

                    <div className="userDetails__repoInfo">
                      <span>{item.forks} forks</span>
                      <div>
                        {item.stargazers_count}
                        <img src={ICONS.utils.starIcon} alt="" />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserDetails;
