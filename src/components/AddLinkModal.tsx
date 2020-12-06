/*
 * This defines a modal which allows the user to add a link to their startpage and have
 * it appear in the list
 */

import { ChangeEvent, PureComponent } from "react";

interface AddLinkModalProps {
  onAddLink: (link: string) => void;
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

  render() {
    return (
      <div className="Popup">
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
        </form>
      </div>
    );
  }
}
