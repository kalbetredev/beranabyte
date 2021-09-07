import React from "react";
import BrandIcon from "../common/components/BrandIcon";
import Page from "../common/layouts/Page";

const AboutPage = () => {
  const linkStyle = "text-brand-light hover:text-brand-dark hover:underline";

  const link = (label: string, href: string) => (
    <a href={href} target="_blank" className={linkStyle}>
      {label}
    </a>
  );

  return (
    <Page>
      <div className="w-full mt-20 mb-8">
        <h1 className="w-full text-3xl font-medium">
          About <span className="text-brand">BeranaByte</span>
        </h1>
        <div className="text-sm text-gray-400">
          <p className="mt-5">
            BeranaByte is a blogging and project sharing website developed by
            Kalkidan Betre.
          </p>
          <p className="mt-4">
            The blogs range from discussions on specific technologies used in
            software development to general concepts on computer science. They
            are written in a way that is clear for the reader. Additionally,
            readers can leave comments or questions so that the author can
            further clarify and respond accordingly.
          </p>
          <p className="mt-4">
            The site has also various projects that are opensource. These
            projects have live demos as well as github links so readers can
            checkout their respective codes.
          </p>
        </div>
        <h2 className="w-full text-xl font-medium mt-10">Tech Stack</h2>
        <div className="text-sm text-gray-400">
          <p className="mt-4">
            The frontend of this site is a{" "}
            {link("React.js", "https://reactjs.org")} web application built
            using {link("Next.js", "https://nextjs.org")} and{" "}
            {link("TailwindCSS", "https://tailwindcss.com")}. Where as the
            backend is built using {link("Express.js", "https://expressjs.com")}{" "}
            running on {link("Node.js", "https://nodejs.org")}. The database
            used to store all the data required for the web application is{" "}
            {link("MongoDB", "https://www.mongodb.com")}. Both the frontend and
            the backend applications are written in{" "}
            {link("Typescript", "https://www.typescriptlang.org")}.
          </p>
        </div>
        <h2 className="w-full text-md text-gray-400 font-medium mt-5">
          Frontend
        </h2>
        <div className="flex flex-wrap shadow-inner bg-gray-100 dark:bg-gray-800 py-2 px-1 border-t border-b dark:border-gray-700">
          {["ReactJs", "NextJs", "TailwindCSS", "TypeScript"].map(
            (stack, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-2xl m-1 p-2 border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-600 flex justify-center items-center"
              >
                <BrandIcon label={stack} />
              </div>
            )
          )}
        </div>
        <h2 className="w-full text-md text-gray-400 font-medium mt-5">
          Backend
        </h2>
        <div className="flex flex-wrap shadow-inner bg-gray-100 dark:bg-gray-800 py-2 px-1 border-t border-b dark:border-gray-700">
          {["NodeJs", "ExpressJs", "MongoDb", "TypeScript"].map(
            (stack, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-2xl m-1 p-2 border bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-600 flex justify-center items-center"
              >
                <BrandIcon label={stack} />
              </div>
            )
          )}
        </div>
      </div>
    </Page>
  );
};

export default AboutPage;
