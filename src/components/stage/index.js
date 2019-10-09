import { h, Component } from 'preact';
import { Mail } from 'preact-feather';

import * as data from '../../assets/content/stage';


export default class Stage extends Component {

  state = {
    class: ""
  }

  timeoutId;

  componentDidMount() {
    this.timeoutId = setTimeout(() => { this.setState(() => ({ class: "stage--mounted" })) }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <section class={`stage ${this.state.class}`}>
        <div class={"stage__title"}>
          <h1>{data.title}</h1>
          <h3>{data.subtitle}</h3>
        </div>

        <div class={"stage__canvas"}>

        </div>
      </section>
    );
  }
}