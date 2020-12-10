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
  RegeneratingLink: boolean;
}

class App extends PureComponent<AppProps, AppState> {
  /**
   * The base App that the startpage will run on
   */

  userAddedLinks: { link: string; alias?: string }[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      AddingLink: false,
      RegeneratingLink: false,
    };

    this.loadLocalStorageKeys();
  }

  loadLocalStorageKeys = () => {
    for (let key in localStorage) {
      if (key.startsWith(LocalStorageKeyPrefix) && !key.endsWith("_alias")) {
        this.userAddedLinks.push({
          link: localStorage.getItem(key)!,
          alias: localStorage.getItem(key + "_alias")
            ? localStorage.getItem(key + "_alias")!
            : "",
        });
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

  fixLinkFormat = (link: string): string => {
    if (!link.startsWith("http")) {
      link = "https://" + link;
    }

    return link;
  };

  handleAddLink = (link: string, alias?: string) => {
    link = this.fixLinkFormat(link);

    console.log("Adding link " + link);

    // Add to user preferences so we can read it when they return

    localStorage.setItem(`${LocalStorageKeyPrefix}${link}`, link);
    if (alias)
      localStorage.setItem(`${LocalStorageKeyPrefix}${link}_alias`, alias);

    this.userAddedLinks.push({ link: link, alias: alias });

    this.setState({ AddingLink: false });
  };

  handleRemoveLink = (linkIn: string) => {
    console.log("removing link " + linkIn);

    localStorage.removeItem(`${LocalStorageKeyPrefix}${linkIn}`);
    localStorage.removeItem(`${LocalStorageKeyPrefix}${linkIn}_alias`);
    this.userAddedLinks = this.userAddedLinks.filter(
      (value: { link: string; alias?: string }) => {
        console.log("value.link: " + value.link + "; link: " + linkIn);
        return value.link !== linkIn;
      }
    );

    this.setState({ RegeneratingLink: !this.state.RegeneratingLink });
    console.log(this.userAddedLinks);
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
          <LinkGrid toggleRegen={this.state.RegeneratingLink}>
            {this.userAddedLinks.map((link) => {
              return (
                <LinkGridItem
                  key={link.link.toString()}
                  link={link.link.toString()}
                  alias={link.alias?.toString()}
                  onLinkRemove={this.handleRemoveLink}
                >
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
