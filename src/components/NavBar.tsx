import { PureComponent } from "react";

interface NavBarProps {
  onAddLink: () => void;
}

interface NavBarState {}

export class NavBar extends PureComponent<NavBarProps, NavBarState> {
  render() {
    return (
      <header>
        <button onClick={this.props.onAddLink}>Add a Link</button>
      </header>
    );
  }
}
