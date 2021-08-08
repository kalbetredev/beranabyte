import { Divider } from "@material-ui/core";
import NavButton from "./MUI_NavButton";
import Page from "../shared/lib/models/Page";

interface PagesNavigatorProps {
  pages: Page[];
}

const PagesNavigator: React.FC<PagesNavigatorProps> = (
  props: PagesNavigatorProps
) => {
  const categories = new Set<string>();
  props.pages.map((page) => categories.add(page.category));

  return (
    <>
      {Array.from(categories.values()).map((category, index) => {
        let pageGroup: Page[] = [];
        props.pages.map((page) => {
          if (page.category === category) pageGroup.push(page);
        });

        return (
          <NavButton key={index} pages={pageGroup}>
            {category}
          </NavButton>
        );
      })}
      <Divider
        orientation="vertical"
        style={{ height: "1.5em", marginRight: 10, marginLeft: 7 }}
      />
    </>
  );
};

export default PagesNavigator;
