import { PureComponent } from "react";

export class LinkGridItem extends PureComponent {
  render() {
    return <div className="LinkGridItem">{this.props.children}</div>;
  }
}
