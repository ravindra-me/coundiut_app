import React from "react";
import LayoutTopBottom from "../../layouts/LayoutTopBottom";
export default function AuthorizedConduitAppContainer(props) {
  const { children } = props;
  return <LayoutTopBottom isAuthorized={true}>{children}</LayoutTopBottom>;
}
