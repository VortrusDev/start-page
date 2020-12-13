// Renderer is the base class for anything which draws to the canvas
import { Component } from "./Component";

export interface Renderer extends Component {
  render: () => void;
}
