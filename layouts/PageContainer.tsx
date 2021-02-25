import Container from "@material-ui/core/Container";
import Head from "next/head";
import React from "react";
import PageMeta from "../shared/lib/types/PageMeta";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ScrollTop from "../components/ScrollTop";
import { useRouter } from "next/router";

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
  const router = useRouter();

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
        <meta
          property="og:url"
          content={`https://www.beranabyte.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="BeranaByte" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta
          property="og:image"
          content={`https://www.beranabyte.com${meta.image}`}
        />
      </Head>
      <Container maxWidth="md" className={classes.root}>
        <div id="back-to-top-anchor" />
        <PageHeader />
        {props.children}
      </Container>
      <PageFooter />
      <ScrollTop />
    </>
  );
};

export default PageContainer;
