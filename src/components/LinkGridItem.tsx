import { PureComponent } from "react";

interface LinkGridItemProps {
  onLinkRemove: (link: string) => void;
  link: string;
  alias?: string;
}

interface LinkGridItemState {}

export class LinkGridItem extends PureComponent<
  LinkGridItemProps,
  LinkGridItemState
> {
  render() {
    console.log("LINK: ");
    console.log(this.props.link);
    return (
      <>
        <form
          action={this.props.link?.toString()}
          target="_blank"
          id={`${this.props.link.toString()}form`}
        >
          <button
            className="LinkGridItem"
            form={`${this.props.link.toString()}form`}
          >
            {this.props.alias
              ? this.props.alias?.toString()
              : this.props.link.toString()}
          </button>
          <button
            onClick={(event: any) => {
              event.preventDefault();
              this.props.onLinkRemove(this.props.link!.toString());
            }}
          >
            Remove Link
          </button>
        </form>
      </>
    );
  }
}
