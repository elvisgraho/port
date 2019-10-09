import { h, Component } from 'preact';

export default class VideoCard extends Component {

  render() {
    return (
      <a class={"video-card"} href={this.props.videoUrl} target="_blank">
        <img src={this.props.imgSrc}></img>
        <div class="video-card__text">
          <h2 class="video-card-title">{this.props.title}</h2>
          <h5 class="video-card-subtitle">{this.props.subtitle}</h5>
        </div>
      </a>
    );
  }
}