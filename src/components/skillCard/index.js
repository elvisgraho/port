import { h, Component } from 'preact';
import { Anchor } from 'preact-feather';

import * as data from '../../assets/content/general';


export default class SkillCard extends Component {

  state = {
    swing: false
  }

  onClick = () => {
    if (!this.state.swing) {
      this.setState((state) => ({ swing: true }));

      setTimeout(() => {
        this.setState((state) => ({ swing: false }));
      }, 1000);

    }
  }

  render() {
    console.log(this.state);
    return (
      <section class={"skill-card"}>
        <Anchor size={22} onClick={this.onClick} class={this.state.swing ? "swing" : ""} />
        <h2 class="skill-card-title">{this.props.title}</h2>
        <p class="skill-card-text">{this.props.text}</p>
        <div class="skill-card__skills">
          {this.props.skills && this.props.skills.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
      </section>
    );
  }
}