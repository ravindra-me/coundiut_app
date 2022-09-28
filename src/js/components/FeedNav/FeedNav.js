import { NavLink } from "react-router-dom";

export default function FeedNav(props) {
  let { activeTab, emptyTab, isLogedInUser, user, yourFeedFn, activeTag } =
    props;
  return (
    <section>
      <div className="">
        <ul className="flex feed-nav-container">
          {isLogedInUser && (
            <li
              className="mr-4 feed-nav-item"
              onClick={() => yourFeedFn(user.username)}
            >
              <NavLink
                to="/"
                className={`${activeTag === "your feed" && "active-feed-nav"}`}
              >
                Your feed
              </NavLink>
            </li>
          )}
          <li className="mr-4" onClick={() => emptyTab()}>
            <NavLink
              to="/"
              className={`${
                activeTab === "" && activeTag === ""
                  ? "active-feed-nav"
                  : "active-feed-nav-item"
              }`}
            >
              Global Feed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={activeTab ? "active-feed-nav" : "active-feed-nav-item"}
            >
              {activeTab}
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
