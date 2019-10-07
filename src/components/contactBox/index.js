import { h, Component } from 'preact';
import style from './style';


export default class ContactBox extends Component {

  constructor() {
    super();
    this.state = {
      visible: false
    }
  }

  toggleVisibility = e => {
    this.setState((state) => ({ visible: !state.visible }))
  };

  getStateClass = () => {
    return this.state.visible ? " visible" : " hidden";
  }

  render() {
    return (
      <section class={"contact-box"}>

        <div class={"contact-box__info" + this.getStateClass()}>
          Here is the full information
        </div>

        <div class={"contact-box__heading"} onClick={this.toggleVisibility}>
          <h4>Contact</h4>
        </div>
      </section>
    );
  }
}