import Link from "next/link";
import PageLink from "../types/page_link";

interface AppBarLinkProps {
  pageLink: PageLink;
  active: boolean;
}

const AppBarLink: React.FC<AppBarLinkProps> = (props: AppBarLinkProps) => {
  return (
    <Link href={props.pageLink.href}>
      <div className="relative flex justify-center items-center w-20 h-6 hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand cursor-pointer">
        <a className="text-xs text-center uppercase">{props.pageLink.label}</a>
        {props.active ? (
          <div className="absolute -bottom-3 w-20 h-1 bg-brand-light dark:bg-brand-dark rounded-t-full"></div>
        ) : null}
      </div>
    </Link>
  );
};

export default AppBarLink;
