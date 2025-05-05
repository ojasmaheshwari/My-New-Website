import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="notfound-main">
      <div className="container">
        <h1
          className="heading-ul"
          style={{
            textShadow: "3px 1px 0px rgba(29,93,246,0.75)",
          }}
        >
          404
        </h1>
        <h2>PAGE NOT FOUND</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="button-primary"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          HOMEPAGE
        </Link>
      </div>
    </main>
  );
};
export default NotFoundPage;
