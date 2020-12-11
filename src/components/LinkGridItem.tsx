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
          action={this.props.link.toString()}
          target="_blank"
          id={`${this.props.link.toString()}form`}
        >
          <div
            className="LinkGridItem btn btn-outline-primary btn-rounded waves-effect"
            onClick={() =>
              (document.getElementById(
                `${this.props.link.toString()}form`
              ) as HTMLFormElement).submit()
            }
            title={this.props.link}
            role="button"
          >
            <div>
              {this.props.alias
                ? this.props.alias?.toString()
                : this.props.link.toString()}
            </div>
            <button
              className="LinkGridItemRemoveButton btn btn-danger btn-rounded"
              onClick={(event: any) => {
                event.preventDefault();
                event.stopPropagation();
                this.props.onLinkRemove(this.props.link!.toString());
              }}
            >
              Remove Link
            </button>
          </div>
        </form>
      </>
    );
  }
}
