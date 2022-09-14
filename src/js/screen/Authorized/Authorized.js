import React from "react";
import { useParams } from "react-router-dom";
import Home from "../Home/Home";
import AuthorizedConduitAppContainer from "../AuthorizedConduitAppContainer/AuthorizedConduitAppContainer";
import WorkInProgress from "../../components/WorkInProgress/WorkInProgress";

export default function Authorized() {
  const { tab } = useParams();
  const tabMapping = {
    home: {
      component: <Home isAuthorized={true} />,
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
