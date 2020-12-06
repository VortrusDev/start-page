/*
 * This defines a modal which allows the user to add a link to their startpage and have
 * it appear in the list
 */

import { ChangeEvent, PureComponent } from "react";

interface AddLinkModalProps {
  onAddLink: (link: string) => void;
  onClose: () => void;
}

interface AddLinkModalState {
  link: string;
}

export class AddLinkModal extends PureComponent<
  AddLinkModalProps,
  AddLinkModalState
> {
  constructor(props: AddLinkModalProps) {
    super(props);

    this.state = {
      link: "",
    };
  }

  handleAddLink = () => {
    this.props.onAddLink(this.state.link);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ link: event.target.value });
  };

  handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(typeof event);
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
          className="Popup"
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
            <input
              type="text"
              value={this.state.link}
              onChange={this.handleChange}
              form="Add-link-form"
            ></input>
            <button form="Add-link-form">Add Link</button>
          </form>
        </div>
      </div>
    );
  }
}
