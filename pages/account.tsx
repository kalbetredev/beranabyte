import { useRouter } from "next/router";
import React from "react";
import FullScreenAuthentication from "../components/Authentication";
import PageContainer from "../layouts/PageContainer";
import PageMeta from "../shared/lib/types/PageMeta";
import useAuth from "../shared/lib/utils/useAuth";

const signin = () => {
  const auth = useAuth();
  const router = useRouter();

  const meta: PageMeta = {
    title: "Sign In to BeranaByte",
    description: "Authentication",
  };

  if (auth.user) router.push("/");

  return (
    <PageContainer meta={meta}>
      <FullScreenAuthentication />
    </PageContainer>
  );
};

export default signin;
