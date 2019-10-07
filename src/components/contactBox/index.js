import { h, Component } from 'preact';
import { Mail } from 'preact-feather';
import style from './style';

import * as data from '../../assets/content/general';


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
    navigator.clipboard.writeText(data.contact.email);
    this.toggleVisibility();
  }

  render() {
    return (
      <section class={"contact-box"}>

        <div class={"contact-box__info" + this.getStateClass()}>
          <p>{data.contact.text}</p>
          <button class="contact-box__copy" onClick={this.copyToClipboard}>
            {data.contact.clipboardText}
          </button>
        </div>

        <div class={"contact-box__heading"} onClick={this.toggleVisibility}>
          <Mail size={20} />
          <h4>{data.contact.btnText}</h4>
        </div>

      </section>
    );
  }
}