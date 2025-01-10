export const BASE_URL = "http://localhost:4000/api";
export const PRODUCTION_URL = "https://cre8ify-backend-production.up.railway.app/api";

export const ENDPOINTS = {
  posts: {
    fetch: `${BASE_URL}/posts`,
    like: `${BASE_URL}/post/like`,
    addComment: `${BASE_URL}/post/comment`,
  },
  users: {
    updateProfile: `${BASE_URL}/user/update`,
  },
  profile: {
    fetch: `${BASE_URL}/profile`,
    update: `${BASE_URL}/profile`,
  },
  projects: {
    fetchByFriendlyId: `${BASE_URL}/projects`,
    fetchUserProjects: `${BASE_URL}/projects/user`,
    delete: `${BASE_URL}/project`,
    fetchAll: `${BASE_URL}/projects`,
  },
  auth: {
    signin: `${BASE_URL}/auth/signin`,
    signup: `${BASE_URL}/auth/signup`,
    credentials: `${BASE_URL}/credentials`,
    logout: `${BASE_URL}/auth/logout`,
    refreshToken: `${BASE_URL}/auth/refresh-token`,
  },
  comments: {},
  notifications: {
    getAll: `${BASE_URL}/notifications`,
  },
};
