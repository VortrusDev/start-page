/*
 * This defines a modal which allows the user to add a link to their startpage and have
 * it appear in the list
 */

import { ChangeEvent, PureComponent } from "react";

interface AddLinkModalProps {
  onAddLink: (link: string, alias?: string) => void;
  onClose: () => void;
}

interface AddLinkModalState {
  link: string;
  alias: string; // name for the link on the start page
}

export class AddLinkModal extends PureComponent<
  AddLinkModalProps,
  AddLinkModalState
> {
  constructor(props: AddLinkModalProps) {
    super(props);

    this.state = {
      link: "",
      alias: "",
    };
  }

  handleAddLink = () => {
    this.props.onAddLink(this.state.link, this.state.alias);
  };

  handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ link: event.target.value });
  };

  handleAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ alias: event.target.value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div
        onClick={this.handleClose}
        style={{
          zIndex: 0,
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="Popup btn btn-outline-dark btn-rounded waves-effect active"
            onClick={(event: any) => event.stopPropagation()}
          >
            <h1>Add a link</h1>
            <form
              id="Add-link-form"
              onSubmit={(event) => {
                event.preventDefault();
                this.handleAddLink();
              }}
            >
              <h2>Link: </h2>
              <input
                type="text"
                value={this.state.link}
                onChange={this.handleLinkChange}
                form="Add-link-form"
                autoFocus
                style={{ height: "8vh", width: "100%", fontSize: "5vh" }}
              ></input>
              <h2>Alias: </h2>
              <div
                style={{
                  height: "8vh",
                  fontSize: "5vh",
                  marginBottom: "5vh",
                }}
              >
                <input
                  type="text"
                  value={this.state.alias}
                  onChange={this.handleAliasChange}
                  form="Add-link-form"
                  style={{ height: "100%" }}
                ></input>
                <button
                  form="Add-link-form"
                  className="btn btn-primary btn-rounded waves-effect"
                  style={{ height: "100%", verticalAlign: "top" }}
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
