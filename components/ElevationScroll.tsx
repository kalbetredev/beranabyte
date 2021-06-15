import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React from "react";

interface Props {
  children: React.ReactElement;
}

const ElevationScroll = (props: Props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
    position: trigger ? "fixed" : "static",
  });
};

export default ElevationScroll;
