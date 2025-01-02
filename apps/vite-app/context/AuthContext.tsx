import useSWR from "swr";
import React, { createContext, useContext } from "react";
import { request } from "../api/request";

type User = {
  friendlyId: string;
  username: string;
  profilePicture: string;
};

type AuthContextType = {
  loggedUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1) Use SWR to fetch the current user
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR<User | null>(
    "/internal/logged-user",
    async (url) => {
      const user = await request<User>("GET", url);
      return user;
    },
    {
      // Example config: don't refetch on window focus if you prefer
      // revalidateOnFocus: false,
    }
  );

  // 2) Figure out if we’re authenticated
  //    If there’s an error, that likely means 401 => no user
  //    or if userData is null => not authenticated
  const isAuthenticated = Boolean(userData && !error);

  // 3) signIn: just revalidate from /internal/logged-user
  //    This way, after your signIn hook calls signIn(),
  //    SWR re-fetches and updates the loggedUser.
  const signIn = async () => {
    await mutate(); // re-fetch /internal/logged-user
  };

  // 4) signOut: call your backend, then set user to null in SWR
  const signOut = async () => {
    try {
      await request("POST", "/internal/signout");
    } catch (err) {
      console.error("signOut error:", err);
    }
    // Clear out the user from SWR
    mutate(null, false);
  };

  // Provide the context values
  return (
    <AuthContext.Provider
      value={{
        loggedUser: userData ?? null,
        isAuthenticated,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Expose the hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
