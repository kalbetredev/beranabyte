import React from "react";
import PageContainer from "../common/layouts/PageContainer";
import PageMeta from "../common/types/PageMeta";

//TODO: Convert PageError Component from MUI to Tailwind
// import PageError from "../../components/MUI_PageError";

const PageNotFound = () => {
  const meta: PageMeta = {
    title: "BeranaByte : Page Not Found",
    description: "Page Not Found Error",
  };

  return (
    <PageContainer meta={meta}>
      {/* <PageError
        errorMessage={"NEW NEW This Page could not be found"}
        statusCode={404}
      /> */}
      <h1>{"NEW NEW This Page could not be found"}</h1>
      <hr />
      <h3>{404}</h3>
    </PageContainer>
  );
};

export default PageNotFound;
