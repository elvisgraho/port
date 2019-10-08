import { h, Component } from 'preact';
import { Mail } from 'preact-feather';

import * as data from '../../assets/content/general';


export default class SkillCard extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <section class={"skill-card"}>
        <h2 class="skill-card-title">{this.props.title}</h2>
        <p class="skill-card-text">{this.props.text}</p>
        <div class="skill-card__skills">
          {this.props.skills && this.props.skills.map(skill => (
            <p>{skill}</p>
          ))}
        </div>
      </section>
    );
  }
}