import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth, firestoreDb } from "./firebase";
import queryString from "query-string";

const AuthContext = createContext(null);

export const ProvideAuth = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    return firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return fetchCurrentUser(response.user.uid);
      });
  };

  const signUp = (userName, email, password) => {
    return firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        firebaseAuth.currentUser.sendEmailVerification();
        return createUser(response.user.uid, userName, email);
      });
  };

  const signOut = () => {
    return firebaseAuth.signOut().then(() => {
      setUser(false);
    });
  };

  //TODO: Password Rest Form
  const sendPasswordResetEmail = (email) => {
    return firebaseAuth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    return firebaseAuth.confirmPasswordReset(resetCode, password).then(() => {
      return true;
    });
  };

  const handleAuthStateChanged = (user) => {
    if (user) fetchCurrentUser(user.uid);
    else setUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = firestoreDb
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const createUser = (uid: string, userName: string, email: string) => {
    const user = {
      uid: uid,
      userName: userName,
      email: email,
    };
    return firestoreDb
      .collection("users")
      .doc(uid)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      });
  };

  const fetchCurrentUser = (uid) => {
    return firestoreDb
      .collection("users")
      .doc(uid)
      .get()
      .then((userData) => {
        if (userData.data()) setUser(userData);
        else setUser(false);
      });
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};

export default useAuth;
