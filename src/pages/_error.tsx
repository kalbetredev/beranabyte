import React from "react";
import { NextPageContext } from "next";
import Page from "../common/layouts/Page";
import PageMeta from "../common/types/PageMeta";
import SecondaryButton from "../common/components/SecondaryButton";

const statusCodes: { [code: number]: string } = {
  400: "Bad Request",
  404: "The page you requested could not be found",
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
      <div className="mt-20 mx-auto text-center">
        <h3 className="text-red-400 dark:text-gray-300 text-9xl filter drop-shadow-error mb-8">
          {props.statusCode}
        </h3>
        <h1 className="mb-8 uppercase font-bold ">{errorMessage}</h1>
        <SecondaryButton
          className="max-w-[200px] mx-auto mb-40"
          slug="/"
          label="TAKE ME HOME"
        />
      </div>
    </Page>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode =
    res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
