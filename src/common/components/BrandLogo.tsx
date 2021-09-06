import React from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import NodeJsIcon from "../../icons/NodeJsIcon";
import PythonIcon from "../../icons/PythonIcon";

const iconLabels = ["python", "nodejs"];
const icons = [PythonIcon, NodeJsIcon];

interface BrandLogoProps {
  label: string;
}

const BrandLogo: React.FC<BrandLogoProps> = (props: BrandLogoProps) => {
  const index = iconLabels.indexOf(props.label.toLowerCase());
  return index >= 0 ? (
    icons[index]()
  ) : (
    <span className="text-yellow-400 dark:text-yellow-600 w-8 h-8">
      <ExclamationIcon className="w-4 h-4 text-red-400" />
    </span>
  );
};

export default BrandLogo;
