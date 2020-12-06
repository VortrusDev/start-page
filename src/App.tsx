import React, { PureComponent } from "react";

import { getCurrentMoonPhase } from "./helpers";
import { AddLinkModal } from "./components/AddLinkModal";
import { NavBar } from "./components/NavBar";
import { LinkGrid } from "./components/LinkGrid";
import "bootstrap";
import "./App.css";
import "./NavBar.css";
import "./Popup.css";
import "./LinkGrid.css";
import { LinkGridItem } from "./components/LinkGridItem";

interface AppProps {}

interface AppState {
  AddingLink: boolean; // Is the user adding a link? Yes if true
}

class App extends PureComponent<AppProps, AppState> {
  /**
   * The base App that the startpage will run on
   */
  constructor(props: any) {
    super(props);
    this.state = {
      AddingLink: false,
    };
  }

  handleAddLinkPopup = () => {
    console.log("Opening the Add Link dialogue box");
    this.toggleAddingLinkPopup();
  };

  toggleAddingLinkPopup = () => {
    this.setState({ AddingLink: !this.state.AddingLink });
  };

  handleAddLink = (link: string) => {
    console.log("Adding link " + link);

    // Add to user preferences so we can read it when they return

    this.setState({ AddingLink: false });
  };

  render() {
    return (
      <div className="App">
        <NavBar onClickAddLink={this.handleAddLinkPopup} className="NavBar" />
        <header className="App-header">
          <h1>Hello and welcome!</h1>
          <h2 className="App-description">
            The moon is currently in{" "}
            <div className="Text-highlight">{getCurrentMoonPhase().name}</div>
          </h2>

          <p>
            <em>{getCurrentMoonPhase().details}</em>
          </p>
          <form action="https://www.google.com/search?" id="Search-form">
            <input
              id="Search-bar"
              type="text"
              name="q"
              placeholder="Search..."
            />
            <button form="Search-form" id="Search-button">
              Search
            </button>
          </form>
          {this.state.AddingLink && (
            <AddLinkModal
              onAddLink={this.handleAddLink}
              onClose={this.toggleAddingLinkPopup}
            />
          )}
          <LinkGrid>
            <LinkGridItem>1</LinkGridItem>
            <LinkGridItem>1</LinkGridItem>
            <LinkGridItem>1</LinkGridItem>
            <LinkGridItem>1</LinkGridItem>
            <LinkGridItem>1</LinkGridItem>
            <LinkGridItem>1</LinkGridItem>
            <LinkGridItem>1</LinkGridItem>
          </LinkGrid>
        </header>
      </div>
    );
  }
}

export default App;
