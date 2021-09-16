const API_ENDPOINT = "/api/v1";
export const BLOGS_API_ENDPOINT = `${API_ENDPOINT}/blogs`;
export const TOPICS_API_ENDPOINT = `${API_ENDPOINT}/blogs/topics`;
export const PROJECTS_API_ENDPOINT = `${API_ENDPOINT}/projects`;
export const BIO_API_ENDPOINT = `${API_ENDPOINT}/bio`;
export const BLOG_VIEW_COUNT = (blogId: string) =>
  `${BLOGS_API_ENDPOINT}/${blogId}/view-count`;
