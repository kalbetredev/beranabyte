import React from "react";
import Page from "../common/layouts/Page";
import PageMeta from "../common/types/PageMeta";

//TODO: Convert PageError Component from MUI to Tailwind
// import PageError from "../../components/MUI_PageError";

const PageNotFound = () => {
  const meta: PageMeta = {
    title: "BeranaByte : Page Not Found",
    description: "Page Not Found Error",
  };

  return (
    <Page meta={meta}>
      {/* <PageError
        errorMessage={"NEW NEW This Page could not be found"}
        statusCode={404}
      /> */}
      <h1>{"NEW NEW This Page could not be found"}</h1>
      <hr />
      <h3>{404}</h3>
    </Page>
  );
};

export default PageNotFound;
