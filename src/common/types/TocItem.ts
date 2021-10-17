export default interface TocItem {
  id: string;
  label: string;
  level: number;
  subTocItems: TocItem[];
}
