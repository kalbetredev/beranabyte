const API_ENDPOINT = "/api/v1";
export const BLOGS_API_ENDPOINT = `${API_ENDPOINT}/blogs`;
export const TOPICS_API_ENDPOINT = `${API_ENDPOINT}/blogs/topics`;
export const PROJECTS_API_ENDPOINT = `${API_ENDPOINT}/projects`;
export const BIO_API_ENDPOINT = `${API_ENDPOINT}/bio`;
export const BLOG_VIEW_COUNT = (blogId: string) =>
  `${BLOGS_API_ENDPOINT}/${blogId}/view-count`;
export const COMMENTS_API_ENDPOINT = (blogId: string) =>
  `${BLOGS_API_ENDPOINT}/${blogId}/comments`;
export const REPLIES_API_ENDPOINT = (commentId: String) =>
  `${API_ENDPOINT}/comments/${commentId}/replies`;

// Auth
const AUTH_ENDPOINT = `${API_ENDPOINT}/auth`;
export const AUTH_REGISTER_API_ENDPOINT = `${AUTH_ENDPOINT}/register`;
export const AUTH_LOGIN_API_ENDPOINT = `${AUTH_ENDPOINT}/login`;

// Users
export const USERS_API_ENDPOINT = `${API_ENDPOINT}/users`;
export const CURRENT_USER_API_ENDPOINT = `${USERS_API_ENDPOINT}/account`;

// Messages
export const MESSAGE_API_ENDPOINT = `${API_ENDPOINT}/message`;

// Subscription
export const SUBSCRIBE_API_ENDPOINT = `${API_ENDPOINT}/mailing-list/subscribe`;
