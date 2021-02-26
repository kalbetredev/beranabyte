import fs, { readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { FRONTMATTER_KEYS } from "../../types/FrontMatter";
import { BlogMetaCollection } from "../../utils/firebase-admin";
import { BLOG_ROOT_DIR } from "./Directories";

class MDXUuidChecker {
  root = process.cwd();
  rootPath = path.join(this.root, BLOG_ROOT_DIR);

  async run() {
    const mdxFiles = this.getMDXFiles();
    for (let i = 0; i < mdxFiles.length; i++) {
      const source = this.readMDXFile(mdxFiles[i]);
      const { data, content } = matter(source);
      if (!data[FRONTMATTER_KEYS.uuid]) {
        const newUuid = await this.getNewFirebaseDocumentUuid();
        const newFrontMatter = this.makeNewFrontMatter(newUuid, data);
        const newContent = newFrontMatter + "\n" + content;
        this.writeMDXFile(mdxFiles[i], newContent);
      }
    }
  }

  //File Structure is ../category/blog.mdx
  getMDXFiles(): string[] {
    const mdxFiles = [];

    readdirSync(this.rootPath, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name)
      .forEach((directory) => {
        const filePath = path.join(this.rootPath, directory);
        const files = readdirSync(filePath, { withFileTypes: true })
          .filter((file) => !file.isDirectory())
          .map((file) => file.name);
        files.forEach((file) =>
          mdxFiles.push(path.join(this.rootPath, directory, file))
        );
      });

    return mdxFiles;
  }

  readMDXFile(path: string): string {
    return fs.readFileSync(path, "utf8");
  }

  writeMDXFile(path: string | number | Buffer | URL, content: string) {
    fs.writeFileSync(path, content);
  }

  async getNewFirebaseDocumentUuid(): Promise<string> {
    const blogRef = BlogMetaCollection.doc();
    await blogRef.set({
      viewCount: 0,
    });
    return blogRef.id;
  }

  makeNewFrontMatter(
    uuid: string,
    oldData: {
      [key: string]: any;
    }
  ) {
    let newFrontMatter = "---\n";
    newFrontMatter += `${FRONTMATTER_KEYS.title}: ${
      oldData[FRONTMATTER_KEYS.title]
    }\n`;
    newFrontMatter += `${FRONTMATTER_KEYS.publishedAt}: ${
      oldData[FRONTMATTER_KEYS.publishedAt]
    }\n`;
    newFrontMatter += `${FRONTMATTER_KEYS.summary}: ${
      oldData[FRONTMATTER_KEYS.summary]
    }\n`;
    newFrontMatter += `${FRONTMATTER_KEYS.image}: ${
      oldData[FRONTMATTER_KEYS.image]
    }\n`;
    newFrontMatter += `${FRONTMATTER_KEYS.uuid}: ${uuid}\n`;
    newFrontMatter += "---\n";
    return newFrontMatter;
  }
}

export default MDXUuidChecker;
