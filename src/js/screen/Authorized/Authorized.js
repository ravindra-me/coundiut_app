import React from "react";
import { useParams } from "react-router-dom";
import Home from "../Home/Home";
import AuthorizedConduitAppContainer from "../AuthorizedConduitAppContainer/AuthorizedConduitAppContainer";
import WorkInProgress from "../../components/WorkInProgress/WorkInProgress";
import Profile from "../Profile/Profile";

export default function Authorized() {
  const { tab, username } = useParams();
  console.log(useParams());
  const tabMapping = {
    home: {
      component: <Home isAuthorized={true} />,
    },
    profile: {
      component: <Profile username={username} />,
    },
  };

  return (
    <AuthorizedConduitAppContainer>
      {tab ? (
        <>{tabMapping[tab] ? tabMapping[tab].component : <WorkInProgress />}</>
      ) : (
        <div>Page not found</div>
      )}
    </AuthorizedConduitAppContainer>
  );
}
