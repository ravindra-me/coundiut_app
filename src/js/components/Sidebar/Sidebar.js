import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tagsURL } from "../../config/config";

export default function Sidebar(props) {
  const { addTab } = props;
  const [state, setState] = useState({
    tags: null,
    error: null,
  });

  useEffect(() => {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setState({
          tags: data.tags,
          error: "",
        });
      })
      .catch((error) => {
        setState({
          error: "Not able to fetch tags!",
        });
      });
  }, []);

  if (!state.tags) {
    return "";
  }

  return (
    <aside className="flex-30  self-start rounded p-4 aside">
      <h3 className="mb-4 ml-2 font-bold side-nav-heading">Popular tags</h3>
      <div className="flex flex-wrap aside-tags-sections">
        {state.tags.map((tag) =>
          tag === "" ? (
            ""
          ) : (
            <Link
              key={tag}
              className="m-2 rounded px-2 py-2 tag-item"
              onClick={() => addTab(tag)}
              to="/"
            >
              {tag}
            </Link>
          )
        )}
      </div>
    </aside>
  );
}
