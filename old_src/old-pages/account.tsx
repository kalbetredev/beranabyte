import { useRouter } from "next/router";
import FullScreenAuthentication from "../components/MUI_Authentication";
import PageContainer from "../layouts/MUI_PageContainer";
import PageMeta from "../../src/common/types/PageMeta";
import useAuth, { AuthProvider } from "../../src/modules/auth/hooks/useAuth";

const signin = () => {
  const auth: AuthProvider = useAuth();
  const router = useRouter();

  const meta: PageMeta = {
    title: "Sign In to BeranaByte",
    description: "Sign In to BeranaByte to share and collaborate on ideas.",
    type: "website",
    image: "/static/images/banner.png",
  };

  if (auth.user) router.push("/");

  return (
    <PageContainer meta={meta}>
      <FullScreenAuthentication />
    </PageContainer>
  );
};

export default signin;
