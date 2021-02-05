import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Page from "../shared/lib/model/Page";
import FontSizes from "../constants/fontsizes";
import UserAccount from "./UserAccount";
import NestedMenuList from "./NestedMenuList";
import SingleLevelMenuItem from "../shared/lib/model/SingleLevelMenuItem";
import MenuItem from "../shared/lib/model/MenuItem";
import GroupMenuItem from "../shared/lib/model/GroupMenuItem";

interface CustomDrawerProps {
  pages: Page[];
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  children?: React.ReactNode;
}

const listItemTextStyles = makeStyles({
  primary: {
    fontSize: FontSizes.menuListItem,
  },
});

const headerListItemTextStyles = makeStyles({
  primary: {
    fontSize: FontSizes.title,
  },
  secondary: {
    fontSize: FontSizes.caption,
  },
});

const Drawer: React.FC<CustomDrawerProps> = (props: CustomDrawerProps) => {
  const headerListItemTextClasses = headerListItemTextStyles();

  const navMenus: MenuItem[] = [];
  const categories = new Set<string>();
  props.pages.map((page) => categories.add(page.category));

  Array.from(categories.values()).map((category) => {
    let pageGroup: Page[] = [];
    props.pages.map((page) => {
      if (page.category === category) pageGroup.push(page);
    });

    if (pageGroup.length === 1) {
      navMenus.push(
        new SingleLevelMenuItem(pageGroup[0].label, pageGroup[0].href)
      );
    } else {
      const subMenus = pageGroup.map(
        (page) => new SingleLevelMenuItem(page.label, page.href)
      );

      navMenus.push(new GroupMenuItem(category, subMenus));
    }
  });

  return (
    <MuiDrawer open={props.open} onClose={props.onClose}>
      {props.children}
      <List>
        <ListItem>
          <UserAccount alwaysShow={true} />
        </ListItem>
        <ListItem>
          <ListItemText
            classes={headerListItemTextClasses}
            primary="BeranaByte"
            secondary="v1.0"
          />
        </ListItem>
        <Divider />
        <NestedMenuList menus={navMenus} listeners={[props.onClose]} />
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
