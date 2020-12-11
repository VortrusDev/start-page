import { PureComponent } from "react";

interface CanvasProps {
  id: string;
}
interface CanvasState {}

export class Canvas extends PureComponent<CanvasProps, CanvasState> {
  canvasInstance: HTMLCanvasElement;
  constructor(props: CanvasProps) {
    super(props);

    // to get typescript to be patient with me
    this.canvasInstance = document.getElementById(
      this.props.id
    ) as HTMLCanvasElement;
  }

  componentDidMount() {
    this.canvasInstance = document.getElementById(
      this.props.id
    ) as HTMLCanvasElement;

    setInterval(this.update, 13.33); // target 60 fps, may change this later or allow user to
    // change target framerate
  }

  update() {
    console.log("Spam every frame");
  }

  render() {
    return (
      <canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></canvas>
    );
  }
}
