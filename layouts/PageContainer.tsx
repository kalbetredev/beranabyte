import Container from "@material-ui/core/Container";
import Head from "next/head";
import React from "react";
import PageMeta from "../shared/lib/types/page-meta";
import PageFooter from "../widgets/PageFooter";
import PageHeader from "../widgets/PageHeader";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface PageContainerProps {
  meta: PageMeta;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 400,
    },
  })
);

const PageContainer = (props: PageContainerProps) => {
  const { meta } = props;
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        {meta.date && (
          <meta
            property="article:published_time"
            content={meta.date.toDateString()}
          />
        )}
      </Head>
      <Container maxWidth="md" className={classes.root}>
        <PageHeader />
        {props.children}
      </Container>
      <PageFooter />
    </>
  );
};

export default PageContainer;
