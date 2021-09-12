import React, { useEffect, useState } from "react";
import TocItem from "../types/TocItem";

interface TableOfContentsProps {
  tocItems: TocItem[];
}

const getTocIds = (tocItems: TocItem[]): string[] => {
  const ids: string[] = [];

  tocItems.forEach((item) => {
    ids.push(item.id.replace("#", ""));
    if (item.subTocItems.length > 0) {
      const subIds = getTocIds(item.subTocItems);
      subIds.forEach((id) => ids.push(id.replace("#", "")));
    }
  });

  return ids;
};

const TableOfContents: React.FC<TableOfContentsProps> = (
  props: TableOfContentsProps
) => {
  const headerIds = getTocIds(props.tocItems);
  const [activeId, setActiveId] = useState("#" + headerIds[0]);

  const getTocItemComponent = (tocItem: TocItem) => {
    const padding = "pl-" + tocItem.level * 2;
    return (
      <li key={tocItem.id}>
        <a
          className={
            `block border-l-2 py-1 leading-tight hover:border-gray-400 dark:hover:border-gray-600 hover:text-brand-dark dark:hover:text-brand-light ${padding}` +
            (activeId == tocItem.id
              ? " border-brand-dark dark:border-brand-light text-brand-dark dark:text-brand-light"
              : " border-transparent")
          }
          href={tocItem.id}
        >
          {tocItem.label}
        </a>
        {tocItem.subTocItems.length > 0 && (
          <ol
            className={
              "transition duration-500 ease-in-out " +
              ([tocItem.id, ...tocItem.subTocItems.map((x) => x.id)].includes(
                activeId
              )
                ? "block"
                : "hidden")
            }
          >
            {tocItem.subTocItems.map((item) => getTocItemComponent(item))}
          </ol>
        )}
      </li>
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headerIds.map((id) => {
      const element = document.getElementById(`${id}`);
      if (element) observer.observe(element);
    });

    return () => {
      headerIds.map((id) => {
        const element = document.getElementById(`${id}`);
        if (element) observer.unobserve(element);
      });
    };
  }, [headerIds]);

  return (
    <div className="pt-20 sticky top-0">
      <p className="pl-2 text-lg border-l-[3px] border-transparent">Contents</p>
      <div className="text-xs top-0 text-gray-500 dark:text-gray-400">
        <nav className="table-of-contents">
          <ol>{props.tocItems.map((item) => getTocItemComponent(item))}</ol>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
