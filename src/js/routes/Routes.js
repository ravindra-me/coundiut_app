import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Authorized from "../screen/Authorized/Authorized";
import UnauthorizedConduitApp from "../screen/Unauthorized/Unauthorized";

export default function RoutesCom(props) {
  const { user = {}, isAuth } = props;
  return (
    <Routes>
      <Route path="/">
        {isAuth ? (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path=":tab" element={<Authorized />} />
            <Route path="/:tab/:username" element={<Authorized />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path=":tab" element={<UnauthorizedConduitApp />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
