// Components will be added to SimObjects and their functionality will be exposed
// to that object to use.

import { SimObject } from "../SimObject";

export interface Component {
  root: SimObject;
  start: () => void; // Do the thing it's intended to do, whether that be render something
  // or interact with the world
}
