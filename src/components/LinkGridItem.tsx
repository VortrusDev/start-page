import { PureComponent } from "react";

interface LinkGridItemProps {
  onLinkRemove: (link: string) => void;
}

interface LinkGridItemState {}

export class LinkGridItem extends PureComponent<
  LinkGridItemProps,
  LinkGridItemState
> {
  render() {
    console.log(this.props.children);
    return (
      <>
        <form
          action={this.props.children?.toString()}
          target="_blank"
          id={`${this.props.children?.toString()}form`}
        >
          <button
            className="LinkGridItem"
            form={`${this.props.children?.toString()}form`}
          >
            {this.props.children}
          </button>
          <button
            onClick={(event: any) => {
              event.preventDefault();
              this.props.onLinkRemove(this.props.children!.toString());
            }}
          >
            Remove Link
          </button>
        </form>
      </>
    );
  }
}
