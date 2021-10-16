import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories">
      {hits.map((story) => {
        const { points, num_comments, title, objectID, author, url } = story;
        return (
          <article key={objectID} className="story">
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} |</span> {num_comments} comments
            </p>
            <div>
              <a href={url} className="read-link" target="_blank">
                Read more
              </a>
              <button
                className="remove-btn"
                onClick={() => removeStory(objectID)}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
      <footer>
        &#169;
        <a href="https://www.linkedin.com/in/venkateshkamath08/">venkzy </a>
         for Hacker <span> News</span>.
      </footer>
    </section>
  );
};

export default Stories;
