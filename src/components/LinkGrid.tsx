import { PureComponent } from "react";

interface LinkGridProps {
  toggleRegen: boolean;
}

interface LinkGridState {}

export class LinkGrid extends PureComponent<LinkGridProps, LinkGridState> {
  render() {
    return <div className="LinkGrid">{this.props.children}</div>;
  }
}
