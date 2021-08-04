import PageError from "../components/MUI_PageError";
import PageContainer from "../layouts/MUI_PageContainer";
import PageMeta from "../shared/lib/models/PageMeta";

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
