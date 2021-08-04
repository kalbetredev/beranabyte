import Link from "next/link";

interface AppBarLinkProps {
  href: string;
  label: string;
}

const AppBarLink: React.FC<AppBarLinkProps> = (props: AppBarLinkProps) => {
  return (
    <Link href={props.href}>
      <div className="flex justify-center items-center w-20 h-6 hover:bg-gray-400 hover:bg-opacity-10 hover:text-brand cursor-pointer">
        <a className="text-xs text-center uppercase">{props.label}</a>
      </div>
    </Link>
  );
};

export default AppBarLink;
