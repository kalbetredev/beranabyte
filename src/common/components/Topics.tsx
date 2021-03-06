import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import { TOPICS_API_ENDPOINT } from "../../api/endpoints";
import TopicsLoading from "./TopicsLoading";
import { NextRouter, useRouter } from "next/router";
import { convertToSlug } from "../utils/slug-converter";
import { FEATURED } from "../constants/labels";

interface TopicsProps {
  showActiveTopic: boolean;
  onTopicClick: (string) => void;
}

const Topics: React.FC<TopicsProps> = (props: TopicsProps) => {
  const router: NextRouter = useRouter();
  const { data, error } = useSWR(TOPICS_API_ENDPOINT);
  const topics = data ? [FEATURED, ...data.topics] : data;
  const isLoading: boolean = !error && !data;

  if (isLoading) return <TopicsLoading />;

  const isCurrentPath = (topic: string): boolean => {
    if (props.showActiveTopic)
      if (topic == FEATURED) return router.asPath == "/blogs";
      else return router.asPath == "/blogs?topic=" + convertToSlug(topic);
    else return false;
  };

  return (
    <div className="mb-6 border-l separator rounded-2xl px-3 py-1">
      <div>
        <h2 className="text-lg mb-2">Topics</h2>
        {error ? (
          <h3 className="text-xs text-red-900 dark:text-red-300 mb-2 flex">
            <ExclamationIcon className="w-4 h-4 text-red-400 mr-1" />
            Error loading topics
          </h3>
        ) : (
          <div className="flex flex-wrap gap-2 mb-2 text-xs text-gray-400">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => props.onTopicClick(topic)}
                className={
                  "border capitalize rounded-full py-1 px-3 separator hover:border-brand dark:hover:border-brand-light hover:text-brand-light" +
                  (isCurrentPath(topic)
                    ? " text-brand-light border-brand dark:border-brand"
                    : "")
                }
              >
                {topic}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
