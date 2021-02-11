import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push("/signin");
    }
  }, [auth, router]);

  return auth;
};
