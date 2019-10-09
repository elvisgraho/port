import { h, Component } from 'preact';
import { Mail } from 'preact-feather';

import * as data from '../../assets/content/general';


export default class ContactBox extends Component {

  state = {
    visible: false,
    contactText: data.contact.text.split("\n"),
    class: ""
  }

  timeoutId;

  componentDidMount() {
    this.timeoutId = setTimeout(() => { this.setState(() => ({ class: "contact-box--mounted" })) }, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  toggleVisibility = e => {
    this.setState((state) => ({ visible: !state.visible }))
  };

  getStateClass = () => {
    return this.state.visible ? " contact-box--active" : "";
  }

  copyToClipboard = () => {
    navigator.clipboard.writeText(data.contact.email);
    this.toggleVisibility();
  }

  render() {
    return (
      <section class={`contact-box ${this.state.class} ${this.getStateClass()}`}>

        <div class={"contact-box__heading"} onClick={this.toggleVisibility}>
          <Mail size={20} />
          <h4>{data.contact.btnText}</h4>
        </div>

        <div class={"contact-box__info"}>
          <div>
            {this.state.contactText.map((val) => {
              return (<p>{val}</p>)
            })}
          </div>

          <button class="contact-box__copy" onClick={this.copyToClipboard}>
            {data.contact.clipboardText}
          </button>
        </div>

      </section>
    );
  }
}