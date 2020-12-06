/*
 * This defines a modal which allows the user to add a link to their startpage and have
 * it appear in the list
 */

import { PureComponent } from "react";

interface AddLinkModalProps {}

interface AddLinkModalState {}

export class AddLinkModal extends PureComponent<
  AddLinkModalProps,
  AddLinkModalState
> {
  render() {
    return (
      <>
        <h3>Add a link</h3>
        <input type="text"></input>
      </>
    );
  }
}
