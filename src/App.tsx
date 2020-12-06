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

const LocalStorageKeyPrefix = "StartPageLink:";

interface AppProps {}

interface AppState {
  AddingLink: boolean; // Is the user adding a link? Yes if true
}

class App extends PureComponent<AppProps, AppState> {
  /**
   * The base App that the startpage will run on
   */

  userAddedLinks: string[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      AddingLink: false,
    };

    this.loadLocalStorageKeys();
  }

  loadLocalStorageKeys = () => {
    for (let key in localStorage) {
      if (key.startsWith(LocalStorageKeyPrefix)) {
        this.userAddedLinks.push(localStorage.getItem(key)!);
      }
    }
  };

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

    localStorage.setItem(`${LocalStorageKeyPrefix}${link}`, link);

    this.setState({ AddingLink: false });
  };

  handleRemoveLink = (link: string) => {
    console.log("removing link " + link);

    localStorage.removeItem(`${LocalStorageKeyPrefix}${link}`);
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
            {this.userAddedLinks.map((link) => {
              return (
                <LinkGridItem key={link} onLinkRemove={this.handleRemoveLink}>
                  {link}
                </LinkGridItem>
              );
            })}
          </LinkGrid>
        </header>
      </div>
    );
  }
}

export default App;
