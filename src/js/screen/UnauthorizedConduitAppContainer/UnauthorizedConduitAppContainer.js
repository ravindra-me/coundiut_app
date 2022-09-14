import React from "react";
import { useRouteMatch, Route } from "react-router-dom";
import LayoutTopBottom from "../../layouts/LayoutTopBottom";

export default function UnauthorizedConduitAppContainer(props) {
  const { children } = props;

  return <LayoutTopBottom isAuthorized={false}>{children}</LayoutTopBottom>;
}
