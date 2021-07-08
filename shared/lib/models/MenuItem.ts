abstract class MenuItem {
  label: string;
  href: string;
  constructor(label: string, href: string) {
    this.label = label;
    this.href = href;
  }
}

export default MenuItem;
