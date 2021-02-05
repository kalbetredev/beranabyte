import { SvgIcon, SvgIconProps } from "@material-ui/core";

const wrapSvgPath = (path: any, viewBox = "0 0 24 24") => (
  props: SvgIconProps
) => (
  <SvgIcon {...props} viewBox={viewBox}>
    {path}
  </SvgIcon>
);

export default wrapSvgPath;
