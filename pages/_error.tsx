import { NextPageContext } from "next";
import React from "react";
import PageError from "../components/PageError";
import PageContainer from "../layouts/PageContainer";
import PageMeta from "../shared/lib/types/page-meta";

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
    <PageContainer meta={meta}>
      <PageError errorMessage={errorMessage} statusCode={props.statusCode} />
    </PageContainer>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode =
    res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
