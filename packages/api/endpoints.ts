export const BASE_URL = "http://localhost:4000/api";
export const PRODUCTION_URL = "https://cre8ify-backend-production.up.railway.app/api";

export const ENDPOINTS = {
  posts: {
    fetch: `${PRODUCTION_URL}/posts`,
    like: `${PRODUCTION_URL}/post/like`,
    addComment: `${PRODUCTION_URL}/post/comment`,
    post: `${PRODUCTION_URL}/post`,
  },
  users: {
    updateProfile: `${PRODUCTION_URL}/user/update`,
    fetchProfile: `${PRODUCTION_URL}/profile/:userid`,
  },
  profile: {
    fetch: `${PRODUCTION_URL}/profile`,
    update: `${PRODUCTION_URL}/profile`,
  },
  projects: {
    fetchByFriendlyId: `${PRODUCTION_URL}/projects`,
    fetchUserProjects: `${PRODUCTION_URL}/projects/user`,
    delete: `${PRODUCTION_URL}/project`,
    create: `${PRODUCTION_URL}/project`,
    fetchAll: `${PRODUCTION_URL}/projects`,
  },
  auth: {
    signin: `${PRODUCTION_URL}/auth/signin`,
    signup: `${PRODUCTION_URL}/auth/signup`,
    credentials: `${PRODUCTION_URL}/credentials`,
    signout: `${PRODUCTION_URL}/auth/signout`,
    refreshToken: `${PRODUCTION_URL}/auth/refresh-token`,
    loggedUser: `${PRODUCTION_URL}/logged-user`,
  },
  comments: {},
  notifications: {
    getAll: `${PRODUCTION_URL}/notifications`,
  },
};
