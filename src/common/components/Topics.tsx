import React from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useSWR from "swr";
import { TOPICS_API_ENDPOINT } from "../../api/endpoints";
import TopicsLoading from "./TopicsLoading";
import { NextRouter, useRouter } from "next/router";

const Topics: React.FC = () => {
  const router: NextRouter = useRouter();
  const { data, error } = useSWR(TOPICS_API_ENDPOINT);
  const topics = data ? data.topics : data;
  const isLoading: boolean = !error && !data;

  if (isLoading) return <TopicsLoading />;

  return (
    <div className="mb-6 border-l border-gray-400 rounded-2xl px-3 py-1">
      <div>
        <h2 className="text-lg mb-2">Topics</h2>
        {error ? (
          <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
            <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
            Error loading topics
          </h3>
        ) : (
          <div className="flex flex-wrap gap-2 mb-2 text-xs text-gray-400">
            {["featured", ...topics].map((topic) => (
              <Link key={topic} href={"/blogs/topics/" + topic}>
                <a
                  className={
                    "border capitalize rounded-full py-1 px-3 border-gray-600 hover:border-brand hover:text-brand-light" +
                    (router.pathname == topic ||
                    (router.pathname == "/blogs" && topic == "featured")
                      ? " text-brand-light border-brand"
                      : "")
                  }
                >
                  {topic}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
