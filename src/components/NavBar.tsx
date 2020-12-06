import { PureComponent } from "react";

interface NavBarProps {
  onClickAddLink: () => void;
}

interface NavBarState {}

export class NavBar extends PureComponent<NavBarProps, NavBarState> {
  render() {
    return (
      <header>
        <button onClick={this.props.onClickAddLink}>Add a Link</button>
      </header>
    );
  }
}
