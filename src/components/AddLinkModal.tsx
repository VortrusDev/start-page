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
        style={{
          zIndex: 0,
          width: "100vw",
          height: "100vh",
          position: "fixed",
        }}
        onClick={this.handleClose}
      >
        <div
          className="Popup btn btn-outline-dark btn-rounded waves-effect active"
          onClick={(event: any) => event.stopPropagation()}
        >
          <h3>Add a link</h3>
          <form
            id="Add-link-form"
            onSubmit={(event) => {
              event.preventDefault();
              this.handleAddLink();
            }}
          >
            <p>Link: </p>
            <input
              type="text"
              value={this.state.link}
              onChange={this.handleLinkChange}
              form="Add-link-form"
              autoFocus
            ></input>
            <p>Alias: </p>
            <input
              type="text"
              value={this.state.alias}
              onChange={this.handleAliasChange}
              form="Add-link-form"
            ></input>
            <button form="Add-link-form">Add Link</button>
          </form>
        </div>
      </div>
    );
  }
}
