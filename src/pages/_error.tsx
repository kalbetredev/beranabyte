import React from "react";
import { NextPageContext } from "next";
import Page from "../common/layouts/Page";
import PageMeta from "../common/types/PageMeta";

//TODO: Convert PageError Component from MUI to Tailwind
// import PageError from "../../components/MUI_PageError";

const statusCodes: { [code: number]: string } = {
  400: "Bad Request",
  404: "This Page could not be found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
};

interface ErrorProps {
  statusCode: number;
}

const Error = (props: ErrorProps) => {
  const errorMessage = statusCodes[props.statusCode];
  const meta: PageMeta = {
    title: `BeranaByte : ${props.statusCode} Error`,
    description: errorMessage,
  };

  return (
    <Page meta={meta}>
      {/* <PageError errorMessage={errorMessage} statusCode={props.statusCode} /> */}
      <h1>{errorMessage}</h1>
      <hr />
      <h3>{props.statusCode}</h3>
    </Page>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode =
    res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
