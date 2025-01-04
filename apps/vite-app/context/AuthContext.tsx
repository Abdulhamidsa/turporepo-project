import useSWR from "swr";
import React from "react";
import { request } from "../api/request";
import { AuthContext } from "../src/features/user/hooks/use.auth";

type User = {
  friendlyId: string;
  username: string;
  profilePicture: string;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      revalidateOnFocus: true,
    }
  );
  console.log(userData);
  const isAuthenticated = Boolean(userData && !error);

  const signIn = async () => {
    await mutate();
  };

  const signOut = async () => {
    try {
      await request("POST", "/internal/signout");
    } catch (err) {
      console.error("signOut error:", err);
    }
    mutate(null, false);
  };

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
