import { h, Component } from 'preact';
import { Youtube } from 'preact-feather';
import { ArrowLeft } from 'preact-feather';
import { ArrowRight } from 'preact-feather';

import VideoCard from '../../components/videoCard';

import * as hobbiesData from '../../assets/content/hobbies';

export default class Hobbies extends Component {

	constructor() {
		super();

		try {
			this.state = {
				galleryShift: 0,
				galleryCount: hobbiesData.second.music.length - 1,
				defaultWidth: 280,
				currentAnimation: '',
				spinIcon: undefined
			};
		}
		catch (e) {
			// hobbiesData is undefined or whatever
			console.error(e);
		}
	}

	timeoutId;
	timeoutSpinId;

	clickLeft = () => {
		if (this.state.galleryShift > 0) {
			this.setState((state) => ({ galleryShift: state.galleryShift - state.defaultWidth }));
		}
		else {
			//no more shift animation left
			this.applyAnimation('anim-left');
		}
	}

	clickRight = () => {
		if (this.state.galleryShift < this.state.galleryCount * this.state.defaultWidth) {
			this.setState((state) => ({ galleryShift: state.galleryShift + state.defaultWidth }));
		}
		else {
			//no more shift animation right
			this.applyAnimation('anim-right');
		}
	}

	applyAnimation(animName) {
		//no more shift animation left
		if (this.state.currentAnimation === animName) {
			this.setState((state) => ({ currentAnimation: '' }));

			clearTimeout(this.timeoutId);

			this.timeoutId = setTimeout(() => {
				this.setState((state) => ({ currentAnimation: animName }));
			}, 20);

		}
		else {
			this.setState((state) => ({ currentAnimation: animName }));
		}
	}


	spinAnimHandler = () => {
		if (!this.state.spinIcon) {
			this.setState((state) => ({ spinIcon: 'spin-icon' }));
			this.timeoutSpinId = setTimeout(() => {
				this.setState((state) => ({ spinIcon: undefined }));
			}, 1000);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
		clearTimeout(this.timeoutSpinId);
	}

	render() {
		return (
			<div class="hobbies">
				<div class="hobbies__small">
					<h2 class="hobbies-title">
						{hobbiesData.first.title}
					</h2>
					<div class="hobbies__interests">
						{hobbiesData.first.interests && hobbiesData.first.interests.map((int) => <p>{int}</p>)}
					</div>
				</div>
				<div class="hobbies__large">
					<h2 class="hobbies-title">
						{hobbiesData.second.title} <Youtube onClick={this.spinAnimHandler} size={22} class={this.state.spinIcon ? this.state.spinIcon : ''} />
					</h2>
					<h5>{hobbiesData.second.subtitle}</h5>

					<div class="hobbies-arrow hobbies-arrow--left" onClick={this.clickLeft}>
						<ArrowLeft size={30} />
					</div>
					<div class={`hobbies__music ${this.state.currentAnimation}`} style={`left: -${this.state.galleryShift}px;`}>
						{hobbiesData.second.music && hobbiesData.second.music.map((song) => <VideoCard title={song.title} subtitle={song.subtitle} imgSrc={song.imgSrc} videoUrl={song.videoUrl} />)}
					</div>
					<div class="hobbies-arrow hobbies-arrow--right" onClick={this.clickRight}>
						<ArrowRight size={30} />
					</div>
				</div>
			</div>
		);
	}
}