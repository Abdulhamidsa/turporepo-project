export const routesConfig = {
  auth: "/auth",
  home: "/",
  userPortfolio: (friendlyId: string) => `/user/${friendlyId}`,
  profile: "/profile/edit",
  settings: "/settings",
  notFound: "*",
};