import { PureComponent } from "react";

interface CanvasProps {
  id: string;
  onCanvasDraw: (canvasInstance: HTMLCanvasElement) => void;
}
interface CanvasState {}

export class Canvas extends PureComponent<CanvasProps, CanvasState> {
  canvasInstance: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  width: number = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  height: number = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  test: number = 0;
  constructor(props: CanvasProps) {
    super(props);

    // to get typescript to be patient with me
    this.canvasInstance = document.getElementById(
      this.props.id
    ) as HTMLCanvasElement;
    this.ctx = null;
  }

  componentDidMount() {
    this.canvasInstance = document.getElementById(
      this.props.id
    ) as HTMLCanvasElement;

    this.ctx = this.canvasInstance.getContext("2d");

    requestAnimationFrame(this.renderCanvas);

    setInterval(this.update, 13.33);
  }

  update = () => {};

  renderCanvas = () => {
    if (this.ctx === null) {
      console.error("The canvas context is null.");
      return;
    }

    // Now draw!
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      0,
      this.canvasInstance.width,
      this.canvasInstance.height
    );

    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.beginPath();
    this.ctx.arc(this.test++, 100, 26, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "#003300";
    this.ctx.stroke();
    this.ctx.closePath();

    requestAnimationFrame(this.renderCanvas);
    this.props.onCanvasDraw(this.canvasInstance);
  };

  render() {
    return (
      <canvas
        id={this.props.id}
        width={this.width}
        height={this.height}
        style={{
          display: "none",
          margin: 0,
          padding: 0,
        }}
      >
        Your browser does not support canvas.
      </canvas>
    );
  }
}
