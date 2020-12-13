// Components will be added to SimObjects and their functionality will be exposed
// to that object to use.

export interface Component {
  start: () => void; // Do the thing it's intended to do, whether that be render something
  // or interact with the world
}
