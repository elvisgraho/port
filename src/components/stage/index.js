import { h, Component, createRef } from 'preact';
import animation from './animation';
import * as data from '../../assets/content/stage';


export default class Stage extends Component {

  state = {
    class: ""
  }

  canvasRef = createRef();
  canvas = undefined;

  timeoutId;

  componentDidMount() {
    this.timeoutId = setTimeout(() => { this.setState(() => ({ class: "stage--mounted" })) }, 10);

    this.canvas = this.canvasRef.current;
    animation(this.canvas);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }


  render() {
    return (
      <section class={`stage ${this.state.class}`}>
        <canvas ref={this.canvasRef} class={"stage__canvas"}></canvas>

        <div class={"stage__title"}>
          <h1>{data.title}</h1>
          <h3>{data.subtitle}</h3>
        </div>

      </section>
    );
  }
}