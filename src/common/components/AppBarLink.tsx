import Link from "next/link";
import PageLink from "../types/page_link";

interface AppBarLinkProps {
  pageLink: PageLink;
}

const AppBarLink: React.FC<AppBarLinkProps> = (props: AppBarLinkProps) => {
  return (
    <Link href={props.pageLink.href}>
      <div className="flex justify-center items-center w-20 h-6 hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand cursor-pointer">
        <a className="text-xs text-center uppercase">{props.pageLink.label}</a>
      </div>
    </Link>
  );
};

export default AppBarLink;
