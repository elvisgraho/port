import { h, Component } from 'preact';
import { Mail } from 'preact-feather';
import { XCircle } from 'preact-feather';
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

  copyToClipboard = () => {
    navigator.clipboard.writeText("someEmail");
  }

  render() {
    return (
      <section class={"contact-box"}>

        <div class={"contact-box__info" + this.getStateClass()}>

          <div class="contact-box__close" onClick={this.toggleVisibility}></div>

          <p>
            Here is the full information
          </p>
          <div class="contact-box__copy">
            Copy
          </div>
        </div>

        <div class={"contact-box__heading"} onClick={this.toggleVisibility}>
          <Mail size={20} />
          <h4>Contact me</h4>
        </div>

      </section>
    );
  }
}