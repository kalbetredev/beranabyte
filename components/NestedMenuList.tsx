import React, { useState, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SingleLevelMenuItem from "../shared/lib/model/SingleLevelMenuItem";
import MenuItem from "../shared/lib/model/MenuItem";
import GroupMenuItem from "../shared/lib/model/GroupMenuItem";
import Link from "next/link";

type ExpandedState = { expanded: boolean };
const ExpandIcon = ({ expanded }: ExpandedState) =>
  expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

const useStyles = makeStyles(() =>
  createStyles({
    inset: {
      paddingLeft: 20,
    },
  })
);

interface NestedListProps {
  menus: MenuItem[];
  listeners?: ((event: React.KeyboardEvent | React.MouseEvent) => void)[];
}

const NestedMenuList: React.FC<NestedListProps> = (props: NestedListProps) => {
  const classes = useStyles();
  const [menus, setMenus] = useState<MenuItem[]>(props.menus);

  const toggleGroup = (index: number) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    const newMenus = [...menus];
    const selectedMenu = menus[index];
    if (selectedMenu instanceof GroupMenuItem) {
      selectedMenu.isExpanded = !selectedMenu.isExpanded;
      newMenus[index] = selectedMenu;
      setMenus(newMenus);
    }
  };

  const notifyListeners = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    props.listeners?.forEach((action) => action(event));
  };

  return (
    <>
      <List>
        {menus.map((menu, index) => {
          if (menu instanceof SingleLevelMenuItem) {
            return (
              <Link key={index} href={menu.href} passHref>
                <ListItem dense button onClick={notifyListeners()}>
                  <ListItemText primary={menu.label} />
                </ListItem>
              </Link>
            );
          } else if (menu instanceof GroupMenuItem) {
            return (
              <Fragment key={index}>
                <ListItem
                  component="li"
                  dense
                  button
                  onClick={toggleGroup(index)}
                >
                  <ListItemText primary={menu.label} />
                  <ExpandIcon expanded={menu.isExpanded} />
                </ListItem>
                <Collapse in={menu.isExpanded}>
                  {menu.subMenus.map((subMenu) => (
                    <Link key={subMenu.label} href={subMenu.href} passHref>
                      <ListItem
                        component="li"
                        dense
                        button
                        onClick={notifyListeners()}
                      >
                        <ListItemText
                          classes={classes}
                          inset
                          primary={subMenu.label}
                        />
                      </ListItem>
                    </Link>
                  ))}
                </Collapse>
              </Fragment>
            );
          }
        })}
      </List>
    </>
  );
};

export default NestedMenuList;
