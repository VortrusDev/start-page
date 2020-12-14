import { PureComponent } from "react";
interface NavBarProps {
  onClickAddLink: () => void;
  className: string;
}

interface NavBarState {}

export class NavBar extends PureComponent<NavBarProps, NavBarState> {
  render() {
    return (
      <header className={this.props.className}>
        <button
          onClick={this.props.onClickAddLink}
          className="btn btn-lg btn-outline-primary btn-rounded waves-effect"
        >
          Add a Link
        </button>
      </header>
    );
  }
}
