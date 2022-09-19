import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  const { user, handleProfile, isAuthorized } = props;
  return (
    <header className="bg-gray-100">
      <div className="container flex justify-between items-center py-4">
        <NavLink
          to="/index"
          exact
          className="text-green-600 font-semibold	 text-2xl"
        >
          conduit
        </NavLink>
        <nav>
          <ul className="flex">
            <li className="ml-4 font-semibold">
              <NavLink
                to="/"
                activeClassName="text-gray-500"
                className={(navData) => {
                  return navData.isActive ? "" : "active";
                }}
                exact
              >
                Home
              </NavLink>
            </li>
            {isAuthorized === false ? (
              <UnloginUser />
            ) : (
              <LoginUser user={user} handleProfile={handleProfile} />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function UnloginUser(props) {
  return (
    <>
      <li className="ml-4 font-semibold	">
        <NavLink activeClassName="text-gray-500" to="/login">
          Sign in
        </NavLink>
      </li>
      <li className="ml-4 font-semibold	">
        <NavLink activeClassName="text-gray-500" to="/signup">
          Sign up
        </NavLink>
      </li>
    </>
  );
}

function LoginUser(props) {
  let { user, handleProfile } = props;
  return (
    <>
      <li className="ml-4 font-semibold	">
        <NavLink activeClassName="text-gray-500" to="/new-post">
          New post
        </NavLink>
      </li>
      <li className="ml-4 font-semibold	">
        <NavLink activeClassName="text-gray-500" to="/setting">
          Setting
        </NavLink>
      </li>
      <li className="ml-4 font-semibold	">
        <NavLink
          activeClassName="text-gray-500"
          to={`/profile/${user?.username}`}
        >
          {user?.username}
        </NavLink>
      </li>
    </>
  );
}

export default Header;
