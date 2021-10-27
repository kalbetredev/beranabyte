import React from "react";
import Page from "../common/layouts/Page";
import { useRouter } from "next/router";
import useAuth, { AuthProvider } from "../modules/auth/hooks/useAuth";
import SignInForm from "../common/components/SignInForm";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { continue_to } = router.query;
  const continuePath = continue_to?.toString() || "";
  const auth: AuthProvider = useAuth();
  if (auth.user) router.replace("/" + continuePath);

  const onSuccess = () => {
    router.replace("/" + continuePath);
  };

  return (
    <Page>
      <div className="mt-20 mb-40 mx-auto w-full max-w-sm">
        <div className="bg-white dark:bg-gray-700 dark:bg-opacity-80 rounded-md separator border shadow overflow-hidden">
          <SignInForm onSuccess={onSuccess} continuePath={continuePath} />
        </div>
      </div>
    </Page>
  );
};

export default SignInPage;
