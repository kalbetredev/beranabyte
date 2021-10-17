import React from "react";
import ErrorPage from "./_error";

const PageNotFound = () => {
  return <ErrorPage statusCode={404} />;
};

export default PageNotFound;
