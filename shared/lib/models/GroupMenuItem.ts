import MenuItem from "./MenuItem";
import SingleLevelMenu from "./SingleLevelMenuItem";

class GroupMenuItem extends MenuItem {
  subMenus: SingleLevelMenu[];
  isExpanded: boolean;
  constructor(
    label: string,
    subMenus: SingleLevelMenu[],
    isExpanded: boolean = false
  ) {
    super(label, "");
    this.subMenus = subMenus.slice();
    this.isExpanded = isExpanded;
  }
}

export default GroupMenuItem;
