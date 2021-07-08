export const TOKEN_KEY = "token";
export const API_BASE_URL = "https://beranabyte-api.herokuapp.com";

// Api
const API_ROUTE = "/api/v1";

// Auth
const AUTH_ROUTE = `${API_ROUTE}/auth`;
export const AUTH_REGISTER_API_ROUTE = `${AUTH_ROUTE}/register`;
export const AUTH_LOGIN_API_ROUTE = `${AUTH_ROUTE}/login`;

// Users
export const USERS_API_ROUTE = `${API_ROUTE}/users`;
export const USER_ACCOUNT_API_ROUTE = (userId: string) =>
  `${USERS_API_ROUTE}/${userId}`;
export const CURRENT_USER_API_ROUTE = `${USERS_API_ROUTE}/account`;

// Blogs
export const BLOGS_API_ROUTE = `${API_ROUTE}/blogs`;
export const BLOG_CATEGORIES_API_ROUTE = `${BLOGS_API_ROUTE}/categories`;
export const BLOG_API_ROUTE = (blogId: string, onlySummary: boolean) =>
  onlySummary
    ? `${BLOGS_API_ROUTE}/${blogId}?onlySummary=true`
    : `${BLOGS_API_ROUTE}/${blogId}`;

export const BLOGS_POPULAR_API_ROUTE = `${BLOGS_API_ROUTE}/popular`;
export const BLOGS_LATEST_API_ROUTE = `${BLOGS_API_ROUTE}/latest`;
export const BLOGS_FEATURED_API_ROUTE = `${BLOGS_API_ROUTE}/featured`;

// Comments
export const COMMENTS_API_ROUTE = (blogId: string) =>
  `${BLOGS_API_ROUTE}/${blogId}/comments`;

// Replies
export const REPLIES_API_ROUTE = (commentId: String) =>
  `${API_ROUTE}/comments/${commentId}/replies`;

// Bio
export const BIO_API_ROUTE = `${API_ROUTE}/bio`;

// Projects
export const PROJECTS_API_ROUTE = `${API_ROUTE}/projects`;
export const PROJECT_RELATE_API_ROUTE = (projectId: string) =>
  `${PROJECTS_API_ROUTE}/${projectId}/relate`;
export const PROJECTS_BLOGS_API_ROUTE = `${PROJECTS_API_ROUTE}/blogs`;

// Blog Images
export const BLOG_IMAGES = (blogId: string) =>
  `${BLOGS_API_ROUTE}/${blogId}/images`;
export const BLOG_IMAGE_URL = (blogId: string, imageFileName: string) =>
  `${API_BASE_URL}${BLOG_IMAGES(blogId)}/${imageFileName}`;
