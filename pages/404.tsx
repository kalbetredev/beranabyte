import PageError from "../components/PageError";
import PageContainer from "../layouts/PageContainer";
import PageMeta from "../shared/lib/types/page-meta";

const PageNotFound = () => {
  const meta: PageMeta = {
    title: "BeranaByte : Page Not Found",
    description: "Page Not Found Error",
  };

  return (
    <PageContainer meta={meta}>
      <PageError
        errorMessage={"NEW NEW This Page could not be found"}
        statusCode={404}
      />
    </PageContainer>
  );
};

export default PageNotFound;
