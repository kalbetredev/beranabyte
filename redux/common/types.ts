import { HYDRATE } from "next-redux-wrapper";

interface HydrateAction {
  type: typeof HYDRATE;
  payload?: null;
}

export default HydrateAction;
