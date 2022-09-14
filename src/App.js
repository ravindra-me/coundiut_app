import React, { useState } from "react";
import "./App.scss";
import RoutesCom from "./js/routes/Routes";
import Loader from "./js/components/Loader/Loader";

function App() {
  const [authResolved, setAuthResolved] = useState(true);
  return authResolved ? <RoutesCom /> : <Loader />;
}

export default App;
