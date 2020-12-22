import React, { PureComponent } from "react";

import { getCurrentMoonPhase, CanvasId } from "./helpers";
import { AddLinkModal } from "./components/AddLinkModal";
import { NavBar } from "./components/NavBar";
import { LinkGrid } from "./components/LinkGrid";
import { Canvas } from "./components/Canvas";
import "bootstrap";
import "./App.css";
import "./NavBar.css";
import "./Popup.css";
import "./LinkGrid.css";
import { LinkGridItem } from "./components/LinkGridItem";
import { BackgroundRenderer } from "./objects/components/BackgroundRenderer";
import { ObjectManager } from "./ObjectManager";
import { Cloud } from "./objects/Cloud";
import { Vec2 } from "./objects/Vector";
import { SimObject } from "./objects/SimObject";
import {
  ParticleSystem,
  ParticleSystemStartModes,
} from "./objects/components/ParticleSystem";
import { BackgroundGrass } from "./objects/BackgroundGrass";
import { EnvironmentManager, EnvironmentModes } from "./EnvironmentManager";
import { Tree } from "./objects/Tree";
import { Moon } from "./objects/Moon";
import { Mask } from "./objects/Mask";
import { bgColor } from "./EnvironmentManager";
const LocalStorageKeyPrefix = "StartPageLink:";

interface AppProps {}

interface AppState {
  AddingLink: boolean; // Is the user adding a link? Yes if true
  RegeneratingLink: boolean;
  TextColorChange: [number, number, number];
}

class App extends PureComponent<AppProps, AppState> {
  /**
   * The base App that the startpage will run on
   */

  userAddedLinks: { link: string; alias?: string }[] = [];
  objectManager: ObjectManager;
  environmentManager: EnvironmentManager;

  constructor(props: any) {
    super(props);
    this.state = {
      AddingLink: false,
      RegeneratingLink: false,
      TextColorChange: [0, 0, 0],
    };

    this.loadLocalStorageKeys();
    this.environmentManager = new EnvironmentManager(
      EnvironmentModes.TimeBased,
      () =>
        this.setState({
          TextColorChange: [
            this.environmentManager.textR,
            this.environmentManager.textG,
            this.environmentManager.textB,
          ],
        })
    );
    this.objectManager = new ObjectManager(this.environmentManager);

    this.setUpCanvas();

    this.setUpEnvironment();
  }

  setUpEnvironment = () => {
    let cloudParticleSystem = new SimObject(
        this.objectManager,
        this.environmentManager,
        new Vec2()
      ),
      rainParticleSystem = new SimObject(
        this.objectManager,
        this.environmentManager,
        new Vec2()
      );

    cloudParticleSystem.addComponent(
      new ParticleSystem(
        cloudParticleSystem,
        { xMin: -300, xMax: -200, yMin: 0, yMax: 500 },
        0.5,
        ParticleSystemStartModes.Immediate,
        Cloud
      )
    );

    let rps = rainParticleSystem.addComponent(
      new ParticleSystem(
        rainParticleSystem,
        { xMin: -300, xMax: -200, yMin: 0, yMax: 500 },
        3,
        ParticleSystemStartModes.Immediate,
        Cloud
      )
    ) as ParticleSystem;

    rps.disabled = true;

    this.objectManager.addObject(cloudParticleSystem);
    this.objectManager.addObject(rainParticleSystem);

    this.objectManager.addObject(
      new BackgroundGrass(
        this.objectManager,
        new Vec2(500, 1000),
        new Vec2(550, 550),
        this.environmentManager,
        "darkgreen"
      )
    );

    this.objectManager.addObject(
      new BackgroundGrass(
        this.objectManager,
        new Vec2(1000, 1000),
        new Vec2(550, 550),
        this.environmentManager,
        "green"
      )
    );

    this.objectManager.addObject(
      new BackgroundGrass(
        this.objectManager,
        new Vec2(0, 1050),
        new Vec2(550, 550),
        this.environmentManager,
        "green"
      )
    );

    this.objectManager.addObject(
      new Tree(
        this.objectManager,
        this.environmentManager,
        new Vec2(100, 425),
        new Vec2(1, 1)
      )
    );

    this.objectManager.addObject(
      new Tree(
        this.objectManager,
        this.environmentManager,
        new Vec2(300, 415),
        new Vec2(0.75, 0.75)
      )
    );

    this.objectManager.addObject(
      new Tree(
        this.objectManager,
        this.environmentManager,
        new Vec2(500, 425),
        new Vec2(1, 1)
      )
    );

    this.objectManager.addObject(
      new Tree(
        this.objectManager,
        this.environmentManager,
        new Vec2(700, 450),
        new Vec2(1.25, 1.25)
      )
    );

    this.objectManager.addObject(
      new Tree(
        this.objectManager,
        this.environmentManager,
        new Vec2(1050, 400),
        new Vec2(0.95, 0.95)
      )
    );

    this.objectManager.addObject(
      new Moon(
        this.objectManager,
        new Vec2(window.innerWidth / 2 - 250, window.innerHeight / 2 - 100),
        new Vec2(60, 60),
        this.environmentManager,
        "yellow"
      )
    );

    this.objectManager.addObject(
      new Mask(
        this.objectManager,
        new Vec2(window.innerWidth / 2 - 220, window.innerHeight / 2 - 100),
        new Vec2(60, 60),
        this.environmentManager,
        bgColor
      )
    );
  };

  setUpCanvas = () => {
    let backgroundObject = this.objectManager.createObject();
    backgroundObject.addComponent(
      new BackgroundRenderer(backgroundObject, this.environmentManager)
    );
  };

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
        <Canvas id={CanvasId} />
        <div style={{ zIndex: 3 }}>
          <NavBar onClickAddLink={this.handleAddLinkPopup} className="NavBar" />
          <header className="App-header">
            {this.state.TextColorChange && (
              <>
                {" "}
                <h1
                  style={{
                    color: `rgb(${this.environmentManager.textR},${this.environmentManager.textG},${this.environmentManager.textB})`,
                    textShadow: `2px 2px 2px #DD00FF`,
                  }}
                >
                  Hello and welcome!
                </h1>
                <h2
                  className="App-description"
                  style={{
                    backgroundColor: `rgba(${
                      255 - this.environmentManager.textR
                    },${255 - this.environmentManager.textG},${
                      255 - this.environmentManager.textB
                    }, 0.25)`,
                    color: `rgb(${this.environmentManager.textR},${this.environmentManager.textG},${this.environmentManager.textB})`,
                  }}
                >
                  The moon is currently in{" "}
                  <div className="Text-highlight">
                    {getCurrentMoonPhase().name}
                  </div>
                </h2>
                <p
                  style={{
                    color: `rgb(${this.environmentManager.textR},${this.environmentManager.textG},${this.environmentManager.textB})`,
                  }}
                >
                  <em>{getCurrentMoonPhase().details}</em>
                </p>
              </>
            )}
            <form action="https://www.google.com/search?" id="Search-form">
              <div style={{ height: "10vh" }}>
                <input
                  id="Search-bar"
                  type="text"
                  name="q"
                  placeholder="Search..."
                  className="SearchBar"
                  autoFocus
                />
                <button
                  form="Search-form"
                  id="Search-button"
                  className="btn btn-outline-primary btn-rounded waves-effect"
                >
                  Search
                </button>
              </div>
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
      </div>
    );
  }
}

export default App;
