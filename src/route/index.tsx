//-------------------Basic imports------------------------------------------------
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//-------------------Pages------------------------------------------------
import { UserDetails, UsersList } from "../pages";

//-------------------Routes------------------------------------------------
import ROUTES from "./routes";

function MainRouter() {
  //-------------------Layout------------------------------------------------

  return (
    <>
      <Switch>
        <Route exact path={ROUTES.home} component={UsersList} />
        <Route exact path={`${ROUTES.user}/:id`} component={UserDetails} />
        <Route path={ROUTES.notFound}>
          <Redirect to={ROUTES.home} />
        </Route>
      </Switch>
    </>
  );
}

export default MainRouter;
