import { h } from 'preact';

export default function VideoCard() {

	return (
		<a class={'video-card'} href={this.props.videoUrl} rel="noopener noreferrer" target="_blank">
			<img src={this.props.imgSrc} />
			<div class="video-card__text">
				<h2 class="video-card-title">{this.props.title}</h2>
				{/*<h5 class="video-card-subtitle">{this.props.subtitle}</h5>*/}
			</div>
		</a>
	);
}