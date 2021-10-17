interface Project {
  _id: string;
  title: string;
  summary: string;
  githubLink: string;
  tags: string[];
  liveDemoLink: string;
  techStack: string[];
  type: string;
  publishedOn: Date;
  isFeatured: boolean;
}

export default Project;
