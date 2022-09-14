//Import required libraies
import React from "react";
import { useParams } from "react-router-dom";

//Import Custom Component
import UnauthorizedConduitAppContainer from "../UnauthorizedConduitAppContainer/UnauthorizedConduitAppContainer";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import WorkInProgress from "../../components/WorkInProgress/WorkInProgress";

//Import Custom Hooks

//Import utils/data
function UnauthorizedConduitApp(props) {
  let { match } = props;
  const { tab } = useParams();

  const tabMapping = {
    login: {
      component: <Login match={match} isAuthorized={false} />,
    },
    home: {
      component: <Home match={match} isAuthorized={false} />,
    },
    signup: {
      component: <SignUp match={match} isAuthorized={false} />,
    },
  };

  return (
    <UnauthorizedConduitAppContainer>
      {tab ? (
        <>{tabMapping[tab] ? tabMapping[tab].component : <WorkInProgress />}</>
      ) : (
        <div>Page not found</div>
      )}
    </UnauthorizedConduitAppContainer>
  );
}

export default UnauthorizedConduitApp;
