import React from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import NodeJsIcon from "../../icons/NodeJsIcon";
import PythonIcon from "../../icons/PythonIcon";
import ReactJsIcon from "../../icons/ReactJsIcon";
import NextJsIcon from "../../icons/NextJsIcon";
import TailwindCSSIcon from "../../icons/TailwindCSSIcon";
import TypeScriptIcon from "../../icons/TypeScriptIcon";
import MongoDbIcon from "../../icons/MongoDbIcon";
import ExpressJsIcon from "../../icons/ExpressJsIcon";
import JavaIcon from "../../icons/JavaIcon";
import DartIcon from "../../icons/DartIcon";

const iconLabels = [
  "python",
  "nodejs",
  "reactjs",
  "nextjs",
  "tailwindcss",
  "typescript",
  "mongodb",
  "expressjs",
  "java",
  "dart",
];

const icons = [
  PythonIcon,
  NodeJsIcon,
  ReactJsIcon,
  NextJsIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
  MongoDbIcon,
  ExpressJsIcon,
  JavaIcon,
  DartIcon,
];

interface BrandIconProps {
  label: string;
}

const BrandIcon: React.FC<BrandIconProps> = (props: BrandIconProps) => {
  const index = iconLabels.indexOf(props.label.toLowerCase());
  return index >= 0 ? (
    icons[index]()
  ) : (
    <span className="text-yellow-400 dark:text-yellow-600 w-8 h-8">
      <ExclamationIcon className="w-4 h-4 text-red-400" />
    </span>
  );
};

export default BrandIcon;
